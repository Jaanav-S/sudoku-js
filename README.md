# sudoku-solver

Solves any valid 9x9 Sudoku in milliseconds, without dependencies.

## Usage

```
node cli.js "53..7....6..195....98....6.8...6...34..8.3..17...2...6.6....28....419..5....8..79"
```

Puzzles are 81 characters, read row by row, with `.` or `0` for blanks.
Whitespace and `|`/`-` separators are ignored, so you can paste a grid.

## Algorithm

Each cell keeps a 9-bit mask of the digits it could still hold.

1. **Propagation.** Placing a digit removes it from every peer (same row,
   column or box). A cell left with one candidate is filled in, which can
   cascade. A unit where a digit fits in only one cell gets it placed there
   ("hidden single").
2. **Search.** When propagation stalls, pick the empty cell with the fewest
   candidates and try each one on a copy of the board, recursing until it
   is solved or a contradiction appears.

Most newspaper puzzles are solved by propagation alone.

## Uniqueness

`countSolutions(grid, 2)` stops after finding two solutions, which is a
cheap way to check that a puzzle has exactly one answer.
