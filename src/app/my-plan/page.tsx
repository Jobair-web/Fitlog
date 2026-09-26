'use client';

import { useWorkout } from '@/context/WorkoutContext';
import MetricsSummary from '@/components/my-plan/MetricsSummary';
import PlanTabs from '@/components/my-plan/PlanTabs';

export default function MyPlanPage() {
  const { todayPlan } = useWorkout();

  // Calculate totals from todayPlan
  const totalExercises = todayPlan.length;
  const totalMinutes = todayPlan.reduce((acc, item) => acc + (item.durationMinutes || 0), 0);
  const totalCalories = todayPlan.reduce((acc, item) => acc + (item.caloriesBurned || 0), 0);

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-6">
      {/* Title & Subtitle Section */}
      <div>
        <h1 className="text-3xl font-black font-oswald uppercase text-white tracking-wide">
          MY PLAN
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Metrics Summary */}
      <MetricsSummary 
        exercises={totalExercises} 
        minutes={totalMinutes} 
        calories={totalCalories} 
      />

      {/* Tabs & Content */}
      <PlanTabs />
    </div>
  );
}