'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { parse, format, solve, countSolutions, isSolved, PEERS } = require('./sudoku');

const EASY = '53..7....6..195....98....6.8...6...34..8.3..17...2...6.6....28....419..5....8..79';
const HARD = '8..........36......7..9.2...5...7.......457.....1...3...1....68..85...1..9....4..';

test('every cell has 20 peers', () => {
  assert.ok(PEERS.every((p) => p.length === 20));
});

test('parse accepts dots, zeros and separators', () => {
  const grid = parse(EASY.replace(/\./g, '0'));
  assert.strictEqual(grid.length, 81);
  assert.deepStrictEqual(parse(format(grid)), grid);
});
