'use client';

import { useState } from 'react';
import { Workout, SortOption } from '@/types/workout';
import WorkoutCard from './WorkoutCard';
import SortDropdown from './SortDropdown';

export default function Library({ initialWorkouts }: { initialWorkouts: Workout[] }) {
  const [sortOption, setSortOption] = useState<SortOption>('default');

  const sortedWorkouts = [...initialWorkouts].sort((a, b) => {
    if (sortOption === 'duration-asc') return a.durationMinutes - b.durationMinutes;
    if (sortOption === 'duration-desc') return b.durationMinutes - a.durationMinutes;
    if (sortOption === 'calories-desc') return b.caloriesBurned - a.caloriesBurned;
    return 0;
  });

  return (
    <div>
      {/* Header Container */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        {/* Left Side: Heading & Subtitle */}
        <div>
          <h2 className="text-2xl font-bold font-oswald uppercase tracking-wide">
            the Library
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* Right Side: Sort Dropdown */}
        <div className="self-end sm:self-auto">
          <SortDropdown currentSort={sortOption} onSortChange={setSortOption} />
        </div>
      </div>

      {/* Grid Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedWorkouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </div>
  );
}