import { validateInBounds, validateMap } from './helpers';

import { findInitialDirection } from './initial-direction';

import { findNewDirection } from './find-direction';

import { moveInDirection } from './move';

import type { Path } from './types';

export function findPath(map: Array<string>): Path {
  const startPos = validateMap(map);
  let direction = findInitialDirection(map, startPos);

  let currentPos = startPos;
  let letters = '';
  let path = '@';

  while (true) {
    const nextPos = moveInDirection(currentPos, direction);
    validateInBounds(nextPos, map);

    const char = map[nextPos.row][nextPos.col];
    path += char;

    if (char === 'x') {
      return { letters, path };
    }

    if (/[A-Z]/.test(char)) {
      letters += char;
    } else if (char === '+') {
      direction = findNewDirection(map, nextPos, direction);
    }

    currentPos = nextPos;
  }
}
