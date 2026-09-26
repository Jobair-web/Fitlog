'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useWorkout } from '@/context/WorkoutContext';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const { todayPlan, savedWorkouts } = useWorkout();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  // Active route styling helpers
  const isActive = (path: string) => pathname === path;

  const activeClass = "bg-[#1c240d] text-[#ccff00] px-5 py-2 rounded-full font-medium text-sm transition-all";
  const inactiveClass = "text-gray-400 hover:text-white px-5 py-2 text-sm font-medium transition-colors";

  return (
    <nav className="bg-[#0b0c0e] text-white border-b border-gray-800 sticky top-0 z-50 py-3">
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
        
        {/* Left: Logo Image & Text */}
        <Link href="/" className="flex items-center gap-2 font-black text-xl tracking-wider">
          <Image 
            src="/images/logo.png" 
            alt="FitLog Logo" 
            width={28} 
            height={28} 
            className="object-contain"
          />
          <span className="font-oswald uppercase tracking-widest text-xl sm:text-2xl">FITLOG</span>
        </Link>

        {/* Center: Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-2 bg-[#111622] p-1 rounded-full border border-gray-800/80">
          <Link 
            href="/" 
            className={isActive('/') ? activeClass : inactiveClass}
          >
            Workouts
          </Link>
          <Link 
            href="/my-plan" 
            className={isActive('/my-plan') ? activeClass : inactiveClass}
          >
            My Plan
          </Link>
        </div>

        {/* Right: Plan & Saved Counters */}
        <div className="flex items-center gap-3 sm:gap-6">
          <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-gray-300">
            <span>Plan</span>
            <span className="bg-[#ccff00] text-black w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center font-bold text-xs">
              {todayPlan?.length || 0}
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-gray-400">
            <span>Saved</span>
            <span className="border border-gray-700 text-gray-300 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs">
              {savedWorkouts?.length || 0}
            </span>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu} 
            className="md:hidden p-1.5 text-gray-400 hover:text-white focus:outline-none ml-1"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown Drawer */}
      {isOpen && (
        <div className="md:hidden bg-[#0d1017] border-b border-gray-800 px-6 py-4 space-y-3 transition-all">
          <Link 
            href="/" 
            onClick={() => setIsOpen(false)}
            className={`block w-full text-center rounded-xl py-2.5 font-medium text-sm transition-all ${
              isActive('/') ? 'bg-[#1c240d] text-[#ccff00]' : 'text-gray-300 hover:text-white'
            }`}
          >
            Workouts
          </Link>
          <Link 
            href="/my-plan" 
            onClick={() => setIsOpen(false)}
            className={`block w-full text-center rounded-xl py-2.5 font-medium text-sm transition-all ${
              isActive('/my-plan') ? 'bg-[#1c240d] text-[#ccff00]' : 'text-gray-300 hover:text-white'
            }`}
          >
            My Plan
          </Link>
        </div>
      )}
    </nav>
  );
}