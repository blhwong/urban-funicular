const { expect } = require('chai');
const Ship = require('../../models/ship');

describe('Ship model', () => {
  let ship;

  beforeEach(() => {
    ship = new Ship(4, 3, 2, 'horizontal');
  });

  describe('constructor', () => {
    it('can create a ship', () => {
      expect(ship.row).to.equal(4);
      expect(ship.col).to.equal(3);
      expect(ship.size).to.equal(2);
      expect(ship.direction).to.equal('horizontal');
      expect(ship.hits).to.equal(0);
    });

    it('does not expect direction for ships at size 1', () => {
      expect(() => new Ship(1, 1, 1)).not.to.throw();
      expect(() => new Ship(1, 1, 2)).to.throw('Direction must be vertical or horizontal');
      expect(() => new Ship(1, 1, 2, 'blah')).to.throw('Direction must be vertical or horizontal');
      expect(() => new Ship(1, 1, 2, 'horizontal')).not.to.throw();
      expect(() => new Ship(1, 1, 2, 'vertical')).not.to.throw();
    });

    it('will throw error on bad inputs', () => {
      expect(() => new Ship(null, undefined, '1', 'test')).to.throw('Expect number');
      expect(() => new Ship(-1, -1, '1', 'test')).to.throw('out of bounds');
    });
  });

  describe('Ship.hit', () => {
    it('can increment hit counter', () => {
      ship.hit();
      expect(ship.hits).to.equal(1);
    });

    it('will throw an error if no more hits left', () => {
      ship.hit();
      ship.hit();
      expect(() => ship.hit()).to.throw('Ship has already sunk');
    });
  });

  describe('Ship.isSunk', () => {
    it('can determine if sunk', () => {
      expect(ship.isSunk()).to.equal(false);
      ship.hit();
      ship.hit();
      expect(ship.isSunk()).to.equal(true);
    });
  });
});
