import { useState } from "react"
import { Sprout, ShieldCheck, CloudRain, Droplet, X, ArrowUpRight } from "lucide-react"

export function Services() {
  const [selectedService, setSelectedService] = useState<{
    title: string
    description: string
    image: string
    icon: JSX.Element
    longDescription: string
  } | null>(null)

  const servicesList = [
    {
      icon: <Sprout className="w-10 h-10 text-green-800" />,
      title: "Yield Prediction",
      description: "AI-powered yield forecasting for better crop planning and decision-making.",
      image: "/images/paddy-img2.jpg",
      longDescription:
        "Lexi uses an AI-driven approach to personalize each user's learning journey, ensuring the content and exercises are tailored to their unique needs. This individualized support helps users overcome specific challenges they face.",
    },
    {
      icon: <Droplet className="w-10 h-10 text-green-800" />,
      title: "Irrigation Management",
      description: "Optimize water usage with real-time insights to prevent under or over-irrigation.",
      image: "/images/paddy-img4.jpg",
      longDescription:
        "Using real-time data analysis and machine learning algorithms, our system provides personalized irrigation schedules that optimize water usage while maintaining optimal crop health.",
    },
    {
      icon: <CloudRain className="w-10 h-10 text-green-800" />,
      title: "Fertilizer Recommendations",
      description: "Smart recommendations based on soil quality and crop needs.",
      image: "/images/paddy-img3.jpg",
      longDescription:
        "Using soil analysis and crop-specific data, our AI system generates tailored fertilizer recommendations to optimize nutrient delivery and maximize yield potential.",
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-green-800" />,
      title: "Disease Detection",
      description: "Early disease identification through AI-driven image analysis for better control.",
      image: "/images/paddy-img6.jpg",
      longDescription:
        "Our advanced AI algorithms analyze plant images in real-time to detect early signs of diseases, enabling proactive treatment and prevention strategies.",
    },
    
  ]

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
              className="relative p-6 pb-16 rounded-xl shadow-sm transition-all text-center flex flex-col items-center cursor-pointer hover:shadow-md"
              style={{ backgroundColor: "#CADBB7" }}
              onClick={() => setSelectedService(service)}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl w-[600px] overflow-hidden">
            <div className="relative">
              <img
                src={selectedService.image || "/placeholder.svg"}
                alt={selectedService.title}
                className="w-full h-[300px] object-cover"
              />
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 p-2 bg-white rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-[#CADBB7] rounded-full flex items-center justify-center">
                  {selectedService.icon}
                </div>
                <h3 className="text-2xl font-semibold">{selectedService.title}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">{selectedService.longDescription}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

