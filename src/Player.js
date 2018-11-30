class Player {
	constructor() {
		Player.numBoatsAlive = Game.numBoats;
		Player.grid = [];
		Player.initializeGrid(Game.gridSize);
		Player.boats = [];
		Player.initializeBoats();
	}
	
	static initializeGrid(gridSize) {
		for (var i = 0; i < gridSize; i++) {
			Player.grid[i] = [];
			for (var j = 0; j < gridSize; j++) {
				Player.grid[i][j] = 0;
			}
		}
	}
	
	static initializeBoats() {
		for (var i = 0; i < Game.numBoatTypes; i++) {
			Player.boats[i] = [];
			for (var j = 0; j < Game.numBoatsPerType[i+1]; j++) {
				Player.boats[i][j] = [];
				for (var k = 0; k < i+1; k++) {
					Player.boats[i][j][k] = [];
					for (var d = 0; d < 2; d++) {
						Player.boats[i][j][k][d] = 0;
					}
				}
			}
		}
	}
	
	static placeBoats() {
		// console.time('Player grid generated');
		Game.setGridRandomly('player');
		// console.timeEnd('Player grid generated')
	}
	
	static shootCell(w, h) {
		Game.shootCell('player', w, h);
		MessageBox.addMsg('<span class="box_text" id="text_' + Opponent.grid[w][h] + '">' + Game.stateCodeToString(Opponent.grid[w][h]) + '!</span> Player shot cell <b>' + Game.cellCodeToString(w, h) + '</b>');
	}
}