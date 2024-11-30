import { describe, it, expect } from 'vitest';

import { findPath } from './path-finder';

describe('path finder', () => {
  describe('valid maps', () => {
    it('should solve basic example', () => {
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

    it('should go straight through intersections', () => {
      const map = [
        '  @',
        '  | +-C--+',
        '  A |    |',
        '  +---B--+',
        '    |      x',
        '    |      |',
        '    +---D--+',
      ];

      expect(findPath(map)).toEqual({
        letters: 'ABCD',
        path: '@|A+---B--+|+--C-+|-||+---D--+|x',
      });
    });

    it('should handle letters on turns', () => {
      const map = [
        '  @---A---+',
        '          |',
        '  x-B-+   |',
        '      |   |',
        '      +---C',
      ];

      expect(findPath(map)).toEqual({
        letters: 'ACB',
        path: '@---A---+|||C---+|+-B-x',
      });
    });

    it('should not collect letter from same location twice', () => {
      const map = [
        '     +-O-N-+',
        '     |     |',
        '     |   +-I-+',
        ' @-G-O-+ | | |',
        '     | | +-+ E',
        '     +-+     S',
        '             |',
        '             x',
      ];

      expect(findPath(map)).toEqual({
        letters: 'GONIES',
        path: '@-G-O-+|+-+|O||+-O-N-+|I|+-+|+-I-+|ES|x',
      });
    });

    it('should keep direction in compact space', () => {
      const map = [' +-L-+', ' |  +A-+', '@B+ ++ H', ' ++    x'];

      expect(findPath(map)).toEqual({
        letters: 'BLAH',
        path: '@B+++B|+-L-+A+++A-+Hx',
      });
    });

    it('should ignore stuff after end of path', () => {
      const map = ['  @-A--+', '       |', '       +-B--x-C--D'];

      expect(findPath(map)).toEqual({
        letters: 'AB',
        path: '@-A--+|+-B--x',
      });
    });
  });

  describe('invalid maps', () => {
    it('should detect missing start character', () => {
      const map = [
        '     -A---+',
        '          |',
        '  x-B-+   C',
        '      |   |',
        '      +---+',
      ];

      expect(() => findPath(map)).toThrow('No start character found');
    });

    it('should detect missing end character', () => {
      const map = [
        '   @--A---+',
        '          |',
        '    B-+   C',
        '      |   |',
        '      +---+',
      ];

      expect(() => findPath(map)).toThrow('No end character found');
    });

    it('should detect multiple starts (case 1)', () => {
      const map = [
        '   @--A-@-+',
        '          |',
        '  x-B-+   C',
        '      |   |',
        '      +---+',
      ];

      expect(() => findPath(map)).toThrow('Multiple start characters found');
    });

    it('should detect multiple starts (case 2)', () => {
      const map = [
        '   @--A---+',
        '          |',
        '          C',
        '          x',
        '      @-B-+',
      ];

      expect(() => findPath(map)).toThrow('Multiple start characters found');
    });

    it('should detect multiple starts (case 3)', () => {
      const map = ['   @--A--x', '', '  x-B-+', '      |', '      @'];

      expect(() => findPath(map)).toThrow('Multiple start characters found');
    });

    it('should detect fork in path', () => {
      const map = [
        '        x-B',
        '          |',
        '   @--A---+',
        '          |',
        '      +   C',
        '      |   |',
        '      +---+',
      ];

      expect(() => findPath(map)).toThrow(
        'Fork in path: multiple valid directions found'
      );
    });

    it('should detect broken path', () => {
      const map = ['   @--A-+', '        |', '        ', '        B-x'];

      expect(() => findPath(map)).toThrow('Path leads out of bounds');
    });

    it('should detect multiple starting paths', () => {
      const map = ['x-B-@-A-@'];

      expect(() => findPath(map)).toThrow('Multiple start characters found');
    });

    it('should detect fake turn', () => {
      const map = ['  @-A-+-B-x'];

      expect(() => findPath(map)).toThrow(
        'Invalid path: no valid direction found'
      );
    });
  });
});
