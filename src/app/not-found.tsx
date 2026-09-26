import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold text-primary font-oswald mb-2">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Workout Not Found</h2>
      <p className="opacity-70 mb-6">The requested exercise route does not exist.</p>
      <Link href="/" className="btn btn-primary">
        Back to Home
      </Link>
    </div>
  );
}