export type Level = 'easy' | 'medium' | 'hard';
export interface LessonState {
  level: Level;
  lessonIndex: number;
  lessons: Record<Level, string[]>;
  text: string;
  userInput: string;
  cursor: number;
  status: 'idle' | 'running' | 'finished';
  startTime: number | null;
  endTime: number | null;
  errors: Map<string, number>;
  // Actions
  setLesson: (level: Level, lessonIndex: number) => void;
  handleKeyPress: (key: string) => void;
  resetLesson: () => void;
}