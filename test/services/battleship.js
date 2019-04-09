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

    it('will error on no ships', () => {
      expect(() => new BattleShipService([])).to.throw('Must have at least one ship');
    });

    it('will error when ships are colliding', () => {
      const collidingShips = [
        new Ship(4, 0, 10, 'horizontal'),
        new Ship(0, 4, 10, 'vertical'),
      ];
      expect(() => new BattleShipService(collidingShips)).to.throw('colliding');
    });

    it('will error when ships are out of bounds', () => {
      const longShips = [
        new Ship(0, 0, 11, 'horizontal'),
        new Ship(1, 5, 10, 'vertical'),
      ];
      expect(() => new BattleShipService(longShips)).to.throw('out of bounds');
      expect(() => new BattleShipService(longShips, 11)).not.to.throw();
    });

    it('will error if bad board size', () => {
      expect(() => new BattleShipService(ships, 'x')).to.throw('Expect number');
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

    it('will error on bad inputs', () => {
      expect(() => b.attackAt(null, undefined)).to.throw('Expect number');
      expect(() => b.attackAt(-1, 9)).to.throw('Row out of bounds');
      expect(() => b.attackAt(10, 5)).to.throw('Row out of bounds');
      expect(() => b.attackAt(5, -1)).to.throw('Column out of bounds');
      expect(() => b.attackAt(5, 1000)).to.throw('Column out of bounds');
      expect(() => b.attackAt('1', '6')).to.throw('Expect number');
    });
  });

  describe('Battleship.getLocation', () => {
    let b;

    beforeEach(() => {
      b = new BattleShipService(ships);
    });

    it('can get location key', () => {
      const row = 1;
      const col = 2;
      expect(b.getLocation(row, col)).to.equal(`[${row}, ${col}]`);
    });

    it('will error on bad inputs', () => {
      expect(() => b.getLocation()).to.throw('Expect number');
      expect(() => b.getLocation(null, undefined)).to.throw('Expect number');
      expect(() => b.getLocation('1', '2')).to.throw('Expect number');
    });
  });
});
