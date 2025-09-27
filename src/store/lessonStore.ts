import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { LessonState, Level } from '@/types';
import { lessons } from '@/lib/lessons';
export const useLessonStore = create<LessonState>()(
  immer((set, get) => ({
    level: 'easy',
    lessonIndex: 0,
    lessons,
    text: lessons.easy[0],
    userInput: '',
    cursor: 0,
    status: 'idle',
    startTime: null,
    endTime: null,
    errors: new Map(),
    setLesson: (level: Level, lessonIndex: number) => {
      set((state) => {
        state.level = level;
        state.lessonIndex = lessonIndex;
        state.text = lessons[level][lessonIndex];
        state.userInput = '';
        state.cursor = 0;
        state.status = 'idle';
        state.startTime = null;
        state.endTime = null;
        state.errors.clear();
      });
    },
    handleKeyPress: (key: string) => {
      const { status, text, cursor } = get();
      if (status === 'finished') return;
      if (status === 'idle') {
        set((state) => {
          state.status = 'running';
          state.startTime = Date.now();
        });
      }
      const expectedChar = text[cursor];
      // Handle special characters that might not be represented directly
      let processedKey = key;
      if (processedKey === expectedChar) {
        set((state) => {
          state.userInput += processedKey;
          state.cursor += 1;
          if (state.cursor === state.text.length) {
            state.status = 'finished';
            state.endTime = Date.now();
          }
        });
      } else {
        set((state) => {
          const currentErrors = state.errors.get(expectedChar) || 0;
          state.errors.set(expectedChar, currentErrors + 1);
        });
      }
    },
    resetLesson: () => {
      const { level, lessonIndex } = get();
      get().setLesson(level, lessonIndex);
    },
  }))
);