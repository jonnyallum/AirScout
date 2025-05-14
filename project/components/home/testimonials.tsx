"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Traveler",
    avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg",
    quote: "AirScout made it so easy to find the perfect vacation home for our family trip. The filters are intuitive, and the properties were exactly as described. We had an amazing time!",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Digital Nomad",
    avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
    quote: "As someone who works remotely and travels constantly, I rely on AirScout to find places with great WiFi and workspaces. The digital nomad category is perfect for my needs.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Property Host",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    quote: "Since listing my property on AirScout, I've had consistent bookings with quality guests. The platform makes it easy to manage my calendar and communicate with travelers.",
    rating: 4,
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent((current + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrent((current - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Hear from travelers and hosts who have used AirScout to find their perfect accommodations or share their spaces.
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-card shadow-lg rounded-xl p-8 text-center"
          >
            <div className="relative w-20 h-20 mx-auto mb-6">
              <Image
                src={testimonials[current].avatar}
                alt={testimonials[current].name}
                fill
                className="object-cover rounded-full"
              />
            </div>
            
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < testimonials[current].rating
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            
            <blockquote className="text-lg italic mb-6">
              "{testimonials[current].quote}"
            </blockquote>
            
            <div className="font-semibold">
              {testimonials[current].name}
            </div>
            <div className="text-sm text-muted-foreground">
              {testimonials[current].role}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === current ? "bg-primary" : "bg-gray-300 dark:bg-gray-700"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full"
          onClick={prev}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full"
          onClick={next}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </section>
  );
}