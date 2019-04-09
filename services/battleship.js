class BattleShip {
  static getLocation(row, col) {
    return `[${row}, ${col}]`;
  }

  constructor(ships, boardSize = 10) {
    const emptySpace = '.';
    const cols = [];
    for (let i = 0; i < boardSize; i += 1) {
      cols.push(emptySpace);
    }

    this.board = [];
    this.locations = {};
    this.shipsLeft = ships.length;

    for (let i = 0; i < boardSize; i += 1) {
      this.board.push([...cols]);
    }

    ships.forEach((ship) => {
      let { row, col } = ship;
      let count = 0;
      do {
        const location = BattleShip.getLocation(row, col);
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
    if (this.board[row][col] === '.') {
      this.board[row][col] = 'A';
      return 'Miss';
    }
    if (this.board[row][col] === 'S') {
      this.board[row][col] = 'A';
      const location = BattleShip.getLocation(row, col);
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
    if (this.board[row][col] === 'A') {
      return 'Already Attacked';
    }
    return '';
  }
}

module.exports = BattleShip;
