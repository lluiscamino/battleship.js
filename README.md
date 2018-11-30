# battleship.js
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/lluiscamino/battleship.js/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/lluiscamino/battleship.js/?branch=master) [![Build Status](https://scrutinizer-ci.com/g/lluiscamino/battleship.js/badges/build.png?b=master)](https://scrutinizer-ci.com/g/lluiscamino/battleship.js/build-status/master) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/lluiscamino/battleship.js/blob/master/LICENSE)

## Description
A simple Battleship game wrote in JavaScript.
## Rules
1. There are 5 types of boats and 7 boats in total:

    ```js
    Game.numBoatTypes = 5;
    Game.numBoatsPerType = [0, 2, 2, 1, 1, 1];
    ```
   1. 2 boats occupying 1 cell
   2. 2 boats occupying 2 cells
   3. 1 boat occupying 3 cells
   4. 1 boat occupying 4 cells
   5. 1 boat occupying 5 cells
2. Boats have to be placed horizontally or vertically
3. Boats cannot be placed outside the 10x10 grid
4. Boats cannot be placed on another boat or around it (every boat has to be distanced one cell from the rest of the boats)
## Built with
* [Bootstrap](https://getbootstrap.com/)
## Play
[Click here to play](https://lluiscamino.github.io/battleship.js/)
