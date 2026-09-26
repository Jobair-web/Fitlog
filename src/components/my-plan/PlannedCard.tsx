'use client';

import Link from 'next/link';
import { Workout } from '@/types/workout';
import { useWorkout } from '@/context/WorkoutContext';
import { Clock, Flame, Star, X, Check } from 'lucide-react';
import toast from 'react-hot-toast';

export default function PlannedCard({ 
  workout, 
  isSavedTab = false 
}: { 
  workout: Workout; 
  isSavedTab?: boolean; 
}) {
  const { removeFromPlan, toggleSaveWorkout, toggleComplete } = useWorkout();

  const isDone = workout.isCompleted;

  // Handle Remove (X) button with toast notification
  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isSavedTab) {
      toggleSaveWorkout(workout);
      toast.success(`${workout.title} removed from saved list!`);
    } else {
      removeFromPlan(workout.id);
      toast.success(`${workout.title} removed from your plan!`);
    }
  };

  // Handle Mark as Done toggle with toast notification
  const handleToggleComplete = () => {
    toggleComplete(workout.id);
    if (!isDone) {
      toast.success(`Great job! Marked "${workout.title}" as completed.`);
    } else {
      toast.error(`Marked "${workout.title}" as incomplete.`);
    }
  };

  return (
    <div className="relative bg-[#111622] border border-gray-800/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {/* Absolute Top-Right Delete Button for Small Mobile Screens */}
      <button
        onClick={handleRemove}
        type="button"
        className="absolute top-3 right-3 sm:hidden text-gray-500 hover:text-red-400 p-1 rounded-lg transition z-20 cursor-pointer"
        title="Remove"
      >
        <X className="w-5 h-5 pointer-events-none" />
      </button>

      {/* Left: Thumbnail & Info */}
      <div className="flex items-start sm:items-center gap-3 sm:gap-4 pr-6 sm:pr-0">
        <img
          src={workout.imageUrl || '/images/placeholder.png'}
          alt={workout.title}
          className="w-20 h-16 sm:w-24 sm:h-16 object-cover rounded-xl flex-shrink-0"
        />
        <div>
          <h3 className={`text-sm sm:text-lg font-black uppercase tracking-wide transition ${
            isDone && !isSavedTab ? 'line-through text-gray-500' : 'text-white'
          }`}>
            {workout.title}
          </h3>
          <p className="text-xs text-gray-400 mb-1.5">{workout.equipment || workout.category}</p>
          
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs text-gray-300 font-medium">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-lime-400" /> {workout.durationMinutes} min
            </span>
            <span className="flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-lime-400" /> {workout.caloriesBurned} kcal
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-lime-400 fill-lime-400" /> 4.7
            </span>
          </div>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center justify-between sm:justify-end gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-800/60">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* View Details Button */}
          <Link
            href={`/workout/${workout.id}`}
            className="flex-1 sm:flex-none bg-[#1A2130] hover:bg-[#252E42] text-xs font-medium text-[#E2E8F0] border border-gray-700/50 hover:border-gray-600 rounded-full px-4 py-2.5 transition text-center whitespace-nowrap"
          >
            View Details
          </Link>

          {/* Mark as Done Button */}
          {!isSavedTab && (
            <button
              onClick={handleToggleComplete}
              className={`flex-1 sm:flex-none text-xs font-bold rounded-full px-3 py-2.5 min-h-[38px] border-none flex items-center justify-center gap-1.5 whitespace-nowrap transition-all duration-200 active:scale-95 ${
                isDone
                  ? 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  : 'bg-[#CCFF00] hover:bg-[#b8e600] text-black shadow-md shadow-lime-500/10'
              }`}
            >
              <Check className="w-3.5 h-3.5 stroke-[3] flex-shrink-0" />
              <span className="truncate">{isDone ? 'Completed' : 'Mark as Done'}</span>
            </button>
          )}
        </div>

        {/* Desktop Delete Button */}
        <button
          onClick={handleRemove}
          type="button"
          className="hidden sm:block text-gray-500 hover:text-red-400 p-1.5 rounded-lg transition ml-1 cursor-pointer z-20"
          title="Remove"
        >
          <X className="w-4 h-4 pointer-events-none" />
        </button>
      </div>
    </div>
  );
}