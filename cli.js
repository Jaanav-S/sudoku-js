#!/usr/bin/env node
'use strict';

const fs = require('node:fs');
const { parse, format, solve, countSolutions } = require('./sudoku');

function readPuzzle(argv) {
  if (argv.length === 0) return fs.readFileSync(0, 'utf8');
  if (fs.existsSync(argv[0])) return fs.readFileSync(argv[0], 'utf8');
  return argv.join('');
}

function main() {
  let grid;
  try {
    grid = parse(readPuzzle(process.argv.slice(2)));
  } catch (err) {
    console.error(`error: ${err.message}`);
    process.exit(2);
  }

  const started = process.hrtime.bigint();
  const solution = solve(grid);
  const ms = Number(process.hrtime.bigint() - started) / 1e6;

  if (!solution) {
    console.log('No solution.');
    process.exit(1);
  }
  console.log(format(solution));
  console.log(`\nSolved in ${ms.toFixed(2)} ms`);
  if (countSolutions(grid, 2) > 1) {
    console.log('Note: this puzzle has more than one solution.');
  }
}

main();
