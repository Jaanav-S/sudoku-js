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

function parse(text) {
  const chars = text.replace(/[\s|+-]/g, '');
  if (chars.length !== 81) {
    throw new Error(`expected 81 cells, got ${chars.length}`);
  }
  return [...chars].map((c) => {
    if (c === '.' || c === '0') return 0;
    const d = Number(c);
    if (!Number.isInteger(d) || d < 1 || d > 9) throw new Error(`bad cell: ${c}`);
    return d;
  });
}

function format(grid) {
  const lines = [];
  for (let r = 0; r < 9; r++) {
    if (r && r % 3 === 0) lines.push('------+-------+------');
    const cells = grid.slice(r * 9, r * 9 + 9).map((d) => (d ? String(d) : '.'));
    lines.push([cells.slice(0, 3), cells.slice(3, 6), cells.slice(6)].map((g) => g.join(' ')).join(' | '));
  }
  return lines.join('\n');
}

// Remove `digitMask` from a cell's candidates and propagate. Returns false on contradiction.
function eliminate(cands, cell, digitMask) {
  if (!(cands[cell] & digitMask)) return true;
  cands[cell] &= ~digitMask;
  const left = cands[cell];
  if (left === 0) return false;
  if (bitCount(left) === 1) {
    for (const peer of PEERS[cell]) {
      if (!eliminate(cands, peer, left)) return false;
    }
  }
  for (const unit of UNITS_OF[cell]) {
    const places = unit.filter((c) => cands[c] & digitMask);
    if (places.length === 0) return false;
    if (places.length === 1 && !assign(cands, places[0], digitMask)) return false;
  }
  return true;
}
