const handleErrors = require('../util/handleErrors');

class Ship {
  constructor(row, col, size, direction) {
    const errors = [];
    if (typeof row !== 'number') {
      errors.push('Expect number to input row');
    }
    if (typeof col !== 'number') {
      errors.push('Expect number to input column');
    }
    if (typeof size !== 'number') {
      errors.push('Expect number to input size');
    }
    if (size > 1 && (direction !== 'vertical' && direction !== 'horizontal')) {
      errors.push('Direction must be vertical or horizontal');
    }
    if (row < 0) {
      errors.push('Row out of bounds');
    }
    if (col < 0) {
      errors.push('Column out of bounds');
    }
    handleErrors(errors);

    this.row = row;
    this.col = col;
    this.size = size;
    this.direction = direction;
    this.hits = 0;
  }

  hit() {
    if (this.hits >= this.size) {
      throw new Error('Ship has already sunk');
    }
    this.hits += 1;
  }

  isSunk() {
    return this.hits >= this.size;
  }
}

module.exports = Ship;
