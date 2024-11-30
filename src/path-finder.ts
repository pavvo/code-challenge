import { validateInBounds, validateMap } from './helpers';

import { findInitialDirection } from './initial-direction';

import { findNewDirection } from './find-direction';

import { moveInDirection } from './move';

import type { Path } from './types';

export function findPath(map: Array<string>): Path {
  const startPos = validateMap(map);
  let direction = findInitialDirection(map, startPos);

  let currentPos = startPos;
  let letters = new Set();
  let path = '@';

  while (true) {
    const nextPos = moveInDirection(currentPos, direction);
    validateInBounds(nextPos, map);

    const char = map[nextPos.row][nextPos.col];
    path += char;

    if (char === 'x') {
      return { letters: [...letters].join('').toString(), path };
    }

    if (/[A-Z]/.test(char)) {
      if (!letters.has(char)) {
        letters = letters.add(char);
      }
      direction = findNewDirection(map, nextPos, direction);
    } else if (char === '+') {
      direction = findNewDirection(map, nextPos, direction);
    }

    currentPos = nextPos;
  }
}
