'use client';

import Link from 'next/link';
import { Workout } from '@/types/workout';
import { useWorkout } from '@/context/WorkoutContext';
import { Bookmark, Plus, Check } from 'lucide-react';
import toast from 'react-hot-toast';

export default function WorkoutCard({ workout }: { workout: Workout }) {
  const { addToPlan, isInPlan, toggleSaveWorkout, isSaved } = useWorkout();
  const added = isInPlan(workout.id);
  const saved = isSaved(workout.id);

  const handleAdd = () => {
    const success = addToPlan(workout);
    if (success) {
      toast.success(`${workout.title} added to plan!`);
    } else {
      toast.error('Limit reached! Max 5 lifts allowed per day.');
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition overflow-hidden">
      <figure className="relative h-48 w-full bg-base-300">
        {workout.imageUrl ? (
          <img 
            src={workout.imageUrl} 
            alt={workout.title} 
            className="w-full h-full object-cover" 
          />
        ) : (
          <div className="flex items-center justify-center h-full text-xs text-base-content/50">
            No Image
          </div>
        )}
        <button
          onClick={() => toggleSaveWorkout(workout)}
          className={`btn btn-circle btn-sm absolute top-3 right-3 ${
            saved ? 'btn-warning' : 'btn-ghost bg-base-100/60'
          }`}
        >
          <Bookmark className="w-4 h-4" />
        </button>
      </figure>
      <div className="card-body p-4">
        <div className="badge badge-secondary text-xs">{workout.category}</div>
        <h2 className="card-title text-lg">{workout.title}</h2>
        <p className="text-xs opacity-70">
          {workout.durationMinutes} mins • {workout.caloriesBurned} kcal
        </p>
        <div className="card-actions justify-between items-center mt-4">
          <Link href={`/workout/${workout.id}`} className="text-xs font-semibold link link-hover">
            View Details
          </Link>
          <button
            onClick={handleAdd}
            disabled={added}
            className={`btn btn-sm ${added ? 'btn-success' : 'btn-primary'}`}
          >
            {added ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {added ? 'Added' : 'Add to Plan'}
          </button>
        </div>
      </div>
    </div>
  );
}