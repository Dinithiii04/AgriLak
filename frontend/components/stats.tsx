import { useState } from "react";
import { CheckCircle, ArrowUpRight, X } from "lucide-react";

export function Stats() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const stats = [
    { value: "30%", label: "Increase in Paddy Yield Using AI" },
    { value: "40%", label: "Reduction in Water Usage via Smart Irrigation" },
    { value: "95%", label: "Accuracy in Disease Detection" },
    { value: "60%", label: "Optimized Fertilizer Efficiency" },
  ];

  return (
    <section className="bg-green-800 py-12 relative">
      <div className="max-w-7xl mx-left px-2 sm:px-4 lg:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-2">
                <CheckCircle className="w-5 h-5 text-orange-400" />
              </div>
              <div className="text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-lg text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Badge on the Right */}
      <div className="absolute right-10 top-1/2 transform -translate-y-1/2 bg-white border border-green-800 rounded-bl-full rounded-br-full w-44 h-52 flex flex-col items-center justify-center shadow-lg">
        <div className="text-4xl font-bold text-green-800">10+</div>
        <div className="text-sm text-green-600 text-center">Years of Research in Smart Agriculture</div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-3 w-9 h-9 flex items-center justify-center bg-green-800 rounded-full text-white"
          aria-label="View research details"
        >
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 z-10"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="w-full">
              <div className="bg-green-800 p-6 text-center">
                <h1 className="text-white text-5xl font-light">Research</h1>
              </div>

              <div className="p-4 space-y-6">
                {["PADDY YIELD", "WATER USAGE", "DISEASE DETECTION", "FERTILIZER EFFICIENCY"].map((title, index) => (
                  <div key={index} className="w-full">
                    <div className="bg-green-400 p-4">
                      <h2 className="text-black text-2xl font-bold">{title}</h2>
                    </div>
                    <div className="bg-gray-200 p-6">
                      <p className="text-gray-800 mb-4">Research details about {title.toLowerCase()}.</p>
                      <p className="text-gray-800 font-bold">ADD LINKS:</p>
                      <p className="text-gray-800">Example/Link/Here</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
