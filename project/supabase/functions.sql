-- AirScout Database Functions

-- Function to get all listings with additional data
CREATE OR REPLACE FUNCTION get_listings_with_data()
RETURNS TABLE (
  id UUID,
  user_id UUID,
  title TEXT,
  description TEXT,
  location TEXT,
  price INTEGER,
  max_guests INTEGER,
  bedrooms INTEGER,
  beds INTEGER,
  baths NUMERIC(3,1),
  amenities TEXT[],
  image_url TEXT,
  is_active BOOLEAN,
  is_featured BOOLEAN,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  host_name TEXT,
  host_avatar TEXT,
  avg_rating NUMERIC(3,2),
  review_count INTEGER
) LANGUAGE plpgsql AS $$
BEGIN
  RETURN QUERY
  SELECT 
    l.id,
    l.user_id,
    l.title,
    l.description,
    l.location,
    l.price,
    l.max_guests,
    l.bedrooms,
    l.beds,
    l.baths,
    l.amenities,
    l.image_url,
    l.is_active,
    l.is_featured,
    l.created_at,
    l.updated_at,
    u.full_name AS host_name,
    u.avatar_url AS host_avatar,
    COALESCE((SELECT AVG(r.rating)::NUMERIC(3,2) FROM reviews r WHERE r.listing_id = l.id), 0) AS avg_rating,
    COALESCE((SELECT COUNT(*) FROM reviews r WHERE r.listing_id = l.id), 0) AS review_count
  FROM 
    listings l
  JOIN 
    users u ON l.user_id = u.id
  WHERE 
    l.is_active = TRUE
  ORDER BY 
    l.is_featured DESC, 
    l.created_at DESC;
END;
$$;

-- Function to get a single listing with additional data
CREATE OR REPLACE FUNCTION get_listing_by_id(listing_id UUID)
RETURNS TABLE (
  id UUID,
  user_id UUID,
  title TEXT,
  description TEXT,
  location TEXT,
  price INTEGER,
  max_guests INTEGER,
  bedrooms INTEGER,
  beds INTEGER,
  baths NUMERIC(3,1),
  amenities TEXT[],
  image_url TEXT,
  is_active BOOLEAN,
  is_featured BOOLEAN,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  host_name TEXT,
  host_avatar TEXT,
  host_email TEXT,
  avg_rating NUMERIC(3,2),
  review_count INTEGER
) LANGUAGE plpgsql AS $$
BEGIN
  RETURN QUERY
  SELECT 
    l.id,
    l.user_id,
    l.title,
    l.description,
    l.location,
    l.price,
    l.max_guests,
    l.bedrooms,
    l.beds,
    l.baths,
    l.amenities,
    l.image_url,
    l.is_active,
    l.is_featured,
    l.created_at,
    l.updated_at,
    u.full_name AS host_name,
    u.avatar_url AS host_avatar,
    u.email AS host_email,
    COALESCE((SELECT AVG(r.rating)::NUMERIC(3,2) FROM reviews r WHERE r.listing_id = l.id), 0) AS avg_rating,
    COALESCE((SELECT COUNT(*) FROM reviews r WHERE r.listing_id = l.id), 0) AS review_count
  FROM 
    listings l
  JOIN 
    users u ON l.user_id = u.id
  WHERE 
    l.id = listing_id;
END;
$$;

-- Function to get user's bookings with listing details
CREATE OR REPLACE FUNCTION get_user_bookings(user_uuid UUID)
RETURNS TABLE (
  id UUID,
  listing_id UUID,
  user_id UUID,
  host_id UUID,
  check_in DATE,
  check_out DATE,
  guests INTEGER,
  total_amount INTEGER,
  status TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  listing_title TEXT,
  listing_location TEXT,
  listing_image TEXT,
  host_name TEXT
) LANGUAGE plpgsql AS $$
BEGIN
  RETURN QUERY
  SELECT 
    b.id,
    b.listing_id,
    b.user_id,
    b.host_id,
    b.check_in,
    b.check_out,
    b.guests,
    b.total_amount,
    b.status,
    b.created_at,
    b.updated_at,
    l.title AS listing_title,
    l.location AS listing_location,
    l.image_url AS listing_image,
    u.full_name AS host_name
  FROM 
    bookings b
  JOIN 
    listings l ON b.listing_id = l.id
  JOIN 
    users u ON b.host_id = u.id
  WHERE 
    b.user_id = user_uuid
  ORDER BY 
    b.check_in DESC;
END;
$$;

-- Function to get host's bookings with guest details
CREATE OR REPLACE FUNCTION get_host_bookings(host_uuid UUID)
RETURNS TABLE (
  id UUID,
  listing_id UUID,
  user_id UUID,
  host_id UUID,
  check_in DATE,
  check_out DATE,
  guests INTEGER,
  total_amount INTEGER,
  status TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  listing_title TEXT,
  guest_email TEXT,
  guest_name TEXT
) LANGUAGE plpgsql AS $$
BEGIN
  RETURN QUERY
  SELECT 
    b.id,
    b.listing_id,
    b.user_id,
    b.host_id,
    b.check_in,
    b.check_out,
    b.guests,
    b.total_amount,
    b.status,
    b.created_at,
    b.updated_at,
    l.title AS listing_title,
    u.email AS guest_email,
    u.full_name AS guest_name
  FROM 
    bookings b
  JOIN 
    listings l ON b.listing_id = l.id
  JOIN 
    users u ON b.user_id = u.id
  WHERE 
    b.host_id = host_uuid
  ORDER BY 
    b.created_at DESC;
END;
$$;

-- Function to get host's earnings summary
CREATE OR REPLACE FUNCTION get_host_earnings_summary(host_uuid UUID)
RETURNS TABLE (
  month TEXT,
  year INTEGER,
  total_bookings INTEGER,
  total_earnings INTEGER,
  is_paid BOOLEAN
) LANGUAGE plpgsql AS $$
BEGIN
  RETURN QUERY
  SELECT 
    TO_CHAR(b.created_at, 'Month') AS month,
    EXTRACT(YEAR FROM b.created_at)::INTEGER AS year,
    COUNT(*)::INTEGER AS total_bookings,
    SUM(b.total_amount * 0.9)::INTEGER AS total_earnings, -- Host gets 90% (platform fee is 10%)
    EXISTS(
      SELECT 1 FROM payouts p 
      WHERE p.user_id = host_uuid 
      AND EXTRACT(MONTH FROM p.created_at) = EXTRACT(MONTH FROM b.created_at)
      AND EXTRACT(YEAR FROM p.created_at) = EXTRACT(YEAR FROM b.created_at)
      AND p.status = 'paid'
    ) AS is_paid
  FROM 
    bookings b
  JOIN 
    listings l ON b.listing_id = l.id
  WHERE 
    l.user_id = host_uuid
    AND b.status = 'confirmed'
  GROUP BY 
    month, year
  ORDER BY 
    year DESC, EXTRACT(MONTH FROM MIN(b.created_at)) DESC;
END;
$$;

-- Function to search listings by various criteria
CREATE OR REPLACE FUNCTION search_listings(
  search_location TEXT DEFAULT NULL,
  min_price INTEGER DEFAULT NULL,
  max_price INTEGER DEFAULT NULL,
  min_guests INTEGER DEFAULT NULL,
  check_in_date DATE DEFAULT NULL,
  check_out_date DATE DEFAULT NULL
)
RETURNS TABLE (
  id UUID,
  user_id UUID,
  title TEXT,
  description TEXT,
  location TEXT,
  price INTEGER,
  max_guests INTEGER,
  bedrooms INTEGER,
  beds INTEGER,
  baths NUMERIC(3,1),
  amenities TEXT[],
  image_url TEXT,
  is_active BOOLEAN,
  is_featured BOOLEAN,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  host_name TEXT,
  host_avatar TEXT,
  avg_rating NUMERIC(3,2)
) LANGUAGE plpgsql AS $$
BEGIN
  RETURN QUERY
  SELECT 
    l.id,
    l.user_id,
    l.title,
    l.description,
    l.location,
    l.price,
    l.max_guests,
    l.bedrooms,
    l.beds,
    l.baths,
    l.amenities,
    l.image_url,
    l.is_active,
    l.is_featured,
    l.created_at,
    l.updated_at,
    u.full_name AS host_name,
    u.avatar_url AS host_avatar,
    COALESCE((SELECT AVG(r.rating)::NUMERIC(3,2) FROM reviews r WHERE r.listing_id = l.id), 0) AS avg_rating
  FROM 
    listings l
  JOIN 
    users u ON l.user_id = u.id
  WHERE 
    l.is_active = TRUE
    AND (search_location IS NULL OR l.location ILIKE '%' || search_location || '%')
    AND (min_price IS NULL OR l.price >= min_price)
    AND (max_price IS NULL OR l.price <= max_price)
    AND (min_guests IS NULL OR l.max_guests >= min_guests)
    AND (check_in_date IS NULL OR check_out_date IS NULL OR NOT EXISTS (
      SELECT 1 FROM bookings b
      WHERE b.listing_id = l.id
      AND b.status = 'confirmed'
      AND (
        (b.check_in <= check_out_date AND b.check_out >= check_in_date)
      )
    ))
  ORDER BY 
    l.is_featured DESC, 
    CASE WHEN search_location IS NOT NULL 
      THEN similarity(l.location, search_location) 
      ELSE 0 
    END DESC,
    l.created_at DESC;
END;
$$;

-- Function to create a booking and handle related operations
CREATE OR REPLACE FUNCTION create_booking(
  p_listing_id UUID,
  p_user_id UUID,
  p_check_in DATE,
  p_check_out DATE,
  p_guests INTEGER,
  p_total_amount INTEGER,
  p_stripe_session_id TEXT
)
RETURNS UUID LANGUAGE plpgsql AS $$
DECLARE
  v_host_id UUID;
  v_host_email TEXT;
  v_guest_email TEXT;
  v_booking_id UUID;
BEGIN
  -- Get host ID and email
  SELECT user_id, u.email INTO v_host_id, v_host_email
  FROM listings l
  JOIN users u ON l.user_id = u.id
  WHERE l.id = p_listing_id;
  
  -- Get guest email
  SELECT email INTO v_guest_email
  FROM users
  WHERE id = p_user_id;
  
  -- Create booking
  INSERT INTO bookings (
    listing_id,
    user_id,
    host_id,
    check_in,
    check_out,
    guests,
    total_amount,
    stripe_session_id,
    status,
    host_email,
    guest_email
  ) VALUES (
    p_listing_id,
    p_user_id,
    v_host_id,
    p_check_in,
    p_check_out,
    p_guests,
    p_total_amount,
    p_stripe_session_id,
    'confirmed',
    v_host_email,
    v_guest_email
  ) RETURNING id INTO v_booking_id;
  
  RETURN v_booking_id;
END;
$$;

-- Function to get reviews for a listing
CREATE OR REPLACE FUNCTION get_listing_reviews(listing_uuid UUID)
RETURNS TABLE (
  id UUID,
  booking_id UUID,
  user_id UUID,
  rating INTEGER,
  comment TEXT,
  created_at TIMESTAMPTZ,
  user_name TEXT,
  user_avatar TEXT
) LANGUAGE plpgsql AS $$
BEGIN
  RETURN QUERY
  SELECT 
    r.id,
    r.booking_id,
    r.user_id,
    r.rating,
    r.comment,
    r.created_at,
    u.full_name AS user_name,
    u.avatar_url AS user_avatar
  FROM 
    reviews r
  JOIN 
    users u ON r.user_id = u.id
  WHERE 
    r.listing_id = listing_uuid
  ORDER BY 
    r.created_at DESC;
END;
$$;