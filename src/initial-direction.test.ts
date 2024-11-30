import { describe, it, expect } from 'vitest';

import { findInitialDirection } from './initial-direction';

import { type Position, Direction } from './types';

describe('findInitialDirection', () => {
  it('should determine RIGHT direction when path starts horizontally to the right', () => {
    const map = ['@---A', '     ', '  x  '];
    const startPos: Position = { row: 0, col: 0 };

    expect(findInitialDirection(map, startPos)).toBe(Direction.RIGHT);
  });

  it('should determine DOWN direction when path starts vertically downward', () => {
    const map = ['  @  ', '  |  ', '  x  '];
    const startPos: Position = { row: 0, col: 2 };

    expect(findInitialDirection(map, startPos)).toBe(Direction.DOWN);
  });

  it('should determine direction when starting with a letter', () => {
    const map = ['@A---', '     ', '  x  '];
    const startPos: Position = { row: 0, col: 0 };

    expect(findInitialDirection(map, startPos)).toBe(Direction.RIGHT);
  });

  it('should throw error for fork at start with turn', () => {
    const map = ['@+---', '|    ', 'x    '];
    const startPos: Position = { row: 0, col: 0 };

    expect(() => findInitialDirection(map, startPos)).toThrow(
      'Fork in path: multiple valid directions found from start'
    );
  });

  it('should throw error when multiple valid directions exist', () => {
    const map = [' | ', '-@-', ' | '];
    const startPos: Position = { row: 1, col: 1 };

    expect(() => findInitialDirection(map, startPos)).toThrow(
      'Fork in path: multiple valid directions found from start'
    );
  });

  it('should throw error when no valid direction exists', () => {
    const map = ['   ', ' @ ', '   '];
    const startPos: Position = { row: 1, col: 1 };

    expect(() => findInitialDirection(map, startPos)).toThrow(
      'Broken path: no valid direction found from start'
    );
  });
});
