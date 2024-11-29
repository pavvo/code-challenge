import { validateCharacters } from './helpers';

import type { Path } from './types';

export function findPath(map: Array<string>): Path {
  validateCharacters(map);

  return {
    letters: '',
    path: '',
  };
}
