export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type MuscleGroup = 'Chest' | 'Back' | 'Legs' | 'Shoulders' | 'Arms' | 'Core' | 'Full Body';

export interface Workout {
  id: string;
  title: string;
  category: MuscleGroup;
  difficulty: DifficultyLevel;
  durationMinutes: number;
  caloriesBurned: number;
  sets: number;
  reps: number;
  equipment: string;
  imageUrl: string;
  description: string;
  instructions: string[];
  isCompleted?: boolean;
}

export interface WorkoutContextType {
  todayPlan: Workout[];
  savedWorkouts: Workout[];
  addToPlan: (workout: Workout) => boolean;
  removeFromPlan: (workoutId: string) => void;
  toggleComplete: (workoutId: string) => void;
  toggleSaveWorkout: (workout: Workout) => void;
  isSaved: (workoutId: string) => boolean;
  isInPlan: (workoutId: string) => boolean;
}
export type SortOption = 'default' | 'duration-asc' | 'duration-desc' | 'calories-desc';