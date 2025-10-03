import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useLessonStore } from '@/store/lessonStore';
import { motion } from 'framer-motion';
import { Target, Clock, Percent } from 'lucide-react';
const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string | number; unit?: string }> = ({ icon, label, value, unit }) => (
  <div className="flex flex-col items-center space-y-1 text-center">
    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
    <div className="text-3xl font-bold tabular-nums text-slate-900 dark:text-slate-50">
      {value}
      {unit && <span className="text-lg font-medium text-slate-500 dark:text-slate-400 ml-1">{unit}</span>}
    </div>
  </div>
);
const StatsDisplay: React.FC = () => {
  const userInputLength = useLessonStore((s) => s.userInput.length);
  const startTime = useLessonStore((s) => s.startTime);
  const status = useLessonStore((s) => s.status);
  const totalErrors = useLessonStore((s) =>
    Array.from(s.errors.values()).reduce((acc, count) => acc + count, 0)
  );
  const [elapsedTime, setElapsedTime] = useState(0);
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (status === 'running' && startTime) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 100);
    } else {
      setElapsedTime(0);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [status, startTime]);
  const minutes = elapsedTime / 1000 / 60;
  const wpm = minutes > 0 ? Math.round((userInputLength / 5) / minutes) : 0;
  const accuracy = userInputLength > 0 ? Math.max(0, Math.round(((userInputLength - totalErrors) / userInputLength) * 100)) : 100;
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  return (
    <Card>
      <CardContent className="p-4 sm:p-6">
        <motion.div
          className="flex justify-around items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <StatCard icon={<Target className="h-4 w-4" />} label="KPM" value={wpm} />
          <StatCard icon={<Percent className="h-4 w-4" />} label="Akurasi" value={accuracy} unit="%" />
          <StatCard icon={<Clock className="h-4 w-4" />} label="Waktu" value={formatTime(elapsedTime)} />
        </motion.div>
      </CardContent>
    </Card>
  );
};
export default StatsDisplay;