import { VALID_CHARACTERS } from './constants';

export function validateCharacters(map: Array<string>): void {
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      const char = map[row][col];

      // Check if character is valid
      if (!VALID_CHARACTERS.has(char)) {
        throw new Error(
          `Invalid character '${char}' at position ${row},${col}`
        );
      }
    }
  }
}
