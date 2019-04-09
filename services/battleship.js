class BattleShip {
  static getLocation(row, col) {
    return `[${row}, ${col}]`;
  }

  constructor(ships, boardSize = 10) {
    this.board = [];
    this.locations = {};
    this.shipsLeft = ships.length;

    this.initializeBoard(ships, boardSize);
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
    const curr = this.board[row][col];
    const location = BattleShip.getLocation(row, col);

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
