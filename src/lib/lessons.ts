import type { Level } from '@/types';
export const lessons: Record<Level, string[]> = {
  easy: [
    'asdf jkl;',
    'sad ask fall dad;',
    'jkl; asdf',
    'fad; a lad; a flask;',
    'ask a sad lad; fall;',
    'all fall; ask a sad lad;',
  ],
  medium: [
    'The quick brown fox jumps over the lazy dog.',
    'Capitalization is important for proper nouns like London.',
    'Practice makes perfect, so keep typing every day.',
    'She sells seashells by the seashore, and he sells cars.',
    'The early bird catches the worm, but the second mouse gets the cheese.',
    'To be or not to be, that is the question.',
  ],
  hard: [
    'The project\'s API (version 2.1) uses OAuth2 for authentication, requiring a client_id & a secret key!',
    'My IP address is 192.168.1.1, and the subnet mask is 255.255.255.0.',
    'Use `const array = [1, 2, 3];` to declare an array in JavaScript.',
    'The final cost was $1,234.56 (a 15% increase!), which was unexpected.',
    'She exclaimed, "What?! I can\'t believe this happened @ 3:00 PM." #shocked',
    'The complex query is: SELECT * FROM users WHERE id IN (1, 5, 10) AND created_at > \'2023-01-01\';',
  ],
};