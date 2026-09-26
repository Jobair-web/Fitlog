'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Workout, WorkoutContextType } from '@/types/workout';

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider = ({ children }: { children: ReactNode }) => {
  const [todayPlan, setTodayPlan] = useState<Workout[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    const localPlan = localStorage.getItem('fitlog_plan');
    const localSaved = localStorage.getItem('fitlog_saved');
    if (localPlan) setTodayPlan(JSON.parse(localPlan));
    if (localSaved) setSavedWorkouts(JSON.parse(localSaved));
  }, []);

  useEffect(() => {
    localStorage.setItem('fitlog_plan', JSON.stringify(todayPlan));
  }, [todayPlan]);

  useEffect(() => {
    localStorage.setItem('fitlog_saved', JSON.stringify(savedWorkouts));
  }, [savedWorkouts]);

  const addToPlan = (workout: Workout): boolean => {
    if (todayPlan.length >= 5) return false;
    if (!todayPlan.some((w) => w.id === workout.id)) {
      setTodayPlan((prev) => [...prev, { ...workout, isCompleted: false }]);
    }
    return true;
  };

  const removeFromPlan = (workoutId: string) => {
    setTodayPlan((prev) => prev.filter((w) => w.id !== workoutId));
  };

  const toggleComplete = (workoutId: string) => {
    setTodayPlan((prev) =>
      prev.map((w) => (w.id === workoutId ? { ...w, isCompleted: !w.isCompleted } : w))
    );
  };

  const toggleSaveWorkout = (workout: Workout) => {
    setSavedWorkouts((prev) =>
      prev.some((w) => w.id === workout.id)
        ? prev.filter((w) => w.id !== workout.id)
        : [...prev, workout]
    );
  };

  const isSaved = (workoutId: string) => savedWorkouts.some((w) => w.id === workoutId);
  const isInPlan = (workoutId: string) => todayPlan.some((w) => w.id === workoutId);

  return (
    <WorkoutContext.Provider
      value={{
        todayPlan,
        savedWorkouts,
        addToPlan,
        removeFromPlan,
        toggleComplete,
        toggleSaveWorkout,
        isSaved,
        isInPlan,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = (): WorkoutContextType => {
  const context = useContext(WorkoutContext);
  if (!context) throw new Error('useWorkout must be used within WorkoutProvider');
  return context;
};