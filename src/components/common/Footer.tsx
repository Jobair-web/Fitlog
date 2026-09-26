import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#0b0c0e] text-gray-400 py-6 border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="FitLog Logo"
            width={24}
            height={24}
            className="object-contain"
          />
          <span className="font-oswald uppercase tracking-widest text-lg sm:text-xl font-bold text-white">
            FITLOG
          </span>
        </div>

        {/* Right: Copyright text */}
        <p className="text-xs sm:text-sm text-gray-400">
          © {new Date().getFullYear()} FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
}