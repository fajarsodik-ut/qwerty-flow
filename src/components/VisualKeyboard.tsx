import React from 'react';
import { cn } from '@/lib/utils';
import { useLessonStore } from '@/store/lessonStore';
import { motion } from 'framer-motion';
const keyLayout = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
  ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter'],
  ['ShiftLeft', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'ShiftRight'],
  [' '],
];
const shiftLayout: { [key: string]: string } = {
  '`': '~', '1': '!', '2': '@', '3': '#', '4': '$', '5': '%', '6': '^', '7': '&', '8': '*', '9': '(', '0': ')',
  '-': '_', '=': '+', '[': '{', ']': '}', '\\': '|', ';': ':', "'": '"', ',': '<', '.': '>', '/': '?',
};
const fingerMap: { [key: string]: string } = {
  // Left Hand
  '`': 'bg-pink-500/50', '1': 'bg-pink-500/50', 'q': 'bg-pink-500/50', 'a': 'bg-pink-500/50', 'z': 'bg-pink-500/50',
  '2': 'bg-purple-500/50', 'w': 'bg-purple-500/50', 's': 'bg-purple-500/50', 'x': 'bg-purple-500/50',
  '3': 'bg-blue-500/50', 'e': 'bg-blue-500/50', 'd': 'bg-blue-500/50', 'c': 'bg-blue-500/50',
  '4': 'bg-green-500/50', 'r': 'bg-green-500/50', 'f': 'bg-green-500/50', 'v': 'bg-green-500/50',
  '5': 'bg-green-500/50', 't': 'bg-green-500/50', 'g': 'bg-green-500/50', 'b': 'bg-green-500/50',
  // Right Hand
  '6': 'bg-yellow-500/50', 'y': 'bg-yellow-500/50', 'h': 'bg-yellow-500/50', 'n': 'bg-yellow-500/50',
  '7': 'bg-yellow-500/50', 'u': 'bg-yellow-500/50', 'j': 'bg-yellow-500/50', 'm': 'bg-yellow-500/50',
  '8': 'bg-orange-500/50', 'i': 'bg-orange-500/50', 'k': 'bg-orange-500/50', ',': 'bg-orange-500/50',
  '9': 'bg-red-500/50', 'o': 'bg-red-500/50', 'l': 'bg-red-500/50', '.': 'bg-red-500/50',
  '0': 'bg-pink-500/50', 'p': 'bg-pink-500/50', ';': 'bg-pink-500/50', '/': 'bg-pink-500/50',
  '-': 'bg-pink-500/50', '[': 'bg-pink-500/50', "'": 'bg-pink-500/50',
  '=': 'bg-pink-500/50', ']': 'bg-pink-500/50', '\\': 'bg-pink-500/50',
  ' ': 'bg-gray-500/50',
  'shiftleft': 'bg-pink-500/50', 'shiftright': 'bg-pink-500/50',
};
const keyWidths: { [key: string]: string } = {
  'Backspace': 'flex-grow-[2]',
  'Tab': 'flex-grow-[1.5]',
  'CapsLock': 'flex-grow-[1.7]',
  'Enter': 'flex-grow-[2.2]',
  'ShiftLeft': 'flex-grow-[2.5]',
  'ShiftRight': 'flex-grow-[2.5]',
  ' ': 'flex-grow-[8]',
};
const keyDisplayNames: { [key: string]: string } = {
    'ShiftLeft': 'Shift',
    'ShiftRight': 'Shift',
    ' ': 'Spasi'
};
const Key: React.FC<{ char: string; isNext: boolean }> = ({ char, isNext }) => {
  const baseClass = fingerMap[char.toLowerCase()] || 'bg-gray-500/20';
  const keyDisplay = keyDisplayNames[char] || char;
  return (
    <motion.div
      animate={isNext ? { scale: [1, 1.1, 1], y: [0, -5, 0] } : {}}
      transition={isNext ? { duration: 0.8, repeat: Infinity, ease: "easeInOut" } : {}}
      className={cn(
        'relative h-8 sm:h-10 flex-1 flex items-center justify-center rounded-md transition-all duration-150 text-xs sm:text-sm',
        isNext ? 'bg-blue-500 text-white' : 'bg-card border',
        keyWidths[char]
      )}
    >
      <div className={cn("absolute inset-0 rounded-md", baseClass)}></div>
      <span className="relative z-10 font-medium capitalize">{keyDisplay}</span>
    </motion.div>
  );
};
const VisualKeyboard: React.FC = () => {
  const text = useLessonStore((s) => s.text);
  const cursor = useLessonStore((s) => s.cursor);
  const status = useLessonStore((s) => s.status);
  const nextChar = status !== 'finished' ? text[cursor] : null;
  const isShiftNeeded = nextChar ? /[A-Z!@#$%^&*()_+{}|:"<>?]/.test(nextChar) : false;
  const getNextKey = () => {
    if (!nextChar) return null;
    if (nextChar === ' ') return ' ';
    const shiftedKey = Object.keys(shiftLayout).find(key => shiftLayout[key] === nextChar);
    if (shiftedKey) return shiftedKey;
    return nextChar.toLowerCase();
  }
  const nextKey = getNextKey();
  return (
    <div className="space-y-1 sm:space-y-1.5 p-2 sm:p-3 bg-muted/50 dark:bg-muted/20 rounded-lg max-w-4xl mx-auto">
      {keyLayout.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-1 sm:gap-1.5">
          {row.map((char) => {
            const isNext = nextKey === char || (isShiftNeeded && (char === 'ShiftLeft' || char === 'ShiftRight'));
            return <Key key={char} char={char} isNext={isNext} />;
          })}
        </div>
      ))}
    </div>
  );
};
export default VisualKeyboard;