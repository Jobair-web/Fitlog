'use client';

import { use, useEffect, useState } from 'react';
import { getWorkoutById } from '@/services/api';
import { Workout } from '@/types/workout';
import { useWorkout } from '@/context/WorkoutContext';
import { Bookmark, Check, Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function WorkoutDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);

  const { addToPlan, isInPlan, toggleSaveWorkout, isSaved } = useWorkout();

  useEffect(() => {
    async function fetchData() {
      const data = await getWorkoutById(id);
      setWorkout(data);
      setLoading(false);
    }
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center text-white">
        <span className="loading loading-spinner loading-lg text-lime-400"></span>
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex flex-col items-center justify-center text-white">
        <h2 className="text-2xl font-bold mb-4">Workout Not Found</h2>
        <Link href="/" className="btn btn-outline text-white">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>
      </div>
    );
  }

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
    <div className="min-h-screen bg-[#0B0F17] text-gray-200 py-10 px-4 sm:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Library
        </Link>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Big Image */}
          <div className="lg:col-span-5 rounded-3xl overflow-hidden bg-[#161B26] border border-gray-800 shadow-2xl">
            {workout.imageUrl ? (
              <img
                src={workout.imageUrl}
                alt={workout.title}
                className="w-full h-[320px] sm:h-[450px] lg:h-[550px] object-cover"
              />
            ) : (
              <div className="w-full h-[320px] sm:h-[450px] flex items-center justify-center text-gray-500">
                No Image Available
              </div>
            )}
          </div>

          {/* Right Column: Workout Details */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              {/* Title */}
              <h1 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-wide text-white mb-3">
                {workout.title}
              </h1>

              {/* Description */}
              <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                {workout.description || 'A targeted workout routine designed to build strength and endurance.'}
              </p>

              {/* Muscle Category Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#212836] text-lime-400 border border-lime-500/20">
                  {workout.category}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#212836] text-lime-400 border border-lime-500/20">
                  Full Body
                </span>
              </div>

              {/* Stats Table Card */}
              <div className="bg-[#121721] border border-gray-800/80 rounded-2xl p-4 sm:p-5 space-y-3 shadow-inner">
                <div className="flex justify-between items-center text-xs sm:text-sm py-1 border-b border-gray-800/50">
                  <span className="uppercase text-gray-400 font-medium">EQUIPMENT</span>
                  <span className="font-semibold text-gray-200">{workout.equipment || 'Barbell, Bench'}</span>
                </div>

                <div className="flex justify-between items-center text-xs sm:text-sm py-1 border-b border-gray-800/50">
                  <span className="uppercase text-gray-400 font-medium">DIFFICULTY</span>
                  <span className="font-semibold text-gray-200">{workout.difficulty}</span>
                </div>

                <div className="flex justify-between items-center text-xs sm:text-sm py-1 border-b border-gray-800/50">
                  <span className="uppercase text-gray-400 font-medium">SETS</span>
                  <span className="font-semibold text-gray-200">{workout.sets || 4}</span>
                </div>

                <div className="flex justify-between items-center text-xs sm:text-sm py-1 border-b border-gray-800/50">
                  <span className="uppercase text-gray-400 font-medium">REPS</span>
                  <span className="font-semibold text-gray-200">{workout.reps || '6-8'}</span>
                </div>

                <div className="flex justify-between items-center text-xs sm:text-sm py-1 border-b border-gray-800/50">
                  <span className="uppercase text-gray-400 font-medium">DURATION</span>
                  <span className="font-semibold text-gray-200">{workout.durationMinutes} min</span>
                </div>

                <div className="flex justify-between items-center text-xs sm:text-sm py-1 border-b border-gray-800/50">
                  <span className="uppercase text-gray-400 font-medium">CALORIES</span>
                  <span className="font-semibold text-gray-200">{workout.caloriesBurned} kcal</span>
                </div>

                <div className="flex justify-between items-center text-xs sm:text-sm py-1">
                  <span className="uppercase text-gray-400 font-medium">RATING</span>
                  <span className="font-semibold text-gray-200">4.8</span>
                </div>
              </div>

              {/* Instructions Section */}
              <div className="mt-8">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
                  INSTRUCTIONS
                </h3>
                {workout.instructions && workout.instructions.length > 0 ? (
                  <ol className="space-y-3 text-sm text-gray-300">
                    {workout.instructions.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2 leading-relaxed">
                        <span className="font-semibold text-gray-400">{idx + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <ol className="space-y-3 text-sm text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="font-semibold text-gray-400">1.</span>
                      <span>Lie on the bench with eyes under the bar and feet planted.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-semibold text-gray-400">2.</span>
                      <span>Unrack with locked elbows and lower the bar to mid-chest.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-semibold text-gray-400">3.</span>
                      <span>Press up in a slight arc until elbows lock without bouncing.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-semibold text-gray-400">4.</span>
                      <span>Keep shoulder blades pinched and a natural arch in the back.</span>
                    </li>
                  </ol>
                )}
              </div>
            </div>

            {/* Optimized Responsive Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-6 w-full">
              <button
                onClick={handleAdd}
                disabled={added}
                className={`flex-1 flex items-center justify-center gap-2 font-bold text-xs sm:text-sm rounded-2xl py-3.5 px-4 transition-all duration-200 ${
                  added 
                    ? 'bg-emerald-500 text-white cursor-default' 
                    : 'bg-[#CCFF00] hover:bg-[#b8e600] text-black shadow-md shadow-lime-500/10 active:scale-[0.98]'
                }`}
              >
                {added ? <Check className="w-4 h-4 flex-shrink-0" /> : <Calendar className="w-4 h-4 flex-shrink-0" />}
                <span className="truncate">
                  {added ? "Added to today's plan" : "Add to today's plan"}
                </span>
              </button>

              <button
                onClick={() => toggleSaveWorkout(workout)}
                className={`flex-1 flex items-center justify-center gap-2 border font-semibold text-xs sm:text-sm rounded-2xl py-3.5 px-4 transition-all duration-200 active:scale-[0.98] ${
                  saved
                    ? 'bg-[#1A2130] text-lime-400 border-lime-400/50'
                    : 'bg-[#161B26] text-gray-200 border-gray-700/80 hover:bg-gray-800'
                }`}
              >
                <Bookmark className={`w-4 h-4 flex-shrink-0 ${saved ? 'fill-lime-400 text-lime-400' : ''}`} />
                <span className="truncate">
                  {saved ? 'Saved' : 'Save for later'}
                </span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}