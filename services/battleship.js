class BattleShip {
  constructor(board) {
    this.size = 10;
    if (board.length !== this.size || !board.every(b => b.length === this.size)) {
      throw new Error('Bad board input');
    }
    this.board = board.map(b => [...b]);
  }

  attackAt(row, column) {
    if (this.board[row][column] === '.') {
      this.board[row][column] = 'A';
      return 'Miss';
    }
    if (this.board[row][column] === 'S') {
      this.board[row][column] = 'A';
      return 'Hit';
    }
    if (this.board[row][column] === 'A') {
      return 'Already Attacked';
    }
    return '';
  }
}

module.exports = BattleShip;
