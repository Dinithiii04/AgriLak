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
      description: 'AI-powered yield forecasting for better crop planning and decision-making.',
      image: 'images/paddy-img2.jpg',
      longDescription: 'Our AI model analyzes historical weather and soil conditions to provide accurate yield forecasts, helping farmers plan ahead and optimize production. This enables better resource allocation, minimizes waste, and ensures sustainability in agricultural practices. Farmers can use predictive insights to determine the best planting schedules and expected output, helping them secure better market opportunities and reduce financial risks.',
    },
    {
      icon: <Droplet className="w-10 h-10 text-green-800" />,
      title: 'Irrigation Management',
      description: 'Optimize water usage with real-time insights to prevent under or over-irrigation.',
      image: 'images/paddy-img4.jpg',
      longDescription: 'Using real-time weather and soil moisture data, our system helps farmers make data-driven decisions to minimize water wastage and improve irrigation efficiency. The AI-powered system ensures crops receive adequate hydration while conserving resources, ultimately leading to higher yields and sustainable farming. Farmers can also integrate weather forecasts to anticipate water needs and prevent over-irrigation, reducing soil erosion and preserving water quality.',
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-green-800" />,
      title: 'Disease Detection',
      description: 'Early disease identification through AI-driven image analysis for better control.',
      image: 'images/paddy-img6.jpg',
      longDescription: 'Our AI-based disease detection system identifies early signs of plant diseases using image recognition and provides actionable insights to prevent crop loss. By leveraging deep learning techniques, the system can classify diseases with high accuracy, allowing farmers to take preventive measures in time. This helps reduce dependency on harmful pesticides, lowers costs, and promotes healthier crop yields while maintaining environmental balance.',
    },
    {
      icon: <CloudRain className="w-10 h-10 text-green-800" />,
      title: 'Fertilizer Recommendations',
      description: 'Smart recommendations based on soil quality and crop needs.',
      image: 'images/paddy-img3.jpg',
      longDescription: 'Analyzing soil test data, our AI suggests optimal fertilizer combinations to enhance soil fertility and maximize crop yield while minimizing environmental impact. The recommendations are tailored to specific crop requirements, ensuring balanced nutrient distribution and preventing over-fertilization. This promotes sustainable agriculture practices, reduces soil degradation, and improves long-term farm productivity.',
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
              className="relative p-6 pb-16 rounded-xl shadow-sm transition-all text-center flex flex-col items-center"
              style={{ backgroundColor: '#CADBB7' }}
            >
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-16 h-16 flex items-center justify-center bg-white rounded-full shadow-md">
                {service.icon}
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>

              {/* Button positioned at bottom-left without overlapping text */}
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

      {selectedService && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-12 rounded-3xl shadow-3xl w-[90%] max-w-5xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-4xl font-bold text-green-800">{selectedService.title}</h3>
              <button onClick={() => setSelectedService(null)} className="hover:bg-gray-100 rounded-full p-3">
                <X className="w-8 h-8 text-gray-600 hover:text-gray-800" />
              </button>
            </div>

            <img 
              src={selectedService.image} 
              alt={selectedService.title} 
              className="w-full h-80 object-cover rounded-lg mb-6" 
            />

            <p className="text-gray-700 text-lg leading-relaxed">{selectedService.longDescription}</p>
          </div>
        </div>
      )}
    </section>
  );
}
