import { describe, it, expect } from 'vitest';

import { findPath } from './path-finder';

describe('path finder', () => {
  it('should solve basic horizontal path', () => {
    const map = ['@--A--x'];

    expect(findPath(map)).toEqual({
      letters: 'A',
      path: '@--A--x',
    });
  });

  it('should solve path with turns', () => {
    const map = ['@--A--+', '      |', 'x-----+'];

    expect(findPath(map)).toEqual({
      letters: 'A',
      path: '@--A--+|+-----x',
    });
  });

  it('should solve path with multiple turns and letters', () => {
    const map = [
      '  @---A---+',
      '          |',
      '  x-B-+   C',
      '      |   |',
      '      +---+',
    ];

    expect(findPath(map)).toEqual({
      letters: 'ACB',
      path: '@---A---+|C|+---+|+-B-x',
    });
  });

  it('should handle no letters in path', () => {
    const map = ['@--+', '   |', '   x'];

    expect(findPath(map)).toEqual({
      letters: '',
      path: '@--+|x',
    });
  });
});
