import React, { useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useLessonStore } from '@/store/lessonStore';
import LessonSelector from '@/components/LessonSelector';
import StatsDisplay from '@/components/StatsDisplay';
import TypingArena from '@/components/TypingArena';
import VisualKeyboard from '@/components/VisualKeyboard';
import PerformanceReport from '@/components/PerformanceReport';
import { ThemeToggle } from './ThemeToggle';
import { Type, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

const QwertyFlowApp: React.FC = () => {
  const handleKeyPress = useLessonStore((s) => s.handleKeyPress);
  const status = useLessonStore((s) => s.status);
  const keydownHandler = useCallback(
    (event: KeyboardEvent) => {
      // Don't capture keystrokes when typing in input fields or textareas
      const target = event.target as HTMLElement;
      const isInputField = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;
      
      if (isInputField) {
        return; // Allow normal typing in input fields
      }
      
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
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center py-4 sm:py-6">
      <ThemeToggle className="absolute top-4 right-4" />
      <Link to="/" className="absolute top-4 left-4">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali
        </Button>
      </Link>
      <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col space-y-4 sm:space-y-6">
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
            Tutor mengetik yang elegan dan minimalis untuk meningkatkan kecepatan dan akurasi mu.
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
          className="space-y-4 sm:space-y-6"
        >
          <TypingArena />
          <VisualKeyboard />
        </motion.div>
      </main>
      <footer className="mt-8 sm:mt-12 text-center text-slate-500 dark:text-slate-400 text-sm space-y-2">
        <p className="flex items-center justify-center gap-2">
          Dibuat dengan 
          <svg className="w-6 h-6" viewBox="0 0 32 32" fill="currentColor">
            <path d="M0 0h8v32H0zM11 0h10v8H11zM11 11h10v10H11zM11 24h10v8H11zM24 0h8v32h-8z"/>
          </svg>
          IBM Granite
        </p>
        <p>
          © 2025 Fajar Sodik • {' '}
          <a 
            href="https://github.com/fajarsodik-ut" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-colors underline"
          >
            GitHub
          </a>
        </p>
      </footer>
      {status === 'finished' && <PerformanceReport />}
    </div>
  );
};
export default QwertyFlowApp;