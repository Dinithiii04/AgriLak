import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import ServicesSection from "./components/services-section"
import FAQSection from "./components/faq-section"
import SiteFooter from "./components/site-footer"
import BenefitsSection from "./components/benefits-section"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A4B3C]">
      {/* Navigation */}
      <nav className="container mx-auto flex items-center justify-between py-4 px-20 ">
        <div className="flex items-center gap-2">
          <span className="text-[#9FD33D] font-bold text-2xl">Agridev</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="text-white hover:text-[#9FD33D]">
          <Button variant="ghost" className="text-white bg-[#9FD33D] hover:text-[#9FD33D]">
            Get Started
          </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto pt-12 relative px-20">
        <div className="relative z-10">
          <span className="text-[#C2FF4B] text-sm font-medium tracking-wide">Agrilab solutions</span>
          <div className="max-w-3xl mt-4">
            <h1 className="text-[3.5rem] font-bold text-white leading-tight tracking-tight">
              Revolutionizing Agriculture with Agricultural Drones:{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-[#C2FF4B] font-display">Technology</span>
                <span className="absolute inset-0 bg-[#C2FF4B]/20 blur-xl -z-0 scale-150"></span>
              </span>
            </h1>
            <p className="text-gray-300 mt-6 text-lg leading-relaxed">
              Our planet&apos;s population is growing rapidly — so is the need for more food.
              <br />
              Already, 800 million people go to bed hungry each night.
            </p>
          </div>

          {/* Custom shaped button */}
          <div className="mt-8 relative">
            <div className="absolute inset-0 bg-[#C2FF4B] rounded-l-[2rem] skew-x-12 -translate-x-4"></div>
            <button className="relative px-8 py-3 text-[#0A4B3C] font-medium rounded-l-[2rem] bg-[#C2FF4B] hover:bg-[#9FD33D] transition-colors flex items-center gap-2 group">
              Start Free Trial
              <div className="w-8 h-8 rounded-full bg-[#0A4B3C] flex items-center justify-center">
                <ArrowRight className="h-4 w-4 text-[#C2FF4B] group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="mt-8 relative">
          <div className="relative w-full h-[400px] rounded-[2rem] overflow-hidden">
            <Image
              src="/placeholder.svg?height=400&width=1200"
              alt="Agricultural Drone"
              fill
              className="object-cover"
            />
          </div>

          {/* Navigation arrows */}
          <div className="absolute bottom-6 right-6 flex gap-2">
            <button className="w-12 h-12 rounded-full bg-[#C2FF4B] hover:bg-[#9FD33D] transition-colors flex items-center justify-center">
              <ArrowRight className="h-5 w-5 text-[#0A4B3C] rotate-180" />
            </button>
            <button className="w-12 h-12 rounded-full bg-[#0A4B3C] hover:bg-[#0A4B3C]/80 transition-colors flex items-center justify-center">
              <ArrowRight className="h-5 w-5 text-[#C2FF4B]" />
            </button>
          </div>
        </div>

        {/* Circular badge */}
        <div className="absolute top-4 right-4 w-28 h-28 rounded-full bg-[#0A4B3C]/90 border-2 border-[#1A5B4C] flex items-center justify-center backdrop-blur-sm">
          <div className="text-center rotate-[30deg]">
            <div className="text-[#C2FF4B] text-xs font-medium">Best Drone</div>
            <div className="text-[#C2FF4B] text-xs font-medium">Agriculture</div>
            <div className="text-[#C2FF4B] text-xs font-medium">Platform</div>
          </div>
        </div>

        {/* Companies section */}
        <div className="mt-12 text-center border-t border-[#1A5B4C] pt-8">
          <p className="text-gray-300 text-sm">
            Connecting the world&apos;s <span className="text-[#C2FF4B]">Greatest Companies</span> to their Customers
          </p>
          <div className="mt-6 flex justify-between items-center opacity-50">
            {["LocalPoint", "Polymath", "Lightbox", "Alt+Shift", "Nietzsche", "Acme Corp", "Sphere"].map((company) => (
              <span key={company} className="text-white text-sm">
                {company}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto py-16 px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#0A4B3C] p-6 rounded-lg border border-[#1A5B4C]">
            <h3 className="text-xl font-bold text-white mb-4">Perfect Power Handling from the Battery</h3>
            <Image
              src="/placeholder.svg?height=200&width=300"
              alt="Battery Power"
              width={300}
              height={200}
              className="rounded-lg"
            />
          </div>
          <div className="bg-[#0A4B3C] p-6 rounded-lg border border-[#1A5B4C]">
            <h3 className="text-xl font-bold text-white mb-4">The transformation to Smart & Agriculture Explained</h3>
            <Image
              src="/placeholder.svg?height=200&width=300"
              alt="Smart Agriculture"
              width={300}
              height={200}
              className="rounded-lg"
            />
          </div>
          <div className="bg-[#0A4B3C] p-6 rounded-lg border border-[#1A5B4C]">
            <h3 className="text-xl font-bold text-white mb-4">15 Reasons a Student lead System Matters</h3>
            <Image
              src="/placeholder.svg?height=200&width=300"
              alt="Student System"
              width={300}
              height={200}
              className="rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Platform Section */}
      <section className="container mx-auto py-16 px-20">
        <h2 className="text-3xl font-bold text-white mb-8">
          One Platform to Make <span className="bg-[#9FD33D] px-2 py-1 rounded">Agriculture</span> Resilient
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="relative h-[300px]">
            <Image
              src="/placeholder.svg?height=300&width=500"
              alt="Agricultural Platform"
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">Baseline & Identify the Drivers of your Scope 3 Emissions</h3>
            <p className="text-gray-300">
              Understand your complete emissions profile – and all the ways your organization can take action to reduce
              emissions and costs over time.
            </p>
            <Button className="bg-[#9FD33D] hover:bg-[#8BC34A] text-white">Learn More</Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <BenefitsSection />

      {/* Testimonials */}
      <section className="container mx-auto py-16 px-20">
        <h2 className="text-3xl font-bold text-white text-center mb-12">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-[#0A4B3C] p-6 rounded-lg border border-[#1A5B4C]">
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src="/placeholder.svg?height=40&width=40"
                  alt={`Customer ${i}`}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <h4 className="text-white font-bold">Customer Name</h4>
                  <p className="text-gray-300 text-sm">Position</p>
                </div>
              </div>
              <p className="text-gray-300">
                &quot;The intuitive interface and powerful features made the product easy to implement across our
                organization.&quot;
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer */}
      <SiteFooter />
    </div>
  )
}

