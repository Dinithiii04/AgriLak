"use client";

import Link from 'next/link';
import { Menu, Search, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import Image from 'next/image';

export function Navbar() {
  return (
    <header className="w-full bg-white border-b-2 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto py-4 px-6 flex items-center justify-between">
        {/* Logo & Branding */}
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="/logo.svg" 
            alt="AgriLak" 
            width={40} 
            height={40}
            className="w-10 h-10"
            priority
          />
          <div>
            <span className="text-2xl font-bold text-green-800 block">AgriLak</span>
            <span className="text-sm text-gray-600">Smart Paddy Management</span>
          </div>
        </Link>

        {/* Navbar Actions */}
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
          <Button className="bg-green-800 hover:bg-green-900 rounded-full px-6 text-white">
            Dashboard
          </Button>
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden rounded-full" aria-label="Menu">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </nav>
    </header>
  );
}
