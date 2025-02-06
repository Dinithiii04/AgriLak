import { Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const benefits = [
  {
    title: "Increased Productivity",
    description: "Leverage real-time insights for well-informed decisions Tdata-driven analysis.",
  },
  {
    title: "Cost Efficiency",
    description: "Leverage real-time insights for well-informed decisions Tdata-driven analysis.",
  },
  {
    title: "Real Time Monitoring",
    description: "Leverage real-time insights for well-informed decisions Tdata-driven analysis.",
  },
  {
    title: "Real Time Data",
    description: "Leverage real-time insights for well-informed decisions Tdata-driven analysis.",
  },
]

export default function BenefitsSection() {
  return (
    <section className="container mx-auto py-16 bg-[#F8F9FF] px-20">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="text-4xl font-bold text-[#0A4B3C] mb-16">
          Benefits Gained from Using our{" "}
          <span className="inline-flex items-center px-4 py-1 bg-[#0A4B3C] text-[#C2FF4B] rounded-full">Agridev</span>{" "}
          Solutions.
        </h2>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Left Column - Stats */}
          <div className="space-y-12">
            <div>
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-5xl font-bold text-[#0A4B3C]">12M+</span>
                <div className="text-sm font-medium">
                  Happy Drone Seekers
                  <br />
                  All over the world.
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Founded by a team of passionate educators and tech enthusiasts, blends innovative technology.
              </p>
            </div>

            <div>
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-5xl font-bold text-[#0A4B3C]">08Y+</span>
                <div className="text-sm font-medium">
                  Years of experience with
                  <br />
                  top talents.
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Founded by a team of passionate educators and tech enthusiasts, blends innovative technology.
              </p>
            </div>
          </div>

          {/* Right Column - Benefits Grid */}
          <div className="relative">
            <div className="bg-[#E3F8D2] rounded-3xl p-6">
              <div className="grid grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="bg-white rounded-2xl p-6 hover:shadow-md transition-shadow">
                    <Clock className="w-6 h-6 text-[#0A4B3C] mb-4" />
                    <h3 className="font-medium text-[#0A4B3C] mb-2">{benefit.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* More Service Button */}
            <div className="absolute -bottom-6 right-6">
              <Button className="bg-[#C2FF4B] text-[#0A4B3C] hover:bg-[#B2EF3B] font-medium rounded-full px-6">
                More Service
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

