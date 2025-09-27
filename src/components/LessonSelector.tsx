import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { useLessonStore } from '@/store/lessonStore';
import { lessons } from '@/lib/lessons';
import { Level } from '@/types';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
const LessonSelector: React.FC = () => {
  const level = useLessonStore((s) => s.level);
  const lessonIndex = useLessonStore((s) => s.lessonIndex);
  const setLesson = useLessonStore((s) => s.setLesson);
  const handleLevelChange = (newLevel: string) => {
    setLesson(newLevel as Level, 0);
  };
  return (
    <Tabs value={level} onValueChange={handleLevelChange} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="easy">Easy</TabsTrigger>
        <TabsTrigger value="medium">Medium</TabsTrigger>
        <TabsTrigger value="hard">Hard</TabsTrigger>
      </TabsList>
      {(['easy', 'medium', 'hard'] as Level[]).map((lvl) => (
        <TabsContent key={lvl} value={lvl}>
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-wrap gap-2">
                {lessons[lvl].map((_, index) => (
                  <Button
                    key={`${lvl}-${index}`}
                    variant={level === lvl && lessonIndex === index ? 'default' : 'outline'}
                    onClick={() => setLesson(lvl, index)}
                    className={cn(
                      "transition-all duration-200",
                      level === lvl && lessonIndex === index && "ring-2 ring-blue-500 ring-offset-2 ring-offset-background"
                    )}
                  >
                    Lesson {index + 1}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
};
export default LessonSelector;