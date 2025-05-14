-- AirScout Seed Data for Development

-- Insert demo users (passwords are 'password123' for all users)
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'admin@airscout.dev', '$2a$10$abcdefghijklmnopqrstuvwxyz123456789', NOW(), '{"provider":"email","providers":["email"]}', '{}'),
  ('00000000-0000-0000-0000-000000000002', 'host1@example.com', '$2a$10$abcdefghijklmnopqrstuvwxyz123456789', NOW(), '{"provider":"email","providers":["email"]}', '{}'),
  ('00000000-0000-0000-0000-000000000003', 'host2@example.com', '$2a$10$abcdefghijklmnopqrstuvwxyz123456789', NOW(), '{"provider":"email","providers":["email"]}', '{}'),
  ('00000000-0000-0000-0000-000000000004', 'guest1@example.com', '$2a$10$abcdefghijklmnopqrstuvwxyz123456789', NOW(), '{"provider":"email","providers":["email"]}', '{}'),
  ('00000000-0000-0000-0000-000000000005', 'guest2@example.com', '$2a$10$abcdefghijklmnopqrstuvwxyz123456789', NOW(), '{"provider":"email","providers":["email"]}', '{}');

-- Update user profiles
UPDATE public.users
SET 
  full_name = 'AirScout Admin',
  is_host = TRUE,
  stripe_account_id = 'acct_demo_admin',
  stripe_customer_id = 'cus_demo_admin'
WHERE id = '00000000-0000-0000-0000-000000000001';

UPDATE public.users
SET 
  full_name = 'Sarah Johnson',
  is_host = TRUE,
  stripe_account_id = 'acct_demo_host1',
  stripe_customer_id = 'cus_demo_host1',
  avatar_url = 'https://randomuser.me/api/portraits/women/44.jpg'
WHERE id = '00000000-0000-0000-0000-000000000002';

UPDATE public.users
SET 
  full_name = 'Michael Chen',
  is_host = TRUE,
  stripe_account_id = 'acct_demo_host2',
  stripe_customer_id = 'cus_demo_host2',
  avatar_url = 'https://randomuser.me/api/portraits/men/32.jpg'
WHERE id = '00000000-0000-0000-0000-000000000003';

UPDATE public.users
SET 
  full_name = 'Emma Wilson',
  is_host = FALSE,
  stripe_customer_id = 'cus_demo_guest1',
  avatar_url = 'https://randomuser.me/api/portraits/women/17.jpg'
WHERE id = '00000000-0000-0000-0000-000000000004';

UPDATE public.users
SET 
  full_name = 'James Rodriguez',
  is_host = FALSE,
  stripe_customer_id = 'cus_demo_guest2',
  avatar_url = 'https://randomuser.me/api/portraits/men/68.jpg'
WHERE id = '00000000-0000-0000-0000-000000000005';

-- Insert demo listings
INSERT INTO public.listings (
  id, user_id, title, description, location, price, max_guests, 
  bedrooms, beds, baths, amenities, image_url, is_active, is_featured
)
VALUES
  (
    '00000000-0000-0000-0000-000000000101',
    '00000000-0000-0000-0000-000000000002',
    'Luxury Apartment with City Views',
    'Experience the ultimate urban retreat in this stunning apartment with panoramic city views. This modern space features floor-to-ceiling windows, designer furnishings, and all the amenities you need for a comfortable stay. Located in the heart of the city, you''ll be steps away from top restaurants, shopping, and cultural attractions. Perfect for business travelers or couples looking for a sophisticated getaway.',
    'London, United Kingdom',
    12500, -- £125 per night
    2,
    1,
    1,
    1,
    ARRAY['WiFi', 'Kitchen', 'Washer', 'Dryer', 'Air conditioning', 'Heating', 'TV', 'Elevator'],
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
    TRUE,
    TRUE
  ),
  (
    '00000000-0000-0000-0000-000000000102',
    '00000000-0000-0000-0000-000000000002',
    'Cozy Cottage in the Countryside',
    'Escape to this charming cottage nestled in the peaceful countryside. With its rustic decor, wood-burning fireplace, and private garden, it''s the perfect place to unwind and reconnect with nature. Enjoy morning coffee on the patio while listening to birdsong, or take a stroll through the surrounding fields and woods. Despite the tranquil setting, you''re just a short drive from local villages with pubs, shops, and restaurants.',
    'Cotswolds, United Kingdom',
    9500, -- £95 per night
    4,
    2,
    3,
    1.5,
    ARRAY['WiFi', 'Kitchen', 'Fireplace', 'Garden', 'Free parking', 'Heating', 'Washer'],
    'https://images.unsplash.com/photo-1518780664697-55e3ad937233',
    TRUE,
    FALSE
  ),
  (
    '00000000-0000-0000-0000-000000000103',
    '00000000-0000-0000-0000-000000000003',
    'Beachfront Villa with Private Pool',
    'Wake up to the sound of waves in this stunning beachfront villa. Step directly onto the sand from your private terrace or take a dip in your own pool. The open-plan living space is perfect for entertaining, while the bedrooms offer a peaceful retreat with sea views. Fully equipped with modern amenities and stylish furnishings, this villa provides the ultimate beach holiday experience without compromising on comfort or luxury.',
    'Marbella, Spain',
    28000, -- £280 per night
    6,
    3,
    4,
    2,
    ARRAY['WiFi', 'Pool', 'Beachfront', 'Kitchen', 'Air conditioning', 'TV', 'Washer', 'Dryer', 'Free parking'],
    'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2',
    TRUE,
    TRUE
  ),
  (
    '00000000-0000-0000-0000-000000000104',
    '00000000-0000-0000-0000-000000000003',
    'Modern Loft in Historic District',
    'This stylish loft combines historic architecture with contemporary design. Located in a converted factory building, it features exposed brick walls, high ceilings, and large windows that flood the space with natural light. The open-plan layout includes a fully equipped kitchen, comfortable living area, and a sleeping space with a premium mattress. Situated in the trendy historic district, you''ll be surrounded by artisan coffee shops, boutiques, and galleries.',
    'Barcelona, Spain',
    11000, -- £110 per night
    2,
    1,
    1,
    1,
    ARRAY['WiFi', 'Kitchen', 'Air conditioning', 'Heating', 'Washer', 'TV', 'Elevator'],
    'https://images.unsplash.com/photo-1536376072261-38c75010e6c9',
    TRUE,
    FALSE
  ),
  (
    '00000000-0000-0000-0000-000000000105',
    '00000000-0000-0000-0000-000000000002',
    'Mountain Cabin with Hot Tub',
    'Retreat to this cozy cabin nestled in the mountains. After a day of hiking or skiing, relax in your private hot tub while taking in the breathtaking views. Inside, you''ll find a warm and inviting space with a stone fireplace, fully equipped kitchen, and comfortable furnishings. The cabin is perfectly positioned to enjoy outdoor activities year-round, from summer trails to winter slopes, all while providing a peaceful sanctuary to return to.',
    'Scottish Highlands, United Kingdom',
    15000, -- £150 per night
    4,
    2,
    2,
    2,
    ARRAY['WiFi', 'Hot tub', 'Fireplace', 'Kitchen', 'Heating', 'Free parking', 'Mountain view'],
    'https://images.unsplash.com/photo-1518732714860-b62714ce0c59',
    TRUE,
    FALSE
  );

-- Insert demo bookings
INSERT INTO public.bookings (
  id, listing_id, user_id, host_id, check_in, check_out, 
  guests, total_amount, status, host_email, guest_email
)
VALUES
  (
    '00000000-0000-0000-0000-000000000201',
    '00000000-0000-0000-0000-000000000101',
    '00000000-0000-0000-0000-000000000004',
    '00000000-0000-0000-0000-000000000002',
    CURRENT_DATE + INTERVAL '10 days',
    CURRENT_DATE + INTERVAL '13 days',
    2,
    37500, -- £375 (£125 x 3 nights)
    'confirmed',
    'host1@example.com',
    'guest1@example.com'
  ),
  (
    '00000000-0000-0000-0000-000000000202',
    '00000000-0000-0000-0000-000000000103',
    '00000000-0000-0000-0000-000000000005',
    '00000000-0000-0000-0000-000000000003',
    CURRENT_DATE + INTERVAL '14 days',
    CURRENT_DATE + INTERVAL '21 days',
    4,
    196000, -- £1,960 (£280 x 7 nights)
    'confirmed',
    'host2@example.com',
    'guest2@example.com'
  ),
  (
    '00000000-0000-0000-0000-000000000203',
    '00000000-0000-0000-0000-000000000102',
    '00000000-0000-0000-0000-000000000005',
    '00000000-0000-0000-0000-000000000002',
    CURRENT_DATE - INTERVAL '20 days',
    CURRENT_DATE - INTERVAL '15 days',
    3,
    47500, -- £475 (£95 x 5 nights)
    'completed',
    'host1@example.com',
    'guest2@example.com'
  ),
  (
    '00000000-0000-0000-0000-000000000204',
    '00000000-0000-0000-0000-000000000104',
    '00000000-0000-0000-0000-000000000004',
    '00000000-0000-0000-0000-000000000003',
    CURRENT_DATE - INTERVAL '10 days',
    CURRENT_DATE - INTERVAL '7 days',
    2,
    33000, -- £330 (£110 x 3 nights)
    'completed',
    'host2@example.com',
    'guest1@example.com'
  );

-- Insert demo reviews
INSERT INTO public.reviews (
  id, booking_id, listing_id, user_id, rating, comment
)
VALUES
  (
    '00000000-0000-0000-0000-000000000301',
    '00000000-0000-0000-0000-000000000203',
    '00000000-0000-0000-0000-000000000102',
    '00000000-0000-0000-0000-000000000005',
    5,
    'Absolutely loved our stay at this cottage! It was even more charming in person than in the photos. The garden was beautiful and we enjoyed having our morning coffee outside. The kitchen was well-equipped for cooking meals, and the beds were very comfortable. The location was perfect for exploring the Cotswolds. We would definitely stay here again!'
  ),
  (
    '00000000-0000-0000-0000-000000000302',
    '00000000-0000-0000-0000-000000000204',
    '00000000-0000-0000-0000-000000000104',
    '00000000-0000-0000-0000-000000000004',
    4,
    'Great loft in an amazing location! The space was clean, stylish, and had everything we needed. We loved being able to walk to all the main attractions, restaurants, and shops. The only reason for 4 stars instead of 5 is that it was a bit noisy at night due to the central location. Otherwise, it was perfect and we would recommend it to others visiting Barcelona.'
  );

-- Insert demo payouts
INSERT INTO public.payouts (
  id, user_id, amount, stripe_payout_id, status
)
VALUES
  (
    '00000000-0000-0000-0000-000000000401',
    '00000000-0000-0000-0000-000000000002',
    42750, -- £427.50 (90% of £475)
    'po_demo_1',
    'paid'
  ),
  (
    '00000000-0000-0000-0000-000000000402',
    '00000000-0000-0000-0000-000000000003',
    29700, -- £297 (90% of £330)
    'po_demo_2',
    'paid'
  );