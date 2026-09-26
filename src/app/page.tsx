import { getAllWorkouts } from '@/services/api';
import Hero from '@/components/home/Hero';
import Library from '@/components/home/Library';

export default async function HomePage() {
  const workouts = await getAllWorkouts();

  return (
    <div className="space-y-8">
      <Hero />
      <section id="library">
        <Library initialWorkouts={workouts} />
      </section>
    </div>
  );
}