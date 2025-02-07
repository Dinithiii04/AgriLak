import Image from 'next/image';
import { Button } from './ui/button';

export function Hero() {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center py-16 lg:py-24">
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
              <Button variant="outline" className="border-green-800 text-green-800 rounded-full">
                Learn More
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2 mt-12 lg:mt-0 relative px-4">
            <div className="relative">
              <Image
                src="https://gadden-react.vercel.app/assets/images/hero/hero-three_one.jpg"
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
    </div>
  );
}
