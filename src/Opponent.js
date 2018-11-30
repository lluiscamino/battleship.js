class Opponent {
	constructor() {
		Opponent.numBoatsAlive = Game.numBoats;
		Opponent.grid = new Array(Game.gridSize);
		Opponent.initializeGrid();
		Opponent.boats = new Array(Game.numBoatTypes);
		Opponent.initializeBoats();
	}
	
	static initializeGrid() {
		for (var i = 0; i < Game.gridSize; i++) {
			Opponent.grid[i] = new Array(Game.gridSize);
			for (var j = 0; j < Game.gridSize; j++) {
				Opponent.grid[i][j] = 0;
			}
		}
	}
	
	static initializeBoats() {
		for (var i = 0; i < Game.numBoatTypes; i++) {
			Opponent.boats[i] = new Array(Game.numBoatsPerType[i+1]);
			for (var j = 0; j < Game.numBoatsPerType[i+1]; j++) {
				Opponent.boats[i][j] = new Array(i+1);
				for (var k = 0; k < i+1; k++) {
					Opponent.boats[i][j][k] = new Array(2);
					for (var d = 0; d < 2; d++) {
						Opponent.boats[i][j][k][d] = 0;
					}
				}
			}
		}
	}
	
	static placeBoats() {
		console.time('Opponent grid generated');
		Game.setGridRandomly('opponent');
		console.timeEnd('Opponent grid generated')
	}
	
	static shootCell() {
		var c = OpponentAI.giveCell();
		Game.shootCell('opponent', c[0], c[1]);
		console.log(Game.stateCodeToString(Player.grid[c[0]][c[1]]) + '! Opponent shot cell ' + Game.cellCodeToString(c[0], c[1]) + ' and found ' + Game.stateCodeToString(Player.grid[c[0]][c[1]]-2));
	}
}