"use client";

import { Sprout, Droplets, Sun, ShieldCheck } from 'lucide-react';

export function CareServices() {
  const services = [
    {
      icon: <Sprout className="w-8 h-8" />,
      title: 'Soil Health Monitoring',
      description: 'Analyze soil conditions with AI for optimal crop growth.',
    },
    {
      icon: <Droplets className="w-8 h-8" />,
      title: 'Precision Irrigation',
      description: 'Efficient water usage based on real-time data.',
    },
    {
      icon: <Sun className="w-8 h-8" />,
      title: 'Climate Adaptation',
      description: 'Smart weather insights to mitigate climate risks.',
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: 'Disease Prevention',
      description: 'AI-powered disease detection for early action.',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-green-800 mb-4">
            AI-Powered Smart Paddy Farming
          </h2>
          <p className="text-gray-600">
            Revolutionizing agriculture with intelligent solutions for a sustainable future.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-lg text-center shadow-md hover:shadow-lg transition-all">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-800 mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
