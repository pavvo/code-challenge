import { validateMap } from './helpers';

import type { Path } from './types';

export function findPath(map: Array<string>): Path {
  // Get the start position and validate the map
  const startPos = validateMap(map);

  console.log(`Start position: ${startPos.row}, ${startPos.col}`);

  return {
    letters: '',
    path: '',
  };
}
