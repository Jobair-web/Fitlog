'use client';

import { useState } from 'react';
import { Workout } from '@/types/workout';
import PlannedCard from './PlannedCard';

export default function PlanTabs({
  todayPlan = [],
  savedWorkouts = [],
}: {
  todayPlan?: Workout[];
  savedWorkouts?: Workout[];
}) {
  const [activeTab, setActiveTab] = useState<'plan' | 'saved'>('plan');
  const [sortBy, setSortBy] = useState<string>('default');

  const currentList = activeTab === 'plan' ? todayPlan : savedWorkouts;

  // Sorting logic with correct TypeScript properties
  const sortedList = [...currentList].sort((a, b) => {
    if (sortBy === 'duration') {
      return (a.durationMinutes || 0) - (b.durationMinutes || 0);
    }
    if (sortBy === 'calories') {
      return (b.caloriesBurned || 0) - (a.caloriesBurned || 0);
    }
    if (sortBy === 'name') {
      return (a.title || '').localeCompare(b.title || '');
    }
    return 0;
  });

  return (
    <div className="space-y-6">
      {/* Tab Controls & Sorting */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-800 pb-4">
        {/* Tabs Switcher */}
        <div className="flex items-center gap-2 bg-[#111622] p-1 rounded-full border border-gray-800/80 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setActiveTab('plan')}
            className={`flex-1 sm:flex-none px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'plan'
                ? 'bg-[#CCFF00] text-black shadow-md shadow-lime-500/10'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Today's Plan ({todayPlan.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('saved')}
            className={`flex-1 sm:flex-none px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'saved'
                ? 'bg-[#CCFF00] text-black shadow-md shadow-lime-500/10'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Saved ({savedWorkouts.length})
          </button>
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <label htmlFor="sort" className="text-xs text-gray-400 font-medium">
            Sort By:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#111622] text-xs text-gray-300 border border-gray-800 rounded-xl px-3 py-2 focus:outline-none focus:border-lime-500 transition cursor-pointer"
          >
            <option value="default">Default</option>
            <option value="duration">Duration</option>
            <option value="calories">Calories</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>

      {/* Workout Cards List */}
      <div className="space-y-3">
        {sortedList.length > 0 ? (
          sortedList.map((workout) => (
            <PlannedCard
              key={workout.id}
              workout={workout}
              isSavedTab={activeTab === 'saved'}
            />
          ))
        ) : (
          <div className="text-center py-16 bg-[#111622]/40 rounded-2xl border border-dashed border-gray-800">
            <p className="text-gray-400 text-sm">
              {activeTab === 'plan'
                ? 'No workouts added to your daily plan yet.'
                : 'No saved workouts found.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}