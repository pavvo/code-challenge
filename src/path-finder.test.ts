import { describe, it, expect } from 'vitest';

import { findPath } from './path-finder';

describe('path finder', () => {
  it('should solve basic horizontal path', () => {
    const map = ['@--A--x'];

    const result = findPath(map);

    expect(result).toEqual({
      letters: 'A',
      path: '@--A--x',
    });
  });
});
