import { VALID_CHARACTERS } from './constants';

import { Direction, type Position } from './types';

function isValidPathCharacter(char: string, isVertical: boolean): boolean {
  if (!VALID_CHARACTERS.has(char)) return false;

  const isValidDirectionalChar = isVertical ? char === '|' : char === '-';
  return isValidDirectionalChar || char === '+' || /[A-Z]/.test(char);
}

export function findInitialDirection(
  map: Array<string>,
  startPos: Position
): Direction {
  const validDirections: Array<Direction> = [];

  // Check right direction
  if (startPos.col + 1 < map[startPos.row].length) {
    const rightChar = map[startPos.row][startPos.col + 1];
    if (isValidPathCharacter(rightChar, false)) {
      validDirections.push(Direction.RIGHT);
    }
  }

  // Check left direction
  if (startPos.col > 0) {
    const leftChar = map[startPos.row][startPos.col - 1];
    if (isValidPathCharacter(leftChar, false)) {
      validDirections.push(Direction.LEFT);
    }
  }

  // Check down direction
  if (startPos.row + 1 < map.length) {
    const downChar = map[startPos.row + 1][startPos.col];
    if (isValidPathCharacter(downChar, true)) {
      validDirections.push(Direction.DOWN);
    }
  }

  // Check up direction
  if (startPos.row > 0) {
    const upChar = map[startPos.row - 1][startPos.col];
    if (isValidPathCharacter(upChar, true)) {
      validDirections.push(Direction.UP);
    }
  }

  if (validDirections.length === 0) {
    throw new Error('Broken path: no valid direction found from start');
  }

  if (validDirections.length > 1) {
    throw new Error('Fork in path: multiple valid directions found from start');
  }

  return validDirections[0];
}
