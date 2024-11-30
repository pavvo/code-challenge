import { describe, it, expect } from 'vitest';

import { moveInDirection } from './move';
import { type Position, Direction } from './types';

describe('moveInDirection', () => {
  const startPos: Position = { row: 1, col: 1 };

  it('should move up', () => {
    const result = moveInDirection(startPos, Direction.UP);
    expect(result).toEqual({ row: 0, col: 1 });
  });

  it('should move right', () => {
    const result = moveInDirection(startPos, Direction.RIGHT);
    expect(result).toEqual({ row: 1, col: 2 });
  });

  it('should move down', () => {
    const result = moveInDirection(startPos, Direction.DOWN);
    expect(result).toEqual({ row: 2, col: 1 });
  });

  it('should move left', () => {
    const result = moveInDirection(startPos, Direction.LEFT);
    expect(result).toEqual({ row: 1, col: 0 });
  });
});
