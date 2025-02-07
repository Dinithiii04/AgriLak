import Image from 'next/image';
import { Check } from 'lucide-react';

export function AboutGardening() {
  const features = [
    'Gardening',
    'Landscape',
    'Maintenance',
    'Brush & Programs',
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <Image
                src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae"
                alt="Gardening"
                width={300}
                height={400}
                className="rounded-lg"
              />
              <Image
                src="https://images.unsplash.com/photo-1599685315640-9ceab2f58944"
                alt="Landscaping"
                width={300}
                height={400}
                className="rounded-lg mt-8"
              />
            </div>
            <div className="absolute -left-8 -bottom-8 w-64 h-64 bg-green-100 rounded-full -z-10" />
          </div>
          
          <div>
            <h2 className="text-3xl font-bold text-green-800 mb-6">
              Perfect Gardening The Result Of Nature
            </h2>
            <p className="text-gray-600 mb-8">
              We provide professional gardening services with attention to detail and sustainable practices. Our expert team ensures your garden thrives throughout the year.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check className="text-green-800 w-5 h-5" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}