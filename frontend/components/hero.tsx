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
      <DialogContent className="max-w-2xl bg-white p-6 rounded-lg shadow-lg max-h-screen overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-black text-lg font-bold">
              Learn More About Our AI-Driven Paddy Farming
            </DialogTitle>
          </DialogHeader>
          <p className="text-gray-800 font-semibold">📌 How the AI Models Work:</p>
          <ul className="list-disc pl-5 text-gray-800">
            <li><strong>Paddy Yield Prediction:</strong> Uses Regression models (e.g., Random Forest) to estimate expected yield based on soil, weather, and historical data.</li>
            <li><strong>Pest and Disease Detection:</strong> Employs Convolutional Neural Networks (CNN) for image-based detection of crop diseases and pest infestations.</li>
            <li><strong>Fertilizer Recommendation:</strong> Uses Random Forest and Decision Trees to analyze soil composition and recommend optimal fertilizer usage.</li>
            <li><strong>Irrigation Optimization:</strong> Utilizes a binary classification model to determine whether to irrigate based on environmental factors.</li>
          </ul>

          <p className="text-gray-800 font-semibold mt-4">📌 Dataset & Model Training:</p>
          <ul className="list-disc pl-5 text-gray-800">
            <li>Historical yield data, soil properties, and climate patterns.</li>
            <li>Labeled image datasets of infected and healthy plants.</li>
            <li>Agricultural soil datasets for fertilizer optimization.</li>
            <li>Weather datasets including humidity, temperature, and soil moisture levels.</li>
          </ul>

          <p className="text-gray-800 font-semibold mt-4">📌 Sustainability Impact:</p>
          <p className="text-gray-800">Our AI-driven recommendations contribute to sustainable agriculture by optimizing fertilizer use, reducing pesticide waste, improving irrigation efficiency, and enhancing overall yield.</p>

          <p className="text-gray-800 font-semibold mt-4">📌 Future Enhancements:</p>
          <ul className="list-disc pl-5 text-gray-800">
            <li>Integration of real-time sensor data for improved accuracy.</li>
            <li>Mobile application support for farmer accessibility.</li>
            <li>Advanced deep learning for pest detection.</li>
            <li>AI-driven automated drone monitoring for large-scale farming.</li>
          </ul>

          <p className="text-gray-800 font-semibold mt-4">📌 Link to Research & Documentation:</p>
          <p className="text-gray-800">For more details, visit:</p>
          <ul className="list-disc pl-5 text-gray-800">
            <li><strong>GitHub Repository:</strong> [Your GitHub Link]</li>
            <li><strong>Research Paper/Whitepaper:</strong> [Your Research Link]</li>
            <li><strong>API Documentation:</strong> [Your API Documentation Link]</li>
          </ul>
        </DialogContent>
      </Dialog>
    </div>
  );
}

