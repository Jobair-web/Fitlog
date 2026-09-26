import { Workout } from '@/types/workout';

export default function SpecsTable({ workout }: { workout: Workout }) {
  return (
    <div className="bg-base-200 p-6 rounded-xl shadow-md space-y-3">
      <div className="flex justify-between border-b pb-2">
        <span className="font-semibold">Category:</span>
        <span>{workout.category}</span>
      </div>
      <div className="flex justify-between border-b pb-2">
        <span className="font-semibold">Difficulty:</span>
        <span className="badge badge-accent">{workout.difficulty}</span>
      </div>
      <div className="flex justify-between border-b pb-2">
        <span className="font-semibold">Equipment:</span>
        <span>{workout.equipment}</span>
      </div>
      <div className="flex justify-between border-b pb-2">
        <span className="font-semibold">Target Sets x Reps:</span>
        <span>{workout.sets} x {workout.reps}</span>
      </div>
      <div className="flex justify-between border-b pb-2">
        <span className="font-semibold">Est. Duration:</span>
        <span>{workout.durationMinutes} Mins</span>
      </div>
      <div className="flex justify-between">
        <span className="font-semibold">Est. Calories:</span>
        <span>{workout.caloriesBurned} kcal</span>
      </div>
    </div>
  );
}