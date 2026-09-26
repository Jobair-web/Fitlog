import '@/styles/globals.css';
import { ReactNode } from 'react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import { WorkoutProvider } from '@/context/WorkoutContext';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'FitLog - Track Your Workouts',
  description: 'Fitness plan and workout tracking application',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <body className="min-h-screen flex flex-col bg-base-300 text-base-content antialiased">
        <WorkoutProvider>
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-6">{children}</main>
          <Footer />
          
          {/* React Hot Toast Toaster - Set to Top-Right */}
          <Toaster 
            position="top-center" 
            toastOptions={{
              duration: 3000,
              style: {
                background: '#161B26',
                color: '#fff',
                border: '1px solid #374151',
              },
            }}
          />
        </WorkoutProvider>
      </body>
    </html>
  );
}