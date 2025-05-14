import Image from "next/image";
import Link from "next/link";
import { Star, Users, Wifi, Car, Utensils, Tv, Coffee, MapPin, Share, Heart, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Sample data for a single listing
const listingData = {
  id: "1",
  title: "Luxury Beach Villa",
  description: "Beautiful beachfront villa with stunning ocean views. This spacious property features 3 bedrooms, 2 bathrooms, a fully equipped kitchen, and a private pool. Perfect for a family vacation or a group of friends looking to enjoy the beach and local attractions. The property is located just steps from the beach and a short drive from restaurants, shopping, and entertainment.",
  location: "Miami, Florida",
  price: 299,
  rating: 4.92,
  reviews: 86,
  images: [
    "https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg",
    "https://images.pexels.com/photos/261395/pexels-photo-261395.jpeg",
    "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
    "https://images.pexels.com/photos/1457847/pexels-photo-1457847.jpeg",
    "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg"
  ],
  category: "Beach",
  featured: true,
  host: {
    name: "Emma Rodriguez",
    joined: "January 2020",
    responseRate: 98,
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
  },
  specs: {
    guests: 6,
    bedrooms: 3,
    beds: 4,
    baths: 2
  },
  amenities: [
    { name: "Wi-Fi", icon: <Wifi className="h-5 w-5" /> },
    { name: "Free parking", icon: <Car className="h-5 w-5" /> },
    { name: "Kitchen", icon: <Utensils className="h-5 w-5" /> },
    { name: "TV", icon: <Tv className="h-5 w-5" /> },
    { name: "Coffee maker", icon: <Coffee className="h-5 w-5" /> }
  ],
  availability: {
    checkIn: "2:00 PM",
    checkOut: "11:00 AM",
    minStay: 2
  }
};

export default function ListingDetailPage() {
  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center text-sm mb-6">
          <Link href="/listings" className="text-muted-foreground hover:text-primary flex items-center">
            <Home className="h-4 w-4 mr-1" />
            Listings
          </Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <span className="font-medium">{listingData.title}</span>
        </nav>
        
        <div className="flex flex-col md:flex-row justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{listingData.title}</h1>
            <div className="flex items-center flex-wrap gap-2">
              <div className="flex items-center mr-2">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="font-medium mr-1">{listingData.rating}</span>
                <span className="text-muted-foreground">({listingData.reviews} reviews)</span>
              </div>
              <span className="text-muted-foreground">•</span>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-muted-foreground mr-1" />
                <span className="text-muted-foreground">{listingData.location}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Share className="h-4 w-4" />
              <span>Share</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              <span>Save</span>
            </Button>
          </div>
        </div>
        
        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 mb-8 rounded-xl overflow-hidden">
          <div className="md:col-span-2 md:row-span-2 relative h-64 md:h-full">
            <Image 
              src={listingData.images[0]} 
              alt={`${listingData.title} - Main Image`} 
              fill 
              className="object-cover"
            />
          </div>
          {listingData.images.slice(1, 5).map((image, index) => (
            <div key={index} className="relative h-48">
              <Image 
                src={image} 
                alt={`${listingData.title} - Image ${index + 2}`} 
                fill 
                className="object-cover"
              />
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold mb-2">
                    Entire villa hosted by {listingData.host.name}
                  </h2>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span>{listingData.specs.guests} guests</span>
                    <span>•</span>
                    <span>{listingData.specs.bedrooms} bedrooms</span>
                    <span>•</span>
                    <span>{listingData.specs.beds} beds</span>
                    <span>•</span>
                    <span>{listingData.specs.baths} baths</span>
                  </div>
                </div>
                <div className="relative h-12 w-12 rounded-full overflow-hidden">
                  <Image 
                    src={listingData.host.avatar} 
                    alt={listingData.host.name} 
                    fill 
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">About this place</h2>
              <p className="text-muted-foreground">{listingData.description}</p>
            </div>
            
            <Separator className="my-6" />
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">What this place offers</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {listingData.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-3">
                    {amenity.icon}
                    <span>{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Location</h2>
              <div className="aspect-video relative rounded-lg overflow-hidden bg-muted flex items-center justify-center mb-4">
                <MapPin className="h-8 w-8 text-muted-foreground/50" />
                <p className="text-muted-foreground/80 absolute">Map view available after booking</p>
              </div>
              <p className="text-muted-foreground">{listingData.location}</p>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card border rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-2xl font-bold">${listingData.price}</span>
                  <span className="text-muted-foreground"> / night</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="font-medium">{listingData.rating}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 rounded-t-lg overflow-hidden border mb-4">
                <div className="p-3 border-r">
                  <p className="text-xs font-semibold mb-1">CHECK-IN</p>
                  <input
                    type="date"
                    className="w-full p-0 border-0 focus:ring-0 text-sm"
                  />
                </div>
                <div className="p-3">
                  <p className="text-xs font-semibold mb-1">CHECKOUT</p>
                  <input
                    type="date"
                    className="w-full p-0 border-0 focus:ring-0 text-sm"
                  />
                </div>
              </div>
              
              <div className="border rounded-b-lg p-3 mb-4">
                <p className="text-xs font-semibold mb-1">GUESTS</p>
                <select className="w-full p-0 border-0 focus:ring-0 text-sm bg-transparent">
                  <option>1 guest</option>
                  <option>2 guests</option>
                  <option>3 guests</option>
                  <option>4 guests</option>
                  <option>5 guests</option>
                  <option>6 guests</option>
                </select>
              </div>
              
              <Button className="w-full mb-4">Reserve</Button>
              
              <p className="text-center text-sm text-muted-foreground mb-6">
                You won't be charged yet
              </p>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm underline">
                    ${listingData.price} x 5 nights
                  </span>
                  <span>${listingData.price * 5}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm underline">Cleaning fee</span>
                  <span>$85</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm underline">Service fee</span>
                  <span>$110</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total before taxes</span>
                  <span>${(listingData.price * 5) + 85 + 110}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}