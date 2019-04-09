# Battleship

This is an API to handle the game of Battleship.

## Installation notes
To install service. Open terminal in the root directory and run:
```
npm install
```

To test:
```
npm test
```

## API Details
Before a battleship service is started, you must first instantiate at least one ship. A ship takes a row, column, size of ship, and a direction

Ship example:
```javascript
const Ship = require('./models/ship');
// row 1
// column 2
// ship size 3
// direction horizontal
const ship = new Ship(1, 2, 3, 'horizontal');
```

Battleship service can now accept an array of ships

Battleship service example:
```javascript
// continued from above
const BattleShipService = require('./lib/services/battleship');
const b = new BattleShipService([ship]);
// an optional board size can be specified
const bigBattleShip = new BattleShipService([ship], 20);
```

You can now use the attackAt method to determine

- 'Hit' if there is a ship occupying the position
- 'Miss' if no ship occupies the position
- 'Already Attacked' if the position has previously been attacked
- 'Sunk' if the attack hits the last remaining position of a ship
- 'Win' if the attack sinks the last remaining ship

```javascript
// continued from above
const move1 = b.attackAt(1, 1); // Miss
const move2 = b.attackAt(1, 2); // Hit
const move2 = b.attackAt(1, 3); // Hit
const move2 = b.attackAt(1, 4); // Win
```

## Implementation Notes
The service uses extra memory to store the current state of the board as well as a hash table that maps the coordinates to its respective ship. The board is a 2-dimensional array where you can specify the coordinates using a row and column input. If the coordinates of a ship is given, it will determine if the ship is sunk by checking if the hits is at least the length of the ship, which will also determine if that was a winning play by checking if there are any ships left to sink.

Most of the work comes in the initialization of the service by placement of the ships and constructing the locations hash table. The service will also be able to tell if the ships are placed in a way where one or more ships are colliding. Also, the service can determine if ships are placed out of bounds with respect to the varying ship size.

If I had more time, I would add more test cases especially what happens after all ships are sunk and game is over.
