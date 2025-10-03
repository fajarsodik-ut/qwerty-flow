import type { Level } from '@/types';

export interface LessonProgress {
  level: Level;
  lessonIndex: number;
  completed: boolean;
  wpm: number;
  accuracy: number;
  completedAt: string;
}

export interface UserProgress {
  lessonsCompleted: LessonProgress[];
  stats: {
    easy: number;
    medium: number;
    hard: number;
  };
}

const STORAGE_KEY = 'qwertyflow_progress';

export const getProgress = (): UserProgress => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return {
    lessonsCompleted: [],
    stats: { easy: 0, medium: 0, hard: 0 }
  };
};

export const saveProgress = (level: Level, lessonIndex: number, wpm: number, accuracy: number) => {
  const progress = getProgress();
  
  // Check if this lesson was already completed
  const existingIndex = progress.lessonsCompleted.findIndex(
    (l) => l.level === level && l.lessonIndex === lessonIndex
  );

  const lessonProgress: LessonProgress = {
    level,
    lessonIndex,
    completed: true,
    wpm,
    accuracy,
    completedAt: new Date().toISOString()
  };

  if (existingIndex >= 0) {
    // Update existing progress if better
    const existing = progress.lessonsCompleted[existingIndex];
    if (wpm > existing.wpm || accuracy > existing.accuracy) {
      progress.lessonsCompleted[existingIndex] = lessonProgress;
    }
  } else {
    // Add new completion
    progress.lessonsCompleted.push(lessonProgress);
    progress.stats[level] += 1;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  return progress;
};

export const isLessonCompleted = (level: Level, lessonIndex: number): boolean => {
  const progress = getProgress();
  return progress.lessonsCompleted.some(
    (l) => l.level === level && l.lessonIndex === lessonIndex && l.completed
  );
};

export const hasCompletedAllInLevel = (level: Level, totalLessons: number): boolean => {
  const progress = getProgress();
  const completedInLevel = progress.lessonsCompleted.filter(
    (l) => l.level === level && l.completed
  );
  return completedInLevel.length >= totalLessons;
};

export const clearProgress = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const clearLevelProgress = (level: Level) => {
  const progress = getProgress();
  
  // Remove all lessons for this level
  progress.lessonsCompleted = progress.lessonsCompleted.filter(
    (l) => l.level !== level
  );
  
  // Reset stats for this level
  progress.stats[level] = 0;
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  return progress;
};
