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

test('parse rejects the wrong length', () => {
  assert.throws(() => parse('123'));
});

test('solves an easy puzzle', () => {
  const solution = solve(parse(EASY));
  assert.ok(isSolved(solution));
  assert.strictEqual(solution.slice(0, 9).join(''), '534678912');
});

test('solves a hard puzzle', () => {
  assert.ok(isSolved(solve(parse(HARD))));
});

test('keeps the given clues', () => {
  const grid = parse(EASY);
  const solution = solve(grid);
  grid.forEach((d, i) => d && assert.strictEqual(solution[i], d));
});

test('detects contradictions', () => {
  const bad = parse('55' + '.'.repeat(79));
  assert.strictEqual(solve(bad), null);
});
