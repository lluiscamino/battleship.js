class Opponent {
	constructor() {
		Opponent.numBoatsAlive = Game.numBoats;
		Opponent.grid = [];
		Opponent.initializeGrid();
		Opponent.boats = [];
		Opponent.initializeBoats();
	}
	
	static initializeGrid() {
		for (var i = 0; i < Game.gridSize; i++) {
			Opponent.grid[i] = [];
			for (var j = 0; j < Game.gridSize; j++) {
				Opponent.grid[i][j] = 0;
			}
		}
	}
	
	static initializeBoats() {
		for (var i = 0; i < Game.numBoatTypes; i++) {
			Opponent.boats[i] = [];
			for (var j = 0; j < Game.numBoatsPerType[i+1]; j++) {
				Opponent.boats[i][j] = [];
				for (var k = 0; k < i+1; k++) {
					Opponent.boats[i][j][k] = [];
					for (var d = 0; d < 2; d++) {
						Opponent.boats[i][j][k][d] = 0;
					}
				}
			}
		}
	}
	
	static placeBoats() {
		// console.time('Opponent grid generated');
		Game.setGridRandomly('opponent');
		// console.timeEnd('Opponent grid generated')
	}
	
	static shootCell() {
		var c = OpponentAI.giveCell();
		Game.shootCell('opponent', c[0], c[1]);
		MessageBox.addMsg('<span class="box_text" id="text_' + Player.grid[c[0]][c[1]] + '">' + Game.stateCodeToString(Player.grid[c[0]][c[1]]) + '!</span> Opponent shot cell <b>' + Game.cellCodeToString(c[0], c[1]) + '</b>');
	}
}