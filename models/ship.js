class Ship {
  constructor(row, col, size, direction) {
    this.row = row;
    this.col = col;
    this.size = size;
    this.direction = direction;
    this.hits = 0;
  }

  hit() {
    this.hits += 1;
  }

  isSunk() {
    return this.hits >= this.size;
  }
}

module.exports = Ship;
