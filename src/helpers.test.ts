import { describe, it, expect } from 'vitest';

import { validateMap } from './helpers';

describe('validateMap', () => {
  it('should validate a correct map and return start position', () => {
    const map = [
      '  @---A---+',
      '          |',
      '  x-B-+   C',
      '      |   |',
      '      +---+',
    ];

    const startPos = validateMap(map);
    expect(startPos).toEqual({ row: 0, col: 2 });
  });

  it('should throw an error for invalid characters', () => {
    const map = [
      '  @---A---+',
      '          |',
      '  x-B-+   C',
      '      |   |',
      '      #---+', // Invalid '#' character
    ];

    expect(() => validateMap(map)).toThrow(
      "Invalid character '#' at position 4,6"
    );
  });

  it('should throw an error when no start character exists', () => {
    const map = [
      '  ----A---+',
      '          |',
      '  x-B-+   C',
      '      |   |',
      '      +---+',
    ];

    expect(() => validateMap(map)).toThrow('No start character found');
  });

  it('should throw an error when multiple start characters exist', () => {
    const map = [
      '  @---A---+',
      '          |',
      '  x-B-+   C',
      '      |   |',
      '   @   +---+', // Second '@' character
    ];

    expect(() => validateMap(map)).toThrow('Multiple start characters found');
  });

  it('should throw an error when no end character exists', () => {
    const map = [
      '  @---A---+',
      '          |',
      '  --B-+   C',
      '      |   |',
      '      +---+',
    ];

    expect(() => validateMap(map)).toThrow('No end character found');
  });

  it('should throw an error when multiple end characters exist', () => {
    const map = [
      '  @---A---+',
      '          |',
      '  x-B-+   C',
      '      |   |',
      '   x   +---+', // Second 'x' character
    ];

    expect(() => validateMap(map)).toThrow('Multiple end characters found');
  });

  it('should validate a minimal valid map', () => {
    const map = [
      '@x', // Simplest valid path
    ];

    const startPos = validateMap(map);
    expect(startPos).toEqual({ row: 0, col: 0 });
  });

  it('should handle maps with valid letter characters', () => {
    const map = [
      '  @---A---+',
      '          |',
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      '  x       |',
      '      +---+',
    ];

    const startPos = validateMap(map);
    expect(startPos).toEqual({ row: 0, col: 2 });
  });
});
