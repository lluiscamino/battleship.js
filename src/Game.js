class Game {
	constructor() {
		Game.hasStarted = true;
		Game.turn = Game.whoStarts();
		Game.gridSize = 10;
		Game.numBoatTypes = 5;
		Game.numBoatsPerType = [0, 2, 2, 1, 1, 1];
		Game.moves = 0;
		Game.winner;
	}
	
	static cellCodeToString(w, h) {
		return String.fromCharCode(parseInt(w)+65) + (parseInt(h)+1);
	}
	
	static stateCodeToString(code) {
		switch(code) {
			case 0:
				return 'Nothing';
			case 1:
				return 'Boat';
			case 2:
				return 'Water';
			case 3:
				return 'Touched';
			case 4:
				return 'Sunken';
			default:
				throw 'Cell code must be 0, 1, 2, 3 or 4';
		}
	}
	
	static randomCell() {
		return new Array(parseInt(Math.floor(Math.random() * Game.gridSize)), parseInt(Math.floor(Math.random() * Game.gridSize)));
	}
	
	static whoStarts() {
		return Math.random() < 0.5 ? 'player' : 'opponent';
	}
	
	static switchTurn() {
		Game.turn = Game.turn === 'player' ? 'opponent' : 'player';
	}
	
	static shootCell(shooter, w, h) {
		var cellValue = shooter === 'player' ? Opponent.grid[w][h] : Player.grid[w][h];
		if (cellValue < 2) {
			cellValue += 2;
		}
		if (shooter === 'player') {
			Opponent.grid[w][h] = cellValue;
		} else {
			Player.grid[w][h] = cellValue;
		}
		if (cellValue === 3) {
			var boatShot = new Boat(shooter === 'player' ? 'opponent' : 'player', 0, 'H', w, h, true);
			if (boatShot.isSunken()) {
				boatShot.sink();
				if (shooter === 'player') {
					Opponent.numBoatsAlive--;
				} else {
					Player.numBoatsAlive--;
				}
			}
		}
	}
	
	static setGridRandomly(gridType) {
		if (gridType !== 'player' && gridType !== 'opponent') {
			throw 'Grid must be player or opponent.';
		}
		if (gridType === 'player') {
			var grid = Player.grid;
			var boats = Player.boats;
		}
		else
		{
			var grid = Opponent.grid;
			var boats = Opponent.boats;
		}
		var stage = Game.numBoatTypes, numCellsBoat = 0, numBoatsType, i = 0, j = 0, randomCell, direction, boatID = 0;
		
		while (stage != 0) {
			numBoatsType = 0;
			while (numBoatsType < Game.numBoatsPerType[stage]) {
				numCellsBoat = 0, i = 0, j = 0;
				randomCell = Game.randomCell();
				direction = Math.random() < 0.5 ? 'H' : 'V';
				var boat = new Boat(gridType, stage, direction, randomCell[0], randomCell[1], false);
				if (boat.fitsInGrid()) {
					while (numCellsBoat < stage) {
						grid[randomCell[0]+parseInt(i)][randomCell[1]+parseInt(j)] = 1;
						boats[stage-1][numBoatsType][numCellsBoat][0] = randomCell[0]+parseInt(i);
						boats[stage-1][numBoatsType][numCellsBoat][1] = randomCell[1]+parseInt(j);
						boats[stage-1][numBoatsType][-1] = direction;
						if (direction === 'H') {
							i++;
						} else {
							j++;
						}
						numCellsBoat++;
					}
					boatID++;
					numBoatsType++;
				}
			}
			stage--;
		}
		if (gridType === 'player') {
			Player.grid = grid.slice();
			Player.boats = boats.slice();
		} else {
			Opponent.grid = grid.slice();
			Opponent.boats = boats.slice();
		}
	}
}