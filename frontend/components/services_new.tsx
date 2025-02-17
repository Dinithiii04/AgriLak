import { useState } from 'react';
import { Sprout, ShieldCheck, CloudRain, ArrowUpRight, Droplet, X } from 'lucide-react';

export function Services() {
  const [selectedService, setSelectedService] = useState<{
    title: string;
    description: string;
    image: string;
    longDescription: string;
  } | null>(null);

  const servicesList = [
    {
      icon: <Sprout className="w-10 h-10 text-green-800" />,
      title: 'Yield Prediction',
      description: 'AI-powered yield forecasting for better crop planning.',
      image: '/images/yield-prediction.jpg',
      longDescription: 'Our AI model analyzes historical weather and soil conditions to provide accurate yield forecasts, helping farmers plan ahead and optimize production.',
    },
    {
      icon: <Droplet className="w-10 h-10 text-green-800" />,
      title: 'Irrigation Management',
      description: 'Optimize water usage with real-time irrigation insights.',
      image: '/images/irrigation-management.jpg',
      longDescription: 'Using real-time weather and soil moisture data, our system helps farmers make data-driven decisions to minimize water wastage and improve irrigation efficiency.',
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-green-800" />,
      title: 'Disease Detection',
      description: 'Early disease identification through AI-driven analysis.',
      image: '/images/disease-detection.jpg',
      longDescription: 'Our AI-based disease detection system identifies early signs of plant diseases using image recognition and provides actionable insights to prevent crop loss.',
    },
    {
      icon: <CloudRain className="w-10 h-10 text-green-800" />,
      title: 'Fertilizer Recommendations',
      description: 'Smart recommendations based on soil quality and crop needs.',
      image: '/images/fertilizer-recommendations.jpg',
      longDescription: 'Analyzing soil test data, our AI suggests optimal fertilizer combinations to enhance soil fertility and maximize crop yield while minimizing environmental impact.',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-green-800 mb-4">What We Do</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Empowering farmers with AI-driven insights to enhance crop yield and sustainability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesList.map((service, index) => (
            <div
              key={index}
              className="relative p-6 rounded-xl shadow-sm transition-all text-center"
              style={{ backgroundColor: '#CADBB7' }}
            >
              {/* Floating Icon */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-16 h-16 flex items-center justify-center bg-white rounded-full shadow-md">
                {service.icon}
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>

              {/* Clickable Arrow Button */}
              <button
                className="absolute bottom-4 left-4 w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full transition-all hover:bg-gray-300"
                onClick={() => setSelectedService(service)}
              >
                <ArrowUpRight className="w-5 h-5 text-green-800" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedService && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-12 rounded-3xl shadow-3xl w-[95%] max-w-3xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-3xl font-bold">{selectedService.title}</h3>
              <button onClick={() => setSelectedService(null)} className="hover:bg-gray-100 rounded-full p-2">
                <X className="w-7 h-7 text-gray-600 hover:text-gray-800" />
              </button>
            </div>

            {/* Image */}
            <img 
              src={selectedService.image} 
              alt={selectedService.title} 
              className="w-full h-60 object-cover rounded-lg mb-6" 
            />

            {/* Description */}
            <p className="text-gray-700 leading-relaxed">{selectedService.longDescription}</p>
          </div>
        </div>
      )}
    </section>
  );
}
