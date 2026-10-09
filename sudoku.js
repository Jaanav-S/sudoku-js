'use strict';

const ALL = 0x1ff; // bits 0..8 represent digits 1..9

const UNITS = [];
for (let i = 0; i < 9; i++) {
  const row = [];
  const col = [];
  const box = [];
  for (let j = 0; j < 9; j++) {
    row.push(i * 9 + j);
    col.push(j * 9 + i);
    box.push((Math.floor(i / 3) * 3 + Math.floor(j / 3)) * 9 + (i % 3) * 3 + (j % 3));
  }
  UNITS.push(row, col, box);
}

const UNITS_OF = Array.from({ length: 81 }, (_, cell) => UNITS.filter((u) => u.includes(cell)));

const PEERS = Array.from({ length: 81 }, (_, cell) => {
  const set = new Set(UNITS_OF[cell].flat());
  set.delete(cell);
  return [...set];
});

function bitCount(mask) {
  let n = 0;
  while (mask) {
    mask &= mask - 1;
    n++;
  }
  return n;
}

function digitOf(mask) {
  return 31 - Math.clz32(mask) + 1;
}
