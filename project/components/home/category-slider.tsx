"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Home, Users, Coffee, Palmtree, Snowflake, Mountain, Building, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
}

export default function CategorySlider() {
  const sliderRef = useRef<HTMLDivElement>(null);
  
  const categories: Category[] = [
    { id: "all", name: "All", icon: <Home className="h-6 w-6" /> },
    { id: "family", name: "Family", icon: <Users className="h-6 w-6" /> },
    { id: "nomad", name: "Digital Nomad", icon: <Coffee className="h-6 w-6" /> },
    { id: "tropical", name: "Tropical", icon: <Palmtree className="h-6 w-6" /> },
    { id: "winter", name: "Winter", icon: <Snowflake className="h-6 w-6" /> },
    { id: "mountain", name: "Mountain", icon: <Mountain className="h-6 w-6" /> },
    { id: "urban", name: "Urban", icon: <Building className="h-6 w-6" /> },
    { id: "beach", name: "Beach", icon: <Waves className="h-6 w-6" /> },
  ];
  
  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const { current } = sliderRef;
      const scrollAmount = direction === "left" 
        ? current.scrollLeft - 200 
        : current.scrollLeft + 200;
      
      current.scrollTo({
        left: scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="relative py-10">
      <h2 className="text-2xl font-semibold mb-6">Explore by category</h2>
      
      <div className="relative group">
        <motion.div 
          className="overflow-x-scroll scrollbar-hide scroll-smooth flex space-x-4 pb-4"
          ref={sliderRef}
          whileTap={{ cursor: "grabbing" }}
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              className="category-item flex-shrink-0 min-w-[120px] text-center"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bg-secondary dark:bg-secondary/50 rounded-full p-4 mb-2 mx-auto w-16 h-16 flex items-center justify-center">
                {category.icon}
              </div>
              <span className="text-sm font-medium">{category.name}</span>
            </motion.div>
          ))}
        </motion.div>
        
        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 rounded-full bg-white/90 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 rounded-full bg-white/90 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}