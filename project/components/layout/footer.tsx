import Link from "next/link";
import { Globe, Facebook, Twitter, Instagram, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Globe className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">AirScout</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Find your perfect stay around the world with AirScout, the premier platform for unique accommodations.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-base mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/listings" className="text-sm text-muted-foreground hover:text-primary">
                  Find stays
                </Link>
              </li>
              <li>
                <Link href="/experiences" className="text-sm text-muted-foreground hover:text-primary">
                  Experiences
                </Link>
              </li>
              <li>
                <Link href="/categories/family" className="text-sm text-muted-foreground hover:text-primary">
                  Family-friendly
                </Link>
              </li>
              <li>
                <Link href="/categories/nomad" className="text-sm text-muted-foreground hover:text-primary">
                  Digital nomad
                </Link>
              </li>
              <li>
                <Link href="/categories/nature" className="text-sm text-muted-foreground hover:text-primary">
                  Nature retreats
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-base mb-4">Hosting</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/host" className="text-sm text-muted-foreground hover:text-primary">
                  Become a host
                </Link>
              </li>
              <li>
                <Link href="/host/resources" className="text-sm text-muted-foreground hover:text-primary">
                  Hosting resources
                </Link>
              </li>
              <li>
                <Link href="/host/community" className="text-sm text-muted-foreground hover:text-primary">
                  Community forum
                </Link>
              </li>
              <li>
                <Link href="/host/responsible" className="text-sm text-muted-foreground hover:text-primary">
                  Responsible hosting
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-base mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-sm text-muted-foreground hover:text-primary">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/safety" className="text-sm text-muted-foreground hover:text-primary">
                  Safety information
                </Link>
              </li>
              <li>
                <Link href="/cancellation" className="text-sm text-muted-foreground hover:text-primary">
                  Cancellation options
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">
                  Contact us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              <Link href="/privacy" className="text-xs text-muted-foreground hover:text-primary">
                Privacy
              </Link>
              <Link href="/terms" className="text-xs text-muted-foreground hover:text-primary">
                Terms
              </Link>
              <Link href="/sitemap" className="text-xs text-muted-foreground hover:text-primary">
                Sitemap
              </Link>
            </div>
            <div className="flex items-center">
              <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-xs text-muted-foreground mr-4">English (US)</span>
              <span className="text-xs text-muted-foreground">$ USD</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4 text-center md:text-left">
            &copy; {new Date().getFullYear()} AirScout. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}