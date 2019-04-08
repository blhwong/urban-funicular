const { expect } = require('chai');
const BattleShipService = require('../../services/battleship');

describe('Battleship service', () => {
  const board = [
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', 'S', '.', '.', '.', '.', '.', '.', '.', 'S'],
    ['.', 'S', '.', 'S', '.', '.', '.', '.', '.', 'S'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', 'S'],
    ['.', '.', '.', 'S', 'S', '.', '.', 'S', '.', 'S'],
    ['.', '.', '.', '.', '.', '.', '.', 'S', '.', 'S'],
    ['.', '.', 'S', 'S', 'S', '.', '.', 'S', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', 'S', '.', '.'],
    ['.', 'S', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ];

  describe('constructor', () => {
    it('can create a board', () => {
      const b = new BattleShipService(board);
      expect(b.board).to.deep.equal(board);
    });

    it('will error on bad board inputs', () => {
      const board1 = [];
      const board2 = [[], []];

      expect(() => new BattleShipService(board1)).to.throw();
      expect(() => new BattleShipService(board2)).to.throw();
    });
  });

  describe('Battleship.attackAt', () => {
    let b;

    beforeEach(() => {
      b = new BattleShipService(board);
    });

    it('will miss', () => {
      expect(b.attackAt(0, 0)).to.equal('Miss');
    });

    it('will hit', () => {
      expect(b.attackAt(1, 1)).to.equal('Hit');
    });

    it('will be sunk', () => {
      expect(b.attackAt(2, 3)).to.equal('Sunk');

      expect(b.attackAt(1, 1)).to.equal('Hit');
      expect(b.attackAt(2, 1)).to.equal('Sunk');
    });

    it('will be already attacked', () => {
      expect(b.attackAt(0, 0)).to.equal('Miss');
      expect(b.attackAt(0, 0)).to.equal('Already Attacked');

      expect(b.attackAt(1, 1)).to.equal('Hit');
      expect(b.attackAt(1, 1)).to.equal('Already Attacked');
    });

    it('will win', () => {
      expect(b.attackAt(1, 1)).to.equal('Hit');
      expect(b.attackAt(1, 2)).to.equal('Sunk');

      expect(b.attackAt(2, 3)).to.equal('Sunk');

      expect(b.attackAt(4, 3)).to.equal('Hit');
      expect(b.attackAt(4, 4)).to.equal('Sunk');

      expect(b.attackAt(6, 2)).to.equal('Hit');
      expect(b.attackAt(6, 3)).to.equal('Hit');
      expect(b.attackAt(6, 4)).to.equal('Sunk');

      expect(b.attackAt(8, 1)).to.equal('Sunk');

      expect(b.attackAt(4, 7)).to.equal('Hit');
      expect(b.attackAt(5, 7)).to.equal('Hit');
      expect(b.attackAt(6, 7)).to.equal('Hit');
      expect(b.attackAt(7, 7)).to.equal('Sunk');

      expect(b.attackAt(1, 9)).to.equal('Hit');
      expect(b.attackAt(2, 9)).to.equal('Hit');
      expect(b.attackAt(3, 9)).to.equal('Hit');
      expect(b.attackAt(4, 9)).to.equal('Hit');
      expect(b.attackAt(5, 9)).to.equal('Win');
    });
  });
});
