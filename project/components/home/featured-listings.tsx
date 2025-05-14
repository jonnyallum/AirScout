"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
    featured: true,
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
    featured: true,
  },
];

export default function FeaturedListings() {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(listings.length / itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const currentListings = listings.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Featured Listings</h2>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevPage}
            disabled={currentPage === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextPage}
            disabled={currentPage === totalPages - 1}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
        key={currentPage}
      >
        {currentListings.map((listing) => (
          <motion.div
            key={listing.id}
            className="property-card group"
            variants={item}
          >
            <Link href={`/listings/${listing.id}`}>
              <div className="relative h-64 w-full">
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
              <div className="p-4">
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
                <div className="mt-4 flex justify-between items-center">
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
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-8 text-center">
        <Link href="/listings">
          <Button variant="outline" size="lg">
            View all listings
          </Button>
        </Link>
      </div>
    </section>
  );
}