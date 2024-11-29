import { VALID_CHARACTERS } from './constants';

import { type Position } from './types';

export function validateMap(map: Array<string>): Position {
  let startCount = 0;
  let endCount = 0;
  let startPos: Position = { row: 0, col: 0 };

  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      const char = map[row][col];

      // Check if character is valid
      if (!VALID_CHARACTERS.has(char)) {
        throw new Error(
          `Invalid character '${char}' at position ${row},${col}`
        );
      }

      // If character is '@', increment start count and save position
      if (char === '@') {
        startCount++;
        startPos = { row, col };
      }

      // If character is 'x', increment end count
      if (char === 'x') {
        endCount++;
      }
    }
  }

  if (startCount === 0) throw new Error('No start character found');
  if (startCount > 1) throw new Error('Multiple start characters found');

  if (endCount === 0) throw new Error('No end character found');
  if (endCount > 1) throw new Error('Multiple end characters found');

  return startPos;
}
