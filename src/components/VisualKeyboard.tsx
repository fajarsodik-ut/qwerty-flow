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
  '`': 'bg-pink-500/20', '1': 'bg-pink-500/20', 'q': 'bg-pink-500/20', 'a': 'bg-pink-500/20', 'z': 'bg-pink-500/20',
  '2': 'bg-purple-500/20', 'w': 'bg-purple-500/20', 's': 'bg-purple-500/20', 'x': 'bg-purple-500/20',
  '3': 'bg-blue-500/20', 'e': 'bg-blue-500/20', 'd': 'bg-blue-500/20', 'c': 'bg-blue-500/20',
  '4': 'bg-green-500/20', 'r': 'bg-green-500/20', 'f': 'bg-green-500/20', 'v': 'bg-green-500/20',
  '5': 'bg-green-500/20', 't': 'bg-green-500/20', 'g': 'bg-green-500/20', 'b': 'bg-green-500/20',
  // Right Hand
  '6': 'bg-yellow-500/20', 'y': 'bg-yellow-500/20', 'h': 'bg-yellow-500/20', 'n': 'bg-yellow-500/20',
  '7': 'bg-yellow-500/20', 'u': 'bg-yellow-500/20', 'j': 'bg-yellow-500/20', 'm': 'bg-yellow-500/20',
  '8': 'bg-orange-500/20', 'i': 'bg-orange-500/20', 'k': 'bg-orange-500/20', ',': 'bg-orange-500/20',
  '9': 'bg-red-500/20', 'o': 'bg-red-500/20', 'l': 'bg-red-500/20', '.': 'bg-red-500/20',
  '0': 'bg-pink-500/20', 'p': 'bg-pink-500/20', ';': 'bg-pink-500/20', '/': 'bg-pink-500/20',
  '-': 'bg-pink-500/20', '[': 'bg-pink-500/20', "'": 'bg-pink-500/20',
  '=': 'bg-pink-500/20', ']': 'bg-pink-500/20', '\\': 'bg-pink-500/20',
  ' ': 'bg-gray-500/20',
  'shiftleft': 'bg-pink-500/20', 'shiftright': 'bg-pink-500/20',
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
    ' ': 'Space'
};
const Key: React.FC<{ char: string; isNext: boolean }> = ({ char, isNext }) => {
  const baseClass = fingerMap[char.toLowerCase()] || 'bg-gray-500/20';
  const keyDisplay = keyDisplayNames[char] || char;
  return (
    <motion.div
      animate={isNext ? { scale: [1, 1.1, 1], y: [0, -5, 0] } : {}}
      transition={isNext ? { duration: 0.8, repeat: Infinity, ease: "easeInOut" } : {}}
      className={cn(
        'relative h-10 sm:h-12 flex-1 flex items-center justify-center rounded-md transition-all duration-150 text-xs sm:text-base',
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
    <div className="space-y-1.5 sm:space-y-2 p-2 sm:p-4 bg-muted/50 dark:bg-muted/20 rounded-lg">
      {keyLayout.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-1.5 sm:gap-2">
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