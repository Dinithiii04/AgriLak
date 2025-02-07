import { CheckCircle, ArrowUpRight } from 'lucide-react';

export function Stats() {
  const stats = [
    { value: '30%', label: 'Increase in Paddy Yield Using AI' },
    { value: '40%', label: 'Reduction in Water Usage via Smart Irrigation' },
    { value: '95%', label: 'Accuracy in Disease Detection' },
    { value: '60%', label: 'Optimized Fertilizer Efficiency' },
  ];

  return (
    <section className="bg-green-800 py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-3">
                <CheckCircle className="w-6 h-6 text-orange-400" />
              </div>
              <div className="text-4xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Badge on the Right */}
      <div className="absolute right-10 top-1/2 transform -translate-y-1/2 bg-white border border-green-800 rounded-bl-full rounded-br-full w-48 h-56 flex flex-col items-center justify-center shadow-lg">
        <div className="text-5xl font-bold text-green-800">10+</div>
        <div className="text-md text-green-600 text-center">Years of Research in Smart Agriculture</div>
        <div className="mt-4 w-10 h-10 flex items-center justify-center bg-green-800 rounded-full text-white">
          <ArrowUpRight className="w-5 h-5" />
        </div>
      </div>
    </section>
  );
}
