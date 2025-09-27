import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useLessonStore } from '@/store/lessonStore';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
const TypingArena: React.FC = () => {
  const text = useLessonStore((s) => s.text);
  const userInput = useLessonStore((s) => s.userInput);
  const cursor = useLessonStore((s) => s.cursor);
  return (
    <Card>
      <CardContent className="p-6">
        <div
          className="text-2xl md:text-3xl font-mono tracking-wider leading-relaxed select-none"
          aria-label="Typing prompt"
        >
          {text.split('').map((char, index) => {
            const isTyped = index < cursor;
            const isCorrect = isTyped && userInput[index] === char;
            const isCurrent = index === cursor;
            return (
              <span
                key={index}
                className={cn(
                  'transition-colors duration-150',
                  isTyped && (isCorrect ? 'text-green-500' : 'text-red-500'),
                  !isTyped && 'text-slate-400 dark:text-slate-500',
                  isCurrent && 'bg-blue-500/20 rounded-sm'
                )}
              >
                {char === ' ' && isCurrent ? (
                  <span className="relative">
                    &nbsp;
                    <motion.div
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      exit={{ scaleX: 0 }}
                      transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                    />
                  </span>
                ) : (
                  char
                )}
              </span>
            );
          })}
          {cursor === text.length && (
            <span className="text-green-500"> ✓</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
export default TypingArena;