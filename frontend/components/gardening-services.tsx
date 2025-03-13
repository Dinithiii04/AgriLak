import Image from "next/image";

export function ContactForm() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
        
        {/* Left: Image */}
        <div className="lg:w-1/2 relative">
          <div className="relative w-full h-[500px]">
            <Image
              src="/images/hero.png"
              alt="Smart Paddy Farming"
              layout="fill"
              className="object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="lg:w-1/2 bg-white p-8 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Get in touch!</h2>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Your Name:</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none" 
                placeholder="Name" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Your Email:</label>
              <input 
                type="email" 
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none" 
                placeholder="Email" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Your Question:</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none" 
                placeholder="Subject" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Your Comment:</label>
              <textarea 
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none" 
                placeholder="Message"
              ></textarea>
            </div>

            <button type="submit" className="w-full bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600 transition">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
