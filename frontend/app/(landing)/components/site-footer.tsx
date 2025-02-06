import Link from "next/link"
import { Facebook, Twitter, Linkedin, MapPin, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SiteFooter() {
  return (
    <footer className="bg-[#0A4B3C] text-white py-16">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 px-20">
        {/* Left Column */}
        <div className="md:col-span-4">
          <Link href="/" className="text-[#C2FF4B] text-3xl font-semibold">
            Agridev
          </Link>
          <p className="mt-6 text-gray-300 leading-relaxed">
            Plumer is an electrician company that specializes in providing high-quality electrical services.
          </p>
          <div className="flex gap-4 mt-6">
            <Link
              href="#"
              className="w-10 h-10 rounded-full bg-[#1A5B4C] flex items-center justify-center hover:bg-[#C2FF4B] hover:text-[#0A4B3C] transition-colors"
            >
              <Facebook className="w-5 h-5" />
            </Link>
            <Link
              href="#"
              className="w-10 h-10 rounded-full bg-[#1A5B4C] flex items-center justify-center hover:bg-[#C2FF4B] hover:text-[#0A4B3C] transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </Link>
            <Link
              href="#"
              className="w-10 h-10 rounded-full bg-[#1A5B4C] flex items-center justify-center hover:bg-[#C2FF4B] hover:text-[#0A4B3C] transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Middle Column - Links */}
        <div className="md:col-span-2">
          <h3 className="text-sm font-medium mb-4">LINKS</h3>
          <ul className="space-y-3">
            <li>
              <Link href="#" className="text-gray-300 hover:text-[#C2FF4B]">
                About
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-300 hover:text-[#C2FF4B]">
                Services
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-300 hover:text-[#C2FF4B]">
                Blog
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-300 hover:text-[#C2FF4B]">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Middle Column - Info */}
        <div className="md:col-span-3">
          <h3 className="text-sm font-medium mb-4">INFO</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-gray-300">
              <MapPin className="w-5 h-5 shrink-0 mt-1" />
              <span>455 West Orchard Street Kings Mountain, NC 28086</span>
            </li>
            <li className="flex items-center gap-3 text-gray-300">
              <Phone className="w-5 h-5 shrink-0" />
              <span>+1 (123) 985 789</span>
            </li>
            <li className="flex items-center gap-3 text-gray-300">
              <Mail className="w-5 h-5 shrink-0" />
              <span>help@agridev.com</span>
            </li>
          </ul>
        </div>

        {/* Right Column */}
        <div className="md:col-span-3">
          <h3 className="text-sm font-medium mb-4">NEWSLETTER</h3>
          <p className="text-gray-300 mb-4">Sign up to get updates & news.</p>
          <div className="space-y-3">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-2 bg-[#1A5B4C] rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C2FF4B]"
            />
            <Button className="w-full bg-[#C2FF4B] text-[#0A4B3C] hover:bg-[#9FD33D] font-medium">SUBSCRIBE NOW</Button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container mx-auto mt-16 pt-8 border-t border-[#1A5B4C] px-20">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-300 text-sm">© 2023 All Right Reserved by FramerBite</p>
          <div className="flex gap-6">
            <Link href="#" className="text-gray-300 hover:text-[#C2FF4B] text-sm">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-300 hover:text-[#C2FF4B] text-sm">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

