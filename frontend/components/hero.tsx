"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function Hero() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center py-16 lg:py-24">
          {/* Left Section - Text */}
          <div className="lg:w-1/2 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl lg:text-6xl font-bold text-green-800 leading-tight mb-6">
              AI-Driven Solutions for Smarter Paddy Farming
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Enhance productivity and sustainability with real-time insights on yield prediction, 
              disease detection, fertilizer recommendations, and irrigation management.
            </p>
            <div className="flex gap-4">
              <Button className="bg-green-800 hover:bg-green-900 rounded-full px-8">
                Get Started
              </Button>
              {/* Learn More Button - Opens Modal */}
              <Button
                variant="outline"
                className="border-green-800 text-green-800 rounded-full"
                onClick={() => setOpen(true)}
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Right Section - Image */}
          <div className="lg:w-1/2 mt-12 lg:mt-0 relative px-4">
            <div className="relative">
              <Image
                src="/images/f1.jpg"
                alt="Smart Paddy Farming"
                width={600}
                height={600}
                className="rounded-full object-cover"
                priority
              />
              <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-green-200 rounded-full -z-10" />
              <div className="absolute -left-12 -top-12 w-48 h-48 bg-yellow-100 rounded-full -z-10" />
            </div>
          </div>
        </div>
      </div>

      {/* Modal for "Learn More" */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl bg-white p-6 rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-black text-lg font-bold">
              How Our AI Models Work
            </DialogTitle>
          </DialogHeader>
          <p className="text-gray-800">
            Our system consists of four AI-powered modules:
          </p>
          <ul className="list-disc pl-5 text-gray-800">
            <li><strong>Paddy Yield Prediction:</strong> Uses past data & weather insights to estimate yields.</li>
            <li><strong>Pest and Disease Detection:</strong> Analyzes images to detect infections early.</li>
            <li><strong>Soil Quality Analysis:</strong> Evaluates nutrients & moisture to guide fertilization.</li>
            <li><strong>Irrigation Optimization:</strong> Recommends precise water levels based on climate data.</li>
          </ul>
        </DialogContent>
      </Dialog>
    </div>
  );
}
