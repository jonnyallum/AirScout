"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative h-[80vh] min-h-[600px] w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="https://images.pexels.com/photos/2549018/pexels-photo-2549018.jpeg"
          alt="Scenic vacation rental by the beach"
          fill
          className="object-cover"
          priority
          quality={90}
          onLoad={() => setIsLoaded(true)}
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Hero Content */}
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-2xl text-white"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Find your perfect getaway
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              Discover unique places to stay around the world. Book with confidence and travel with ease.
            </p>
            <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg w-full max-w-md">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Where to?
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search destinations"
                      className="w-full py-2 pl-10 pr-4 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Check in
                    </label>
                    <input
                      type="date"
                      className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Check out
                    </label>
                    <input
                      type="date"
                      className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
                <Button size="lg" className="w-full">
                  Search
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}