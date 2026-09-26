import Link from 'next/link';

export default function EmptyPlanState() {
  return (
    <div className="border border-dashed border-gray-800/80 rounded-3xl py-20 px-4 text-center bg-[#0D111A]/50 flex flex-col items-center justify-center space-y-3">
      <h3 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-white">
        NOTHING HERE YET
      </h3>
      <p className="text-xs sm:text-sm text-gray-400 max-w-sm">
        Browse the library and add a lift to get today moving.
      </p>
      <Link
        href="/"
        className="btn border-none bg-[#CCFF00] hover:bg-[#b8e600] text-black font-bold text-xs rounded-full px-6 py-2.5 mt-2 transition"
      >
        Go to workouts
      </Link>
    </div>
  );
}