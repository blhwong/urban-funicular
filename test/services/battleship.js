const { expect } = require('chai');
const BattleShipService = require('../../services/battleship');
const Ship = require('../../models/ship');

describe('Battleship service', () => {
  let ships = [];

  beforeEach(() => {
    ships = [
      new Ship(1, 1, 2, 'vertical'),
      new Ship(2, 3, 1),
      new Ship(4, 3, 2, 'horizontal'),
      new Ship(6, 2, 3, 'horizontal'),
      new Ship(8, 1, 1),
      new Ship(4, 7, 4, 'vertical'),
      new Ship(1, 9, 5, 'vertical'),
    ];
  });


  describe('constructor', () => {
    it('can create a board', () => {
      const b = new BattleShipService(ships);
      expect(b.board).to.deep.equal([
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
      ]);
    });

    it('will error on bad board inputs', () => {
      // TODO: implement me
      const board1 = [
        [
          [-1, 0],
        ],
      ];
      const board2 = [
        [
          [1, 1],
          [2, 1],
        ],
        [
          [2, 1],
        ],
      ];

      expect(() => new BattleShipService(board1)).to.throw();
      expect(() => new BattleShipService(board2)).to.throw();
    });
  });

  describe('Battleship.attackAt', () => {
    let b;

    beforeEach(() => {
      b = new BattleShipService(ships);
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
      expect(b.attackAt(2, 1)).to.equal('Sunk');

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
