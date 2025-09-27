import React, { useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useLessonStore } from '@/store/lessonStore';
import LessonSelector from '@/components/LessonSelector';
import StatsDisplay from '@/components/StatsDisplay';
import TypingArena from '@/components/TypingArena';
import VisualKeyboard from '@/components/VisualKeyboard';
import PerformanceReport from '@/components/PerformanceReport';
import { ThemeToggle } from './ThemeToggle';
import { Type } from 'lucide-react';
const QwertyFlowApp: React.FC = () => {
  const handleKeyPress = useLessonStore((s) => s.handleKeyPress);
  const status = useLessonStore((s) => s.status);
  const keydownHandler = useCallback(
    (event: KeyboardEvent) => {
      if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
        event.preventDefault();
        handleKeyPress(event.key);
      }
    },
    [handleKeyPress]
  );
  useEffect(() => {
    window.addEventListener('keydown', keydownHandler);
    return () => {
      window.removeEventListener('keydown', keydownHandler);
    };
  }, [keydownHandler]);
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center py-8 sm:py-12">
      <ThemeToggle className="absolute top-4 right-4" />
      <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col space-y-8">
        <header className="text-center space-y-2">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-3"
          >
            <Type className="h-8 w-8 text-blue-500" />
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              QwertyFlow
            </h1>
          </motion.div>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            An elegant, minimalist typing tutor to enhance your speed and accuracy.
          </p>
        </header>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <LessonSelector />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <StatsDisplay />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-8"
        >
          <TypingArena />
          <VisualKeyboard />
        </motion.div>
      </main>
      <footer className="mt-16 text-center text-slate-500 dark:text-slate-400 text-sm">
        <p>Built with ���️ at Cloudflare</p>
      </footer>
      {status === 'finished' && <PerformanceReport />}
    </div>
  );
};
export default QwertyFlowApp;