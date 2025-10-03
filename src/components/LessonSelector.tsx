import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { useLessonStore } from '@/store/lessonStore';
import { lessons } from '@/lib/lessons';
import { Level } from '@/types';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { CheckCircle2, RotateCcw } from 'lucide-react';
import { isLessonCompleted, clearLevelProgress } from '@/lib/progressTracker';
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

  const handleLevelChange = (newLevel: string) => {
    setLesson(newLevel as Level, 0);
  };

  const handleResetClick = (lvl: Level) => {
    setLevelToReset(lvl);
    setShowConfirm(true);
  };

  const handleConfirmReset = () => {
    if (levelToReset) {
      clearLevelProgress(levelToReset);
      setRefreshKey(prev => prev + 1); // Force re-render
      setShowConfirm(false);
      setLevelToReset(null);
    }
  };

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
      {(['easy', 'medium', 'hard'] as Level[]).map((lvl) => (
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
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      ))}
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
  </>
  );
};
export default LessonSelector;