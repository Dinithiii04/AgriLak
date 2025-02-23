"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { FadeAnimation } from "./fade-animation"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const features = ["Smart Data Analytics", "Real-time Monitoring", "Automated Reports", "Predictive Insights"]

const bannerImages = [
  "/images/iri.jpg",
  "/images/soil.jpg",
  "/images/Untitled design.jpg",
  "/images/yield.jpg",
  "/images/soooil.jpg"

]

export function Hero() {
  const [currentImage, setCurrentImage] = useState(0)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % bannerImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % bannerImages.length)
  }


  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + bannerImages.length) % bannerImages.length)
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-20 space-y-12">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-green-900 tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl">
            AI-Driven Solutions for Smarter Paddy Farming
          </h1>
          <FadeAnimation
            words={features}
            className="text-xl sm:text-3xl md:text-4xl text-[#3d691d] font-medium tracking-tight"
          />
        </div>

        <div className="max-w-3xl mx-auto text-center space-y-8">
          <p className="text-lg text-gray-600 leading-relaxed">
            Enhance productivity and sustainability with real-time insights on yield prediction, 
            disease detection, fertilizer recommendations, and irrigation management.
          </p>
        <div className="flex flex-wrap justify-center gap-6">
          <Button
          variant="outline"
          className="border-green-800 text-green-800 rounded-full"
          onClick={() => setOpen(true)}>
          Learn More
          </Button>
          <Button className="bg-green-800 hover:bg-[#37591f] text-white rounded-full px-8">
           View Demo
          </Button>
        </div>
      </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-2xl bg-white p-6 rounded-lg shadow-lg max-h-screen overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-black text-lg font-bold">
                Learn More About Our AI-Driven Paddy Farming
              </DialogTitle>
            </DialogHeader>
            <p className="text-gray-800 font-semibold">📌 How the AI Models Work:</p>
            <ul className="list-disc pl-5 text-gray-800">
              <li><strong>Paddy Yield Prediction:</strong> Uses regression models to estimate yield.</li>
              <li><strong>Pest and Disease Detection:</strong> Employs CNN for image-based detection.</li>
              <li><strong>Fertilizer Recommendation:</strong> Uses decision trees for analysis.</li>
              <li><strong>Irrigation Optimization:</strong> Uses classification models for irrigation decisions.</li>
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

      <div className="relative max-w-6xl mx-auto">
        <div className="aspect-[16/7] relative overflow-hidden rounded-xl shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={bannerImages[currentImage] || "/placeholder.svg"}
                alt="Platform Interface"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>

          <div className="absolute inset-0 flex items-center justify-between p-4">
            <button
              onClick={prevImage}
              className="p-3 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextImage}
              className="p-3 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
            {bannerImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentImage ? "bg-white scale-125 shadow-lg" : "bg-white/60 hover:bg-white/80"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
