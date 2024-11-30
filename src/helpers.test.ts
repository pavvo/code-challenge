import { describe, it, expect } from 'vitest';

import { validateInBounds, validateMap } from './helpers';

import { type Position } from './types';

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

describe('validateInBounds', () => {
  const map = ['@--x', '    ', '    '];

  it('should not throw for valid position', () => {
    const pos: Position = { row: 0, col: 0 };
    expect(() => validateInBounds(pos, map)).not.toThrow();
  });

  it('should throw for negative row', () => {
    const pos: Position = { row: -1, col: 0 };
    expect(() => validateInBounds(pos, map)).toThrow(
      'Path leads out of bounds'
    );
  });

  it('should throw for row beyond bounds', () => {
    const pos: Position = { row: 3, col: 0 };
    expect(() => validateInBounds(pos, map)).toThrow(
      'Path leads out of bounds'
    );
  });

  it('should throw for negative column', () => {
    const pos: Position = { row: 0, col: -1 };
    expect(() => validateInBounds(pos, map)).toThrow(
      'Path leads out of bounds'
    );
  });

  it('should throw for column beyond bounds', () => {
    const pos: Position = { row: 0, col: 4 };
    expect(() => validateInBounds(pos, map)).toThrow(
      'Path leads out of bounds'
    );
  });
});
