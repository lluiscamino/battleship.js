class Boat {
	constructor(grid, size, direction, w, h, unknownInfo) {
		if (grid !== 'player' && grid !== 'opponent') {
			throw 'Grid must be player or opponent.';
		}
		if (direction !== 'H' && direction !== 'V') {
			throw 'Direction must be H or V';
		}
		
		this.grid = grid === 'player' ? Player.grid : Opponent.grid;
		this.boats = grid === 'player' ? Player.boats : Opponent.boats;
		this.size = parseInt(size);
		this.direction = direction;
		this.w = parseInt(w);
		this.h = parseInt(h);
		this.boatNum = null;
		if (unknownInfo) {
			this.setInfoByCoords();
		}
	}
	
	setInfoByCoords() {
		for (var i = 0; i < Game.numBoatTypes; i++) {
			for (var j = 0; j < Game.numBoatsPerType[i+1]; j++) {
				for (var k = 0; k < i+1; k++) {
						if (this.boats[i][j][k][0] === this.w && this.boats[i][j][k][1] === this.h) {
							this.w = this.boats[i][j][0][0];
							this.h = this.boats[i][j][0][1];
							this.size = i;
							this.direction = this.boats[i][j][-1];
							this.boatNum = j; 
							return;
						}
				}
			}
		}
		throw 'Coords do not correspond to any boat';
	}
	
	listOfCoords() {
		if (this.boatNum === null) {
			throw '';
		}
		return this.boats[this.size][this.boatNum];
	}
	
	fitsInGrid(considerUntouchedBoats = true) {
		if ((this.direction === 'H' && this.w+this.size > Game.gridSize) || (this.direction === 'V' && this.h+this.size > Game.gridSize)) {
			return false;
		}
		
		var stage = -1, i = 0, j = 0;
		
		while (stage < 2) {
			for (var k = -1; k <= this.size; k++) {
				if (this.direction === 'H') {
					i = k;
					j = stage;
				} else {
					i = stage;
					j = k;
				}
				var x = this.w+i;
				var y = this.h+j;
				if (x < Game.gridSize && y < Game.gridSize && x >= 0 && y >= 0 && ((considerUntouchedBoats && this.grid[x][y] !== 0) || (!considerUntouchedBoats && (this.grid[x][y] === 3 || this.grid[x][y] === 4)))) {
					return false;
				}
			}
			stage++;
		}
		return true;
	}
	
	sink() {
		if (this.boatNum === null) {
			throw '';
		}
		var coords = this.listOfCoords();
		for (var i = 0; i <= this.size; i++) {
			this.grid[coords[i][0]][coords[i][1]] = 4;
		}
	}
	
	isSunken() {
		var i = this.w, j = this.h;
		for (var k = 0; k <= this.size; k++) {
			if (this.grid[i][j] !== 3) {
				return false;
			}
			if (this.direction === 'H') {
				i++;
			} else {
				j++;
			}
		}
		return true;
	}
	
}