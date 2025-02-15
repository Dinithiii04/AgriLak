import Image from "next/image";
import { Leaf, Droplets, ShieldCheck, CloudRain } from "lucide-react";

export function AboutSection() {
  const features = [
    { icon: <Leaf className="w-6 h-6 text-green-800" />, title: "AI-Powered Crop Insights", description: "Leverage machine learning to enhance crop management." },
    { icon: <Droplets className="w-6 h-6 text-green-800" />, title: "Smart Irrigation", description: "Optimize water usage for sustainable farming." },
    { icon: <ShieldCheck className="w-6 h-6 text-green-800" />, title: "Disease Prevention", description: "AI-driven disease detection for proactive solutions." },
    { icon: <CloudRain className="w-6 h-6 text-green-800" />, title: "Sustainable Farming", description: "Data-driven approaches to boost productivity and soil health." },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center">
        {/* Left: Image */}
        <div className="lg:w-1/2 relative">
          <div className="relative w-full h-[643px]">
            <Image
              src="/images/hero.png"
              alt="Smart Paddy Farming"
              layout="fill"
              className="object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Right: Text Content */}
        <div className="lg:w-1/2 lg:pl-12 mt-10 lg:mt-0">
          <h3 className="text-green-800 font-semibold flex items-center mb-2">
            <Leaf className="w-6 h-6 mr-2" /> About Smart Paddy Farming
          </h3>
          <h2 className="text-3xl font-bold text-green-900 mb-4">
            AI-Driven Solutions for Sustainable Agriculture
          </h2>
          <p className="text-gray-600 mb-6">
            Transforming paddy farming with AI-powered predictions, real-time monitoring, and
            smart irrigation solutions to maximize yield and sustainability.
          </p>

          {/* Feature List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                {feature.icon}
                <div>
                  <h4 className="text-lg font-semibold text-green-900">{feature.title}</h4>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
