import { Direction, type Position } from './types';

export function moveInDirection(pos: Position, direction: Direction): Position {
  switch (direction) {
    case Direction.UP:
      return { row: pos.row - 1, col: pos.col };
    case Direction.RIGHT:
      return { row: pos.row, col: pos.col + 1 };
    case Direction.DOWN:
      return { row: pos.row + 1, col: pos.col };
    case Direction.LEFT:
      return { row: pos.row, col: pos.col - 1 };
  }
}
