import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useLessonStore } from '@/store/lessonStore';
import { RefreshCw, CheckCircle2, ArrowRight } from 'lucide-react';
import { saveProgress, hasCompletedAllInLevel } from '@/lib/progressTracker';
import { CelebrationModal } from './CelebrationModal';
import { Certification } from './Certification';
import { Certificate } from './Certificate';
import { lessons } from '@/lib/lessons';
import type { Level } from '@/types';

const PerformanceReport: React.FC = () => {
  const {
    startTime,
    endTime,
    errors,
    resetLesson,
    status,
    level,
    lessonIndex,
    setLesson,
    wpm,
    accuracy,
  } = useLessonStore();

  const [showCelebration, setShowCelebration] = useState(false);
  const [showCertification, setShowCertification] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [certificateName, setCertificateName] = useState('');

  const problemKeys = React.useMemo(() => {
    if (!errors) return [];
    return Array.from(errors.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);
  }, [errors]);
  const timeTaken = startTime && endTime ? (endTime - startTime) / 1000 : 0;
  // Save progress when lesson is completed
  useEffect(() => {
    if (status === 'finished') {
      saveProgress(level, lessonIndex, wpm, accuracy);

      // Check if all lessons in current level are completed
      const totalLessons = lessons[level].length;
      const completedAll = hasCompletedAllInLevel(level, totalLessons);

      if (completedAll) {
        if (level === 'hard') {
          setTimeout(() => setShowCertification(true), 1000);
        } else {
          // Show celebration for easy and medium levels
          setTimeout(() => setShowCelebration(true), 1000);
        }
      }
    }
  }, [status, level, lessonIndex, wpm, accuracy]);

  const handleGenerateCertificate = (name: string) => {
    setCertificateName(name);
    setShowCertification(false);
    setShowCertificate(true);
  };

  if (status !== 'finished') return null;
  
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      resetLesson();
    }
  };

  const handleNextLesson = () => {
    const totalLessons = lessons[level].length;
    
    // Check if there's a next lesson in current level
    if (lessonIndex + 1 < totalLessons) {
      setLesson(level, lessonIndex + 1);
    } else {
      // Move to next difficulty level
      const levelOrder: Level[] = ['easy', 'medium', 'hard'];
      const currentLevelIndex = levelOrder.indexOf(level);
      
      if (currentLevelIndex < levelOrder.length - 1) {
        const nextLevel = levelOrder[currentLevelIndex + 1];
        setLesson(nextLevel, 0);
      } else {
        // Already at last lesson of hard level
        resetLesson();
      }
    }
  };

  // Check if there's a next lesson available
  const totalLessons = lessons[level].length;
  const isLastLessonInLevel = lessonIndex >= totalLessons - 1; // lessonIndex is 0-based, so lesson 5 is index 4
  const levelOrder: Level[] = ['easy', 'medium', 'hard'];
  const currentLevelIndex = levelOrder.indexOf(level);
  const isLastLevel = currentLevelIndex >= levelOrder.length - 1;
  
  // Hide next button if it's the last lesson of the 'hard' level
  const showNextButton = !(isLastLessonInLevel && isLastLevel);

  return (
    <>
      <Dialog open={status === 'finished' && !showCertificate && !showCertification} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-green-500" />
              Pelajaran Selesai!
            </DialogTitle>
            <DialogDescription>Berikut ringkasan performa Anda. Latihan membuat sempurna!</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-3 text-center">
              <div>
                <p className="text-sm text-muted-foreground">KPM</p>
                <p className="text-2xl font-bold">{wpm}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Waktu</p>
                <p className="text-2xl font-bold">{timeTaken.toFixed(1)}d</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Akurasi</p>
                <p className="text-2xl font-bold">{accuracy}%</p>
              </div>
            </div>
            <div>
              <Progress value={accuracy} className="w-full" />
            </div>
            {problemKeys.length > 0 && (
              <div>
                <h3 className="mb-2 font-semibold">Tombol Bermasalah</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tombol</TableHead>
                      <TableHead className="text-right">Kesalahan</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {problemKeys.map(([key, count]) => (
                      <TableRow key={key}>
                        <TableCell className="font-mono font-bold">{key === ' ' ? 'Spasi' : key}</TableCell>
                        <TableCell className="text-right">{count}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
          <DialogFooter className="gap-2 sm:gap-2">
            <div className="flex flex-col sm:flex-row gap-2 w-full">
              <Button onClick={resetLesson} variant="outline" className="flex-1">
                <RefreshCw className="mr-2 h-4 w-4" />
                Coba Lagi
              </Button>
              {showNextButton && (
                <Button onClick={handleNextLesson} className="flex-1">
                  Pelajaran Berikutnya
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <CelebrationModal
        isOpen={showCelebration}
        level={level}
        onClose={() => setShowCelebration(false)}
      />

      {showCertification && (
        <Certification level={level} onGenerate={handleGenerateCertificate} />
      )}

      {showCertificate && (
        <Certificate
          name={certificateName}
          level={level}
          onClose={() => {
            setShowCertificate(false);
            resetLesson();
          }}
        />
      )}
    </>
  );
};

export default PerformanceReport;