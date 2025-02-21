import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="bg-[#001910] text-[#b4e088] border-t">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">

        
        <div className="flex flex-col sm:flex-row justify-between items-center">
          
          <div className="flex items-center space-x-4">
            <Image 
              src="/images/logo.svg" 
              alt="AgriLak" 
              width={30} 
              height={30} 
              className="w-20 h-20"
              priority
            />
            <span className="text-2xl font-bold text-[#558B2F]">AgriLak</span>
          </div>

          
          <div className="flex space-x-8 mt-6 sm:mt-0 sm:justify-end">
            <Link href="https://facebook.com" target="_blank" aria-label="Facebook">
              <Facebook className="w-8 h-8 hover:text-[#88c057] transition-transform transform hover:scale-110" />
            </Link>
            <Link href="https://twitter.com" target="_blank" aria-label="Twitter">
              <Twitter className="w-8 h-8 hover:text-[#88c057] transition-transform transform hover:scale-110" />
            </Link>
            <Link href="https://instagram.com" target="_blank" aria-label="Instagram">
              <Instagram className="w-8 h-8 hover:text-[#88c057] transition-transform transform hover:scale-110" />
            </Link>
            <Link href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
              <Linkedin className="w-8 h-8 hover:text-[#88c057] transition-transform transform hover:scale-110" />
            </Link>
          </div>
        </div>

      
        <div className="border-t border-[#88c057] mt-8 pt-4 text-center text-sm text-[#b4e088]">
          <p>&copy; {new Date().getFullYear()} AGRILAK. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
