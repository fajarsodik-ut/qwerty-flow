import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Trophy, Star, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import type { Level } from '@/types';

interface CelebrationModalProps {
  isOpen: boolean;
  level: Level;
  onClose: () => void;
}

export const CelebrationModal: React.FC<CelebrationModalProps> = ({ isOpen, level, onClose }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowContent(false);
      
      // Confetti animation
      const duration = 5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(interval);
          return;
        }

        const particleCount = 50 * (timeLeft / duration);
        
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
      }, 250);

      // Show content after a brief delay
      setTimeout(() => setShowContent(true), 300);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  const levelNames: Record<Level, string> = {
    easy: 'Mudah',
    medium: 'Sedang',
    hard: 'Sulit'
  };

  const levelColors: Record<Level, string> = {
    easy: 'from-green-400 to-emerald-600',
    medium: 'from-yellow-400 to-orange-600',
    hard: 'from-red-400 to-pink-600'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 50 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="relative max-w-2xl mx-4 p-8 bg-gradient-to-br from-white to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-3xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatePresence>
              {showContent && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-center"
                >
                  {/* Trophy Icon */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', delay: 0.4, duration: 0.8 }}
                    className="flex justify-center mb-6"
                  >
                    <div className={`relative p-6 bg-gradient-to-br ${levelColors[level]} rounded-full shadow-2xl`}>
                      <Trophy className="h-20 w-20 text-white" />
                      <motion.div
                        animate={{
                          rotate: [0, 360],
                          scale: [1, 1.2, 1]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'linear'
                        }}
                        className="absolute -top-2 -right-2"
                      >
                        <Sparkles className="h-8 w-8 text-yellow-400" />
                      </motion.div>
                      <motion.div
                        animate={{
                          rotate: [360, 0],
                          scale: [1, 1.2, 1]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'linear'
                        }}
                        className="absolute -bottom-2 -left-2"
                      >
                        <Star className="h-8 w-8 text-yellow-400" />
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Title */}
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                  >
                    Selamat! 🎉
                  </motion.h1>

                  {/* Message */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-2xl text-slate-700 dark:text-slate-200 mb-2"
                  >
                    Kamu telah menyelesaikan semua pelajaran
                  </motion.p>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className={`text-3xl font-bold mb-6 bg-gradient-to-r ${levelColors[level]} bg-clip-text text-transparent`}
                  >
                    Level {levelNames[level]}!
                  </motion.p>

                  {/* Stats */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="grid grid-cols-3 gap-4 mb-8 p-6 bg-white/50 dark:bg-slate-800/50 rounded-2xl"
                  >
                    <div>
                      <div className="text-4xl mb-1">🏆</div>
                      <div className="text-sm text-slate-600 dark:text-slate-300">Pelajaran</div>
                      <div className="text-2xl font-bold">5/5</div>
                    </div>
                    <div>
                      <div className="text-4xl mb-1">⭐</div>
                      <div className="text-sm text-slate-600 dark:text-slate-300">Pencapaian</div>
                      <div className="text-2xl font-bold">100%</div>
                    </div>
                    <div>
                      <div className="text-4xl mb-1">🔥</div>
                      <div className="text-sm text-slate-600 dark:text-slate-300">Status</div>
                      <div className="text-2xl font-bold">Mahir!</div>
                    </div>
                  </motion.div>

                  {/* Encouragement */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-lg text-slate-600 dark:text-slate-300 mb-6 italic"
                  >
                    "Latihan yang konsisten membawa kesempurnaan. Terus berlatih!"
                  </motion.p>

                  {/* Button */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.1 }}
                  >
                    <Button
                      onClick={onClose}
                      size="lg"
                      className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      Lanjutkan Petualangan 🚀
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
