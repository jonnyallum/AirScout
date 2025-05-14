import Link from "next/link";
import Image from "next/image";
import { Star, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Sample data for listings
const listings = [
  {
    id: "1",
    title: "Luxury Beach Villa",
    location: "Miami, Florida",
    price: 299,
    rating: 4.92,
    reviews: 86,
    image: "https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg",
    category: "Beach",
    featured: true,
  },
  {
    id: "2",
    title: "Mountain Retreat Cabin",
    location: "Aspen, Colorado",
    price: 179,
    rating: 4.85,
    reviews: 124,
    image: "https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg",
    category: "Mountain",
    featured: true,
  },
  {
    id: "3",
    title: "Downtown Loft with City Views",
    location: "New York, NY",
    price: 249,
    rating: 4.78,
    reviews: 152,
    image: "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg",
    category: "Urban",
    featured: true,
  },
  {
    id: "4",
    title: "Tropical Paradise Villa",
    location: "Bali, Indonesia",
    price: 189,
    rating: 4.95,
    reviews: 203,
    image: "https://images.pexels.com/photos/2373201/pexels-photo-2373201.jpeg",
    category: "Tropical",
    featured: true,
  },
  {
    id: "5",
    title: "Cozy Lakeside Cottage",
    location: "Lake Tahoe, California",
    price: 159,
    rating: 4.87,
    reviews: 92,
    image: "https://images.pexels.com/photos/803975/pexels-photo-803975.jpeg",
    category: "Nature",
    featured: false,
  },
  {
    id: "6",
    title: "Historic Townhouse",
    location: "Boston, Massachusetts",
    price: 225,
    rating: 4.82,
    reviews: 78,
    image: "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg",
    category: "Urban",
    featured: false,
  },
  {
    id: "7",
    title: "Beachfront Condo",
    location: "Cancun, Mexico",
    price: 210,
    rating: 4.9,
    reviews: 156,
    image: "https://images.pexels.com/photos/1450363/pexels-photo-1450363.jpeg",
    category: "Beach",
    featured: false,
  },
  {
    id: "8",
    title: "Modern Desert Retreat",
    location: "Scottsdale, Arizona",
    price: 175,
    rating: 4.88,
    reviews: 64,
    image: "https://images.pexels.com/photos/2351649/pexels-photo-2351649.jpeg",
    category: "Nature",
    featured: false,
  },
  {
    id: "9",
    title: "Ski-in/Ski-out Chalet",
    location: "Whistler, Canada",
    price: 315,
    rating: 4.94,
    reviews: 108,
    image: "https://images.pexels.com/photos/754268/pexels-photo-754268.jpeg",
    category: "Winter",
    featured: false,
  },
];

export default function ListingsPage() {
  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Explore all listings</h1>
            <p className="text-muted-foreground">
              Discover unique places to stay all around the world
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {listings.map((listing) => (
            <Link
              key={listing.id}
              href={`/listings/${listing.id}`}
              className="property-card group h-full flex flex-col"
            >
              <div className="relative h-56 w-full">
                <Image
                  src={listing.image}
                  alt={listing.title}
                  fill
                  className="listing-image object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="font-medium">
                    {listing.category}
                  </Badge>
                </div>
                {listing.featured && (
                  <div className="absolute top-4 right-4">
                    <Badge variant="accent" className="font-medium">
                      Featured
                    </Badge>
                  </div>
                )}
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold line-clamp-1">
                    {listing.title}
                  </h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">{listing.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {listing.location}
                </p>
                <div className="mt-auto pt-4 flex justify-between items-center">
                  <p className="font-semibold">
                    ${listing.price}
                    <span className="text-sm font-normal text-muted-foreground">
                      {" "}
                      / night
                    </span>
                  </p>
                  <span className="text-sm text-muted-foreground">
                    {listing.reviews} reviews
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}