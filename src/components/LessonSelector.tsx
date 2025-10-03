import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { useLessonStore } from '@/store/lessonStore';
import { lessons } from '@/lib/lessons';
import { Level } from '@/types';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { CheckCircle2, RotateCcw, Award, Sparkles } from 'lucide-react';
import { isLessonCompleted, clearLevelProgress, getLevelStats } from '@/lib/progressTracker';
import { CertificateModal } from '@/components/CertificateModal';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const LessonSelector: React.FC = () => {
  const level = useLessonStore((s) => s.level);
  const lessonIndex = useLessonStore((s) => s.lessonIndex);
  const setLesson = useLessonStore((s) => s.setLesson);
  const [showConfirm, setShowConfirm] = useState(false);
  const [levelToReset, setLevelToReset] = useState<Level | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [certificateLevel, setCertificateLevel] = useState<Level>('easy');
  const [certificateStats, setCertificateStats] = useState({ meanWpm: 0, meanAccuracy: 0 });
  const [showCongrats, setShowCongrats] = useState(false);
  const [congratsLevel, setCongratsLevel] = useState<Level>('easy');

  const handleLevelChange = (newLevel: string) => {
    setLesson(newLevel as Level, 0);
  };

  const handleResetClick = (lvl: Level) => {
    setLevelToReset(lvl);
    setShowConfirm(true);
  };

  const handleCertificateClick = (lvl: Level) => {
    const stats = getLevelStats(lvl);
    setCertificateLevel(lvl);
    setCertificateStats({ meanWpm: stats.meanWpm, meanAccuracy: stats.meanAccuracy });
    setShowCertificateModal(true);
  };

  const handleConfirmReset = () => {
    if (levelToReset) {
      clearLevelProgress(levelToReset);
      setRefreshKey(prev => prev + 1); // Force re-render
      setShowConfirm(false);
      setLevelToReset(null);
    }
  };

  // Check if all lessons are completed and show congratulations
  useEffect(() => {
    const checkAllCompleted = () => {
      (['easy', 'medium', 'hard'] as Level[]).forEach((lvl) => {
        const totalLessons = lessons[lvl].length;
        const allCompleted = Array.from({ length: totalLessons }).every((_, index) => 
          isLessonCompleted(lvl, index)
        );
        
        // Check if we just completed all lessons
        const storageKey = `congrats_shown_${lvl}`;
        const congratsShown = sessionStorage.getItem(storageKey);
        
        if (allCompleted && !congratsShown && lvl === level) {
          setCongratsLevel(lvl);
          setShowCongrats(true);
          sessionStorage.setItem(storageKey, 'true');
          
          // Trigger confetti
          const duration = 3000;
          const animationEnd = Date.now() + duration;
          const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

          const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) {
              return clearInterval(interval);
            }

            confetti({
              ...defaults,
              particleCount: 50,
              origin: { x: Math.random(), y: Math.random() - 0.2 }
            });
          }, 250);
        }
      });
    };

    checkAllCompleted();
  }, [refreshKey, level, lessonIndex]);

  const levelNames: Record<Level, string> = {
    easy: 'Mudah',
    medium: 'Sedang',
    hard: 'Sulit'
  };
  return (
    <>
    <Tabs value={level} onValueChange={handleLevelChange} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger 
          value="easy"
          className={cn(
            "data-[state=active]:bg-green-500 data-[state=active]:text-white",
            "hover:bg-green-500/20 transition-colors"
          )}
        >
          Mudah
        </TabsTrigger>
        <TabsTrigger 
          value="medium"
          className={cn(
            "data-[state=active]:bg-yellow-500 data-[state=active]:text-white",
            "hover:bg-yellow-500/20 transition-colors"
          )}
        >
          Sedang
        </TabsTrigger>
        <TabsTrigger 
          value="hard"
          className={cn(
            "data-[state=active]:bg-red-500 data-[state=active]:text-white",
            "hover:bg-red-500/20 transition-colors"
          )}
        >
          Sulit
        </TabsTrigger>
      </TabsList>
      {(['easy', 'medium', 'hard'] as Level[]).map((lvl) => {
        const levelStats = getLevelStats(lvl);
        const hasCompletedLessons = levelStats.completedCount > 0;
        const totalLessons = lessons[lvl].length;
        const allLessonsCompleted = levelStats.completedCount === totalLessons;
        
        return (
        <TabsContent key={lvl} value={lvl}>
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Pilih Pelajaran</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleResetClick(lvl)}
                  className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset Progress
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {lessons[lvl].map((_, index) => {
                  const completed = isLessonCompleted(lvl, index);
                  return (
                    <Button
                      key={`${lvl}-${index}-${refreshKey}`}
                      variant={level === lvl && lessonIndex === index ? 'default' : 'outline'}
                      onClick={() => setLesson(lvl, index)}
                      className={cn(
                        "transition-all duration-200 relative",
                        level === lvl && lessonIndex === index && "ring-2 ring-blue-500 ring-offset-2 ring-offset-background",
                        completed && "border-green-500"
                      )}
                    >
                      {completed && (
                        <CheckCircle2 className="absolute -top-2 -right-2 h-5 w-5 text-green-500 bg-white dark:bg-slate-800 rounded-full" />
                      )}
                      Pelajaran {index + 1}
                    </Button>
                  );
                })}
                
                {/* Certificate Button with Progress Indicators */}
                <Button
                  key={`${lvl}-certificate-${refreshKey}`}
                  variant="outline"
                  onClick={() => handleCertificateClick(lvl)}
                  disabled={!hasCompletedLessons}
                  className={cn(
                    "transition-all duration-200 relative border-2 pl-3 pr-4 min-w-[180px]",
                    hasCompletedLessons 
                      ? allLessonsCompleted
                        ? "border-green-500 bg-green-50 dark:bg-green-950 hover:bg-green-100 dark:hover:bg-green-900 text-green-700 dark:text-green-400 animate-pulse"
                        : "border-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-950 text-yellow-700 dark:text-yellow-400"
                      : "opacity-50 cursor-not-allowed"
                  )}
                  title={hasCompletedLessons ? "Buat sertifikat berdasarkan performa Anda" : "Selesaikan minimal 1 pelajaran untuk membuat sertifikat"}
                >
                  {allLessonsCompleted && (
                    <CheckCircle2 className="absolute -top-2 -right-2 h-5 w-5 text-green-500 bg-white dark:bg-slate-800 rounded-full" />
                  )}
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4" />
                    <span>Buat Sertifikat</span>
                    {/* Progress Checkmarks */}
                    <div className="flex gap-0.5 ml-1">
                      {Array.from({ length: totalLessons }).map((_, idx) => {
                        const lessonCompleted = isLessonCompleted(lvl, idx);
                        return (
                          <div
                            key={idx}
                            className={cn(
                              "w-2 h-2 rounded-full transition-all duration-300",
                              lessonCompleted 
                                ? "bg-green-500 scale-110" 
                                : "bg-gray-300 dark:bg-gray-600"
                            )}
                            title={`Pelajaran ${idx + 1} ${lessonCompleted ? 'selesai' : 'belum selesai'}`}
                          />
                        );
                      })}
                    </div>
                  </div>
                </Button>
              </div>
              
              {hasCompletedLessons && (
                <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Statistik Level Anda:</p>
                  <div className="flex gap-4 text-sm">
                    <span className="font-semibold">
                      Pelajaran Selesai: <span className="text-blue-600 dark:text-blue-400">{levelStats.completedCount}</span>
                    </span>
                    <span className="font-semibold">
                      Rata-rata WPM: <span className="text-blue-600 dark:text-blue-400">{levelStats.meanWpm}</span>
                    </span>
                    <span className="font-semibold">
                      Rata-rata Akurasi: <span className="text-green-600 dark:text-green-400">{levelStats.meanAccuracy}%</span>
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        );
      })}
    </Tabs>

    {/* Confirmation Dialog */}
    <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reset Progress Level {levelToReset ? levelNames[levelToReset] : ''}?</AlertDialogTitle>
          <AlertDialogDescription>
            Semua progress dan riwayat pelajaran di level ini akan dihapus. 
            Tindakan ini tidak dapat dibatalkan.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleConfirmReset}
            className="bg-red-600 hover:bg-red-700"
          >
            Ya, Reset
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

    {/* Certificate Modal */}
    <CertificateModal
      isOpen={showCertificateModal}
      onClose={() => setShowCertificateModal(false)}
      level={certificateLevel}
      meanWpm={certificateStats.meanWpm}
      meanAccuracy={certificateStats.meanAccuracy}
    />

    {/* Congratulations Popup */}
    <AnimatePresence>
      {showCongrats && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setShowCongrats(false)}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 50 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="relative max-w-lg mx-4 p-8 bg-gradient-to-br from-white to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-3xl shadow-2xl text-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sparkles Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', delay: 0.2, duration: 0.8 }}
              className="flex justify-center mb-6"
            >
              <div className="relative p-6 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-full shadow-2xl">
                <Sparkles className="h-16 w-16 text-white" />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-4 border-white/30 border-t-white"
                />
              </div>
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent"
            >
              Selamat! 🎉
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-slate-600 dark:text-slate-300 mb-6"
            >
              Anda telah menyelesaikan semua pelajaran di level <span className="font-bold text-slate-900 dark:text-white">{levelNames[congratsLevel]}</span>!
            </motion.p>

            {/* Message */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-base text-slate-500 dark:text-slate-400 mb-8 italic"
            >
              Sertifikat Anda sudah siap! Klik tombol "Buat Sertifikat" untuk mengunduhnya.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col gap-3"
            >
              <Button
                onClick={() => {
                  setShowCongrats(false);
                  handleCertificateClick(congratsLevel);
                }}
                size="lg"
                className="text-lg px-8 py-6 bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700"
              >
                <Award className="mr-2 h-5 w-5" />
                Buat Sertifikat Sekarang
              </Button>

              {/* Next Level Button */}
              {((congratsLevel === 'easy') || (congratsLevel === 'medium')) && (
                <Button
                  onClick={() => {
                    setShowCongrats(false);
                    const nextLevel = congratsLevel === 'easy' ? 'medium' : 'hard';
                    setLesson(nextLevel, 0);
                  }}
                  size="lg"
                  variant="outline"
                  className="text-base px-8 py-4 border-2"
                >
                  Lanjut ke Level {congratsLevel === 'easy' ? 'Sedang' : 'Sulit'} →
                </Button>
              )}

              {/* Close Button for Hard Level */}
              {congratsLevel === 'hard' && (
                <Button
                  onClick={() => setShowCongrats(false)}
                  size="lg"
                  variant="outline"
                  className="text-base px-8 py-4"
                >
                  Tutup
                </Button>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  </>
  );
};
export default LessonSelector;