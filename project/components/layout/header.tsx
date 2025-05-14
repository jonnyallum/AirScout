"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, User, Search, X, MapPin, Calendar, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full",
        isScrolled ? "bg-white dark:bg-gray-900 shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Globe className="h-8 w-8 text-primary" />
            <span className="font-bold text-xl md:text-2xl">AirScout</span>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:block flex-1 max-w-md mx-6">
            <div className="relative">
              <Button 
                variant="outline" 
                className="w-full justify-start text-left font-normal h-12 pl-4 border-gray-300"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-muted-foreground">Where are you going?</span>
              </Button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/listings" className="text-sm font-medium hover:text-primary">
              Explore
            </Link>
            <Link href="/host" className="text-sm font-medium hover:text-primary">
              Become a Host
            </Link>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="space-y-6 py-6">
                  <h3 className="text-lg font-medium">Menu</h3>
                  <nav className="flex flex-col space-y-4">
                    <Link href="/login" className="flex items-center py-2 text-base">
                      Sign in
                    </Link>
                    <Link href="/signup" className="flex items-center py-2 text-base">
                      Sign up
                    </Link>
                    <Link href="/host" className="flex items-center py-2 text-base">
                      Host your home
                    </Link>
                    <Link href="/help" className="flex items-center py-2 text-base">
                      Help Center
                    </Link>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="space-y-6 py-6">
                  <h3 className="text-lg font-medium">Menu</h3>
                  <div className="mb-4">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-left font-normal"
                      onClick={() => setIsSearchOpen(true)}
                    >
                      <Search className="h-4 w-4 mr-2" />
                      Search
                    </Button>
                  </div>
                  <nav className="flex flex-col space-y-4">
                    <Link href="/login" className="flex items-center py-2 text-base">
                      Sign in
                    </Link>
                    <Link href="/signup" className="flex items-center py-2 text-base">
                      Sign up
                    </Link>
                    <Link href="/listings" className="flex items-center py-2 text-base">
                      Explore
                    </Link>
                    <Link href="/host" className="flex items-center py-2 text-base">
                      Host your home
                    </Link>
                    <Link href="/help" className="flex items-center py-2 text-base">
                      Help Center
                    </Link>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      
      {/* Search Popover */}
      <Popover open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <PopoverContent className="w-screen p-0 border-0 mt-2" align="center">
          <div className="bg-white dark:bg-gray-900 shadow-lg rounded-b-lg">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-medium">Search</h3>
              <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-4 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Where</label>
                <div className="flex items-center border rounded-md px-3 py-2">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <Input 
                    placeholder="Destination" 
                    className="border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Check in</label>
                  <div className="flex items-center border rounded-md px-3 py-2">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <Input 
                      type="date" 
                      className="border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Check out</label>
                  <div className="flex items-center border rounded-md px-3 py-2">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <Input 
                      type="date" 
                      className="border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                </div>
              </div>
              <Button className="w-full">Search</Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </header>
  );
}