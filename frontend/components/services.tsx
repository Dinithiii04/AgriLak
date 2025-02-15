import { Sprout,  ShieldCheck, CloudRain, ArrowUpRight, Droplet } from 'lucide-react';

export function Services() {
  const servicesList = [
    {
      icon: <Sprout className="w-10 h-10 text-green-800" />,
      title: 'Yield Prediction',
      description: 'AI-powered yield forecasting for better crop planning.',
    },
    {
      icon: <Droplet className="w-10 h-10 text-green-800" />,
      title: 'Irrigation Management',
      description: 'Optimize water usage with real-time irrigation insights.',
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-green-800" />,
      title: 'Disease Detection',
      description: 'Early disease identification through AI-driven analysis.',
    },
    {
      icon: <CloudRain className="w-10 h-10 text-green-800" />,
      title: 'Fertilizer Recommendations',
      description: 'Smart recommendations based on soil quality and crop needs.',
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

              {/* Bottom Left Arrow Button */}
              <div className="absolute bottom-4 left-4 w-10 h-10 flex items-center justify-center bg-gray-200  rounded-full transition-all">
                <ArrowUpRight className="w-5 h-5 text-green-800" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
