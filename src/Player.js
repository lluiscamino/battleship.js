class Player {
	constructor() {
		this.attempts = 0;
		Player.numBoatsAlive = Game.numBoatTypes;
		Player.grid = new Array(Game.gridSize);
		Player.initializeGrid(Game.gridSize);
		Player.boats = new Array(Game.numBoatTypes);
		Player.initializeBoats();
	}
	
	static initializeGrid(gridSize) {
		for (var i = 0; i < gridSize; i++) {
			Player.grid[i] = new Array(gridSize);
			for (var j = 0; j < gridSize; j++) {
				Player.grid[i][j] = 0;
			}
		}
	}
	
	static initializeBoats() {
		for (var i = 0; i < Game.numBoatTypes; i++) {
			Player.boats[i] = new Array(Game.numBoatsPerType[i+1]);
			for (var j = 0; j < Game.numBoatsPerType[i+1]; j++) {
				Player.boats[i][j] = new Array(i+1);
				for (var k = 0; k < i+1; k++) {
					Player.boats[i][j][k] = new Array(2);
					for (var d = 0; d < 2; d++) {
						Player.boats[i][j][k][d] = 0;
					}
				}
			}
		}
	}
	
	static placeBoats() {
		console.time('Player grid generated');
		Game.setGridRandomly('player');
		console.timeEnd('Player grid generated')
	}
	
	static shootCell(w, h) {
		Game.shootCell('player', w, h);
		console.log(Game.stateCodeToString(Opponent.grid[w][h]) + '! Player shot cell ' + Game.cellCodeToString(w, h) + ' and found ' + Game.stateCodeToString(Opponent.grid[w][h]-2));
	}
}