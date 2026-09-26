import { Workout } from '@/types/workout';

const BASE_URL = 'https://api.abcz.workers.dev/api/fitlog';

// API Response Mapping Helper Function
function mapWorkoutData(data: any): Workout {
  return {
    id: String(data.id || ''),
    title: data.title || data.name || 'Untitled Workout',
    category: data.category || 'Full Body',
    difficulty: data.difficulty || 'Beginner',
    durationMinutes: Number(data.durationMinutes || data.duration || 0),
    caloriesBurned: Number(data.caloriesBurned || data.calories || 0),
    sets: Number(data.sets || 0),
    reps: Number(data.reps || 0),
    equipment: data.equipment || 'None',
    imageUrl: data.imageUrl || data.image || '',
    description: data.description || '',
    instructions: Array.isArray(data.instructions) ? data.instructions : [],
    isCompleted: Boolean(data.isCompleted),
  };
}

export async function getAllWorkouts(): Promise<Workout[]> {
  try {
    const res = await fetch(BASE_URL, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error('Failed to fetch workouts');
    const rawData = await res.json();
    
    return Array.isArray(rawData) ? rawData.map(mapWorkoutData) : [];
  } catch (error) {
    console.error('getAllWorkouts error:', error);
    return [];
  }
}

export async function getWorkoutById(id: string): Promise<Workout | null> {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, { next: { revalidate: 3600 } });
    
    if (!res.ok) {
      // API fallback: Direct ID route kaj na korle shob workout fetch kore ID match kora
      const allWorkouts = await getAllWorkouts();
      return allWorkouts.find((item) => String(item.id) === String(id)) || null;
    }

    const rawData = await res.json();
    
    // API array return korle prothom element neya hobe
    const item = Array.isArray(rawData) ? rawData[0] : rawData;
    
    if (!item) return null;

    return mapWorkoutData(item);
  } catch (error) {
    console.error(`getWorkoutById error for ID ${id}:`, error);
    return null;
  }
}