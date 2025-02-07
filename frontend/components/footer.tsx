import Link from 'next/link';
import { Facebook, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        
        <div className="border-t pt-8 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} AGRILAK. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}