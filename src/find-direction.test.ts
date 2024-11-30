import { describe, it, expect } from 'vitest';

import { findNewDirection } from './find-direction';

import { type Position, Direction } from './types';

describe('findNewDirection', () => {
  it('should find new direction at a turn', () => {
    const map = ['@--+', '   |', '   x'];
    const pos: Position = { row: 0, col: 3 };

    expect(findNewDirection(map, pos, Direction.RIGHT)).toBe(Direction.DOWN);
  });

  it('should find new direction with letter after turn', () => {
    const map = ['@--+', '   A', '   x'];
    const pos: Position = { row: 0, col: 3 };

    expect(findNewDirection(map, pos, Direction.RIGHT)).toBe(Direction.DOWN);
  });

  it('should detect invalid path at turn', () => {
    const map = ['@--+', '    ', '    '];
    const pos: Position = { row: 0, col: 3 };

    expect(() => findNewDirection(map, pos, Direction.RIGHT)).toThrow(
      'Invalid path: no valid direction found'
    );
  });
});
