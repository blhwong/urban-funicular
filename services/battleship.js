class BattleShip {
  constructor(ships, boardSize = 10) {
    if (ships.length < 1) {
      throw new Error('Must have at least one ship');
    }
    if (typeof boardSize !== 'number') {
      throw new Error('Expect number to board size');
    }
    this.board = [];
    this.locations = {};
    this.shipsLeft = ships.length;

    this.initializeBoard(ships, boardSize);
  }

  getLocation(row, col) {
    const errors = [];
    if (typeof row !== 'number') {
      errors.push('Expect number to input row');
    }
    if (typeof col !== 'number') {
      errors.push('Expect number to input column');
    }
    if (row < 0 || row >= this.board.length) {
      errors.push('Row out of bounds');
    }
    if (col < 0 || col >= this.board[0].length) {
      errors.push('Column out of bounds');
    }
    if (errors.length > 0) {
      throw new Error(errors.join('. '));
    }
    return `[${row}, ${col}]`;
  }

  initializeBoard(ships, boardSize) {
    const emptySpace = '.';
    const cols = [];
    for (let i = 0; i < boardSize; i += 1) {
      cols.push(emptySpace);
    }

    for (let i = 0; i < boardSize; i += 1) {
      this.board.push([...cols]);
    }

    ships.forEach((ship) => {
      let { row, col } = ship;
      let count = 0;
      do {
        const location = this.getLocation(row, col);
        this.locations[location] = ship;
        if (this.board[row][col] === 'S') {
          throw new Error(`Location ${location} is colliding with another ship!`);
        }
        if (this.board[row][col] !== '.') {
          throw new Error(`Invalid location ${location}`);
        }
        this.board[row][col] = 'S';
        count += 1;
        if (ship.direction === 'vertical') {
          row += 1;
        } else if (ship.direction === 'horizontal') {
          col += 1;
        }
      } while (count < ship.size);
    });
  }

  attackAt(row, col) {
    const location = this.getLocation(row, col);
    const curr = this.board[row][col];

    if (curr !== 'A' && curr !== '.' && curr !== 'S') {
      throw new Error(`Invalid value ${curr} found at ${location}`);
    }

    if (curr === 'A') {
      return 'Already Attacked';
    }

    this.board[row][col] = 'A';

    if (curr === '.') {
      return 'Miss';
    }

    const ship = this.locations[location];
    ship.hit();
    if (ship.isSunk()) {
      this.shipsLeft -= 1;
      if (!this.shipsLeft) {
        return 'Win';
      }
      return 'Sunk';
    }
    return 'Hit';
  }
}

module.exports = BattleShip;
