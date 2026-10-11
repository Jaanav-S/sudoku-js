#!/usr/bin/env node
'use strict';

const fs = require('node:fs');
const { parse, format, solve, countSolutions } = require('./sudoku');

function readPuzzle(argv) {
  if (argv.length === 0) return fs.readFileSync(0, 'utf8');
  if (fs.existsSync(argv[0])) return fs.readFileSync(argv[0], 'utf8');
  return argv.join('');
}
