import { VALID_CHARACTERS } from './constants';

import { moveInDirection } from './move';

import { validateInBounds } from './helpers';

import { type Position, Direction } from './types';

export function findNewDirection(
  map: Array<string>,
  pos: Position,
  currentDirection: Direction
): Direction {
  const possibleDirections = [
    Direction.UP,
    Direction.RIGHT,
    Direction.DOWN,
    Direction.LEFT,
  ];

  const validDirections = possibleDirections.filter(dir => {
    // Skip checking the direction we came from
    if (dir === getOppositeDirection(currentDirection)) return false;

    try {
      const nextPos = moveInDirection(pos, dir);
      validateInBounds(nextPos, map);
      const char = map[nextPos.row][nextPos.col];
      return isValidNextChar(char, dir);
    } catch {
      // If any function throws an error, return false
      return false;
    }
  });

  if (validDirections.length === 0) {
    throw new Error('Broken path: no valid direction found from start');
  }

  if (validDirections.length > 1) {
    throw new Error('Fork in path: multiple valid directions found from start');
  }

  return validDirections[0];
}

function isValidNextChar(char: string, direction: Direction): boolean {
  if (!VALID_CHARACTERS.has(char)) return false;

  if (/[A-Z]/.test(char) || char === '+' || char === 'x') return true;

  return direction === Direction.UP || direction === Direction.DOWN
    ? char === '|'
    : char === '-';
}

function getOppositeDirection(direction: Direction): Direction {
  switch (direction) {
    case Direction.UP:
      return Direction.DOWN;
    case Direction.DOWN:
      return Direction.UP;
    case Direction.LEFT:
      return Direction.RIGHT;
    case Direction.RIGHT:
      return Direction.LEFT;
  }
}
