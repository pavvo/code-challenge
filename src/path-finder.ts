import { validateInBounds, validateMap } from './helpers';

import { findInitialDirection } from './initial-direction';

import { moveInDirection } from './move';

import type { Path } from './types';

export function findPath(map: Array<string>): Path {
  const startPos = validateMap(map);
  const initialDirection = findInitialDirection(map, startPos);

  let currentPos = startPos;
  let letters = '';
  let path = '@';

  while (true) {
    const nextPos = moveInDirection(currentPos, initialDirection);

    validateInBounds(nextPos, map);

    const char = map[nextPos.row][nextPos.col];
    path += char;

    if (char === 'x') {
      return { letters, path };
    }

    if (/[A-Z]/.test(char)) {
      letters += char;
    }

    currentPos = nextPos;
  }
}
