# sudoku-solver

Solves any valid 9x9 Sudoku in milliseconds, without dependencies.

## Usage

```
node cli.js "53..7....6..195....98....6.8...6...34..8.3..17...2...6.6....28....419..5....8..79"
```

Puzzles are 81 characters, read row by row, with `.` or `0` for blanks.
Whitespace and `|`/`-` separators are ignored, so you can paste a grid.
