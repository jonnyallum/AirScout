"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useInView } from "react-intersection-observer";

const steps = [
  {
    title: "Tell us about your place",
    description: "Share some basic information about your property, like its location and how many guests can stay.",
    image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg"
  },
  {
    title: "Make it stand out",
    description: "Add at least 5 photos plus a title and description—we'll help you out.",
    image: "https://images.pexels.com/photos/1420702/pexels-photo-1420702.jpeg"
  },
  {
    title: "Finish up and publish",
    description: "Set a starting price and publish your listing when you're ready.",
    image: "https://images.pexels.com/photos/5825576/pexels-photo-5825576.jpeg"
  }
];

export default function HostPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [section1Ref, section1InView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [section2Ref, section2InView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [section3Ref, section3InView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/6186523/pexels-photo-6186523.jpeg"
            alt="Hosting with AirScout"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Host your space on AirScout
            </h1>
            <p className="text-xl mb-8 text-white/90">
              Join thousands of hosts and earn extra income by sharing your space with travelers from around the world.
            </p>
            <Button size="lg" className="text-lg px-8">
              Get Started
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How hosting works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              List your space in 3 simple steps and start earning
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div 
                key={index}
                className={`relative cursor-pointer rounded-xl overflow-hidden transition-all duration-300 ${
                  activeStep === index ? "ring-2 ring-primary shadow-lg" : "hover:shadow-md"
                }`}
                onClick={() => setActiveStep(index)}
              >
                <div className="aspect-[4/3] relative">
                  <Image 
                    src={step.image} 
                    alt={step.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center text-white font-medium ${
                      activeStep === index ? "bg-primary" : "bg-secondary text-muted-foreground"
                    }`}>
                      {index + 1}
                    </div>
                    <div className="ml-4 text-xl font-semibold">{step.title}</div>
                  </div>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section 
        ref={section1Ref}
        className="py-20 bg-secondary/30"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0 }}
            animate={section1InView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Hosting benefits that work for you
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Earn extra income
                    </h3>
                    <p className="text-muted-foreground">
                      Turn your extra space into extra income that can help you pay your bills or fund your next vacation.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Host with confidence
                    </h3>
                    <p className="text-muted-foreground">
                      Our comprehensive insurance covers up to $1,000,000 in liability and property damage.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Control your schedule
                    </h3>
                    <p className="text-muted-foreground">
                      Host whenever works for you. Block dates, set minimum stays, and customize house rules.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Link href="/host/signup">
                  <Button size="lg" className="group">
                    Get started
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="lg:order-first">
              <Image
                src="https://images.pexels.com/photos/5490276/pexels-photo-5490276.jpeg"
                alt="Host holding keys"
                width={600}
                height={400}
                className="rounded-xl shadow-lg object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Earnings Calculator Section */}
      <section 
        ref={section2Ref}
        className="py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={section2InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How much could you earn?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Use our earnings calculator to see how much you could make by hosting your space
            </p>
          </motion.div>

          <motion.div 
            className="bg-card shadow-lg rounded-xl p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={section2InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Property type
                  </label>
                  <select className="w-full p-3 border rounded-md">
                    <option>Entire home</option>
                    <option>Private room</option>
                    <option>Shared room</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Location
                  </label>
                  <input 
                    type="text" 
                    placeholder="Enter city or region"
                    className="w-full p-3 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Number of guests
                  </label>
                  <select className="w-full p-3 border rounded-md">
                    <option>1 guest</option>
                    <option>2 guests</option>
                    <option>3 guests</option>
                    <option>4+ guests</option>
                  </select>
                </div>
                <Button className="w-full">Calculate earnings</Button>
              </div>
              <div className="bg-secondary/20 rounded-xl p-6 flex flex-col justify-center">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">
                    Estimated monthly earnings
                  </p>
                  <div className="text-4xl font-bold mb-4">$1,840</div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Based on 15 nights booked per month at an average of $120/night
                  </p>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-3/4"></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>$0</span>
                    <span>$3,500</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section 
        ref={section3Ref}
        className="py-20 bg-secondary/30"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            animate={section3InView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Host stories
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Hear from our community of hosts
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={section3InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 relative rounded-full overflow-hidden mr-4">
                  <Image 
                    src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
                    alt="Host"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold">David Wilson</div>
                  <div className="text-sm text-muted-foreground">Miami, FL</div>
                </div>
              </div>
              <p className="italic text-muted-foreground mb-4">
                "I started hosting my beach house while I was traveling for work. Now it's a steady source of income that helped me renovate my own home."
              </p>
              <div className="text-sm text-muted-foreground">
                Hosting since 2021 • $38,000 earned
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 relative rounded-full overflow-hidden mr-4">
                  <Image 
                    src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
                    alt="Host"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold">Laura Chen</div>
                  <div className="text-sm text-muted-foreground">Denver, CO</div>
                </div>
              </div>
              <p className="italic text-muted-foreground mb-4">
                "I love meeting people from all over the world through hosting. The extra income helps me save for my daughter's college fund."
              </p>
              <div className="text-sm text-muted-foreground">
                Hosting since 2019 • $52,000 earned
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 relative rounded-full overflow-hidden mr-4">
                  <Image 
                    src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg"
                    alt="Host"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold">Miguel Sanchez</div>
                  <div className="text-sm text-muted-foreground">Santa Fe, NM</div>
                </div>
              </div>
              <p className="italic text-muted-foreground mb-4">
                "Hosting my casita has allowed me to share my city's culture with visitors. It's not just income—it's about creating memorable experiences."
              </p>
              <div className="text-sm text-muted-foreground">
                Hosting since 2020 • $41,500 earned
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to become a host?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join our community of hosts and start earning extra income by sharing your space.
          </p>
          <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90">
            Get Started
          </Button>
        </div>
      </section>
    </div>
  );
}