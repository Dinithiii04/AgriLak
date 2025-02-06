import Image from "next/image"

export default function ServicesSection() {
  return (
    <section className="container mx-auto py-16 bg-[#F8F9FF] px-20">
      {/* About Section */}
      <div className="relative mb-16">
        {/* About Tag */}
        <span className="inline-block px-4 py-1 bg-[#C2FF4B] rounded-full text-sm font-medium mb-4">About Us</span>

        {/* Main Text */}
        <div className="max-w-2xl">
          <h2 className="text-2xl font-medium leading-relaxed text-[#0A4B3C]">
            We are passionate about empowering learners{" "}
            <span className="inline-flex items-center gap-2">🌍 Worldwide</span> with high-quality, accessible &
            engaging education. Our mission offering a diverse range of courses.
          </h2>
        </div>

        {/* Tilted Image */}
        <div className="absolute -top-4 right-0 w-72 h-48 rotate-6">
          <div className="relative w-full h-full rounded-2xl overflow-hidden">
            <Image src="/placeholder.svg?height=192&width=288" alt="Farmer with drone" fill className="object-cover" />
          </div>
        </div>
      </div>

      {/* Services Cards */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left Card */}
        <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
          <span className="inline-block px-4 py-1 bg-[#C2FF4B] rounded-full text-sm font-medium mb-4">GROW</span>
          <h3 className="text-xl font-medium text-[#0A4B3C] mt-auto">Poultry Power Hatching hope for farmers</h3>
        </div>

        {/* Middle Card */}
        <div className="bg-[#0A4B3C] rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow group cursor-pointer relative overflow-hidden">
          <div className="relative z-10">
            <span className="inline-block px-4 py-1 bg-[#C2FF4B] rounded-full text-sm font-medium mb-4">More</span>
            <h3 className="text-xl font-medium text-white mt-auto">Recarbonization in food & Agriculture, Explained</h3>
            <p className="text-gray-300 mt-2 text-sm">
              Our planet&apos;s population is growing rapidly Already, hungry each night.
            </p>
          </div>
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-repeat opacity-20"></div>
          </div>
        </div>

        {/* Right Card */}
        <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
          <span className="inline-block px-4 py-1 bg-[#C2FF4B] rounded-full text-sm font-medium mb-4">Nourles</span>
          <h3 className="text-xl font-medium text-[#0A4B3C] mt-auto">15 Reasons a Resilient food System Matters.</h3>
        </div>
      </div>
    </section>
  )
}

