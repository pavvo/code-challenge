import { describe, it, expect } from 'vitest';

import { findPath } from './path-finder';

describe('path finder', () => {
  it('should return an empty path when the map is empty', () => {
    const map = [];

    const path = findPath(map);

    expect(path).toEqual({
      letters: '',
      path: '',
    });
  });

  it('should validate the map characters', () => {
    const map = [
      '  @---A---+',
      '          |',
      '  x-B-+   C',
      '      |   |',
      '      +---+',
    ];

    expect(() => findPath(map)).not.toThrow();
  });

  it('should throw an error if the map contains an invalid character', () => {
    const map = [
      '  @---A---+',
      '          |',
      '  x-B-+   C',
      '      |   |',
      '      +---+',
      '          #',
    ];

    expect(() => findPath(map)).toThrow(
      "Invalid character '#' at position 5,10"
    );
  });
});
