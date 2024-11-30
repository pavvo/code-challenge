import { validateMap } from './helpers';

import { findInitialDirection } from './initial-direction';

import type { Path } from './types';

export function findPath(map: Array<string>): Path {
  // Get the start position and validate the map
  const startPos = validateMap(map);

  const initialDirection = findInitialDirection(map, startPos);

  console.log(`Initial direction: ${initialDirection}`);

  return {
    letters: '',
    path: '',
  };
}
