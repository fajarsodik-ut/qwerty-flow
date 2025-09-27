import React from 'react';
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
import { RefreshCw } from 'lucide-react';
const PerformanceReport: React.FC = () => {
  const userInput = useLessonStore((s) => s.userInput);
  const startTime = useLessonStore((s) => s.startTime);
  const endTime = useLessonStore((s) => s.endTime);
  const errors = useLessonStore((s) => s.errors, (oldMap, newMap) => {
    if (oldMap.size !== newMap.size) return false;
    for (const [key, value] of oldMap.entries()) {
      if (newMap.get(key) !== value) return false;
    }
    return true;
  });
  const resetLesson = useLessonStore((s) => s.resetLesson);
  const status = useLessonStore((s) => s.status);
  if (!startTime || !endTime) return null;
  const timeTaken = (endTime - startTime) / 1000;
  const minutes = timeTaken / 60;
  const wpm = minutes > 0 ? Math.round((userInput.length / 5) / minutes) : 0;
  const totalErrors = Array.from(errors.values()).reduce((acc, count) => acc + count, 0);
  const accuracy = userInput.length > 0 ? Math.max(0, Math.round(((userInput.length - totalErrors) / userInput.length) * 100)) : 100;
  const problemKeys = React.useMemo(() => Array.from(errors.entries())
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5), [errors]);
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      resetLesson();
    }
  };
  return (
    <Dialog open={status === 'finished'} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Lesson Complete!</DialogTitle>
          <DialogDescription>Here's your performance summary. Practice makes perfect!</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-3 text-center">
            <div>
              <p className="text-sm text-muted-foreground">WPM</p>
              <p className="text-2xl font-bold">{wpm}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Time</p>
              <p className="text-2xl font-bold">{timeTaken.toFixed(1)}s</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Accuracy</p>
              <p className="text-2xl font-bold">{accuracy}%</p>
            </div>
          </div>
          <div>
            <Progress value={accuracy} className="w-full" />
          </div>
          {problemKeys.length > 0 && (
            <div>
              <h3 className="mb-2 font-semibold">Problem Keys</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Key</TableHead>
                    <TableHead className="text-right">Mistakes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {problemKeys.map(([key, count]) => (
                    <TableRow key={key}>
                      <TableCell className="font-mono font-bold">{key === ' ' ? 'Space' : key}</TableCell>
                      <TableCell className="text-right">{count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={resetLesson} className="w-full">
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default PerformanceReport;