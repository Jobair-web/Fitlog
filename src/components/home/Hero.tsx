import Link from 'next/link';
import Image from 'next/image';
import bannerImg from '@/public/images/banner.png'; // Direct import from public folder

export default function Hero() {
  return (
    <div className="hero bg-base-200 min-h-[350px] sm:min-h-[400px] rounded-2xl my-4 sm:my-6 p-4 sm:p-8">
      <div className="hero-content flex-col lg:flex-row justify-between items-center w-full gap-8 lg:gap-12">
        
        {/* Left Content */}
        <div className="max-w-xl text-center lg:text-left flex flex-col items-center lg:items-start">
          <p className="text-xs sm:text-sm font-bold uppercase text-accent tracking-wider">
            WORKOUT LIBRARY
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-oswald uppercase py-2 leading-tight">
            Train With Intent. Log Every Set.
          </h1>
          <p className="py-2 sm:py-4 text-xs sm:text-sm opacity-80 max-w-md">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today's plan, and watch the week's work add up.
          </p>
          <Link
            href="#library"
            className="btn btn-primary font-bold uppercase mt-2 w-full sm:w-auto px-8"
          >
            Browse Workouts
          </Link>
        </div>

        {/* Right Image */}
        <div className="flex justify-center items-center w-full lg:w-auto">
          <Image
            src={bannerImg}
            alt="Workout Banner"
            className="w-48 sm:w-64 md:w-80 lg:max-w-sm object-contain h-auto"
            priority
          />
        </div>

      </div>
    </div>
  );
}