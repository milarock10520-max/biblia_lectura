import { useState, useEffect } from 'react';
import { totalDays, readingPlan } from '../data/readingPlan';

const STORAGE_KEY = 'bibleChronosProgress';

/**
 * Manages reading progress: completed days, current view day,
 * and persists to localStorage.
 */
export function useProgress() {
  const [completedDays, setCompletedDays] = useState([]);
  const [currentViewDay, setCurrentViewDay] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setCompletedDays(parsed);
      // Advance to the first incomplete day
      let nextDay = 1;
      while (parsed.includes(nextDay) && nextDay < totalDays) {
        nextDay++;
      }
      setCurrentViewDay(nextDay);
    }
    setIsLoaded(true);
  }, []);

  // Persist whenever completedDays changes (after first load)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completedDays));
    }
  }, [completedDays, isLoaded]);

  const toggleDayCompletion = (day) => {
    setCompletedDays((prev) => {
      if (prev.includes(day)) return prev.filter((d) => d !== day);
      // Auto-advance to next day
      if (currentViewDay === day && day < totalDays) {
        setTimeout(() => setCurrentViewDay(day + 1), 500);
      }
      return [...prev, day];
    });
  };

  const progressPercentage = (completedDays.length / totalDays) * 100;
  const currentDayData = readingPlan[currentViewDay - 1];

  return {
    completedDays,
    currentViewDay,
    setCurrentViewDay,
    isLoaded,
    toggleDayCompletion,
    progressPercentage,
    currentDayData,
  };
}
