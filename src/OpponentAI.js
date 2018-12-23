class OpponentAI {
	constructor() {
		OpponentAI.foundBoatCell = false;
		OpponentAI.firstCell = [-1, -1];
		OpponentAI.lastCell = [-1, -1];
		/**
		 * Direction codes:
		 * -1: unknown;
		 * 0: up
		 * 1: down
		 * 2: left
		 * 3: right
		 */
		OpponentAI.directionCode = -1;
		OpponentAI.testedDirections = [false, false, false, false];
	}
	
	static checkForBoat(w, h, dir = -1) {
		if (OpponentAI.checkIfValidCell(w, h) && Player.grid[w][h] === 1) {
			OpponentAI.foundBoatCell = true;
			if (OpponentAI.firstCell[0] === -1) {
				OpponentAI.firstCell = [w, h];
			}
			OpponentAI.lastCell = [w, h];
			OpponentAI.directionCode = dir;
			return true;
		}
		return false;
	}
	
	static checkForSunkenBoat(w, h) {
		if (Player.grid[w][h] === 4) {
			OpponentAI.foundBoatCell = false;
			OpponentAI.firstCell = [-1, -1];
			OpponentAI.lastCell = [-1, -1];
			OpponentAI.directionCode = -1;
			OpponentAI.testedDirections = [false, false, false, false];
		}
	}
	
	static newRandomCell() {
		var randomCell = Game.randomCell();
		while (Player.grid[randomCell[0]][randomCell[1]] !== 0 && Player.grid[randomCell[0]][randomCell[1]] !== 1) {
			randomCell = Game.randomCell();
		}
		return randomCell;
	}
	
	static newCellDependingOnDir(dir) {
		switch(dir) {
			case 0:
				return [OpponentAI.lastCell[0], OpponentAI.lastCell[1]-1];
			case 1:
				return [OpponentAI.lastCell[0], OpponentAI.lastCell[1]+1];
			case 2:
				return [OpponentAI.lastCell[0]-1, OpponentAI.lastCell[1]];
			case 3:
				return [OpponentAI.lastCell[0]+1, OpponentAI.lastCell[1]];
			default:
				throw 'Invalid direction code';
		}
	}
	
	static checkIfValidCell(w, h) {
		return !(w < 0 || h < 0 || w >= Game.gridSize || h >= Game.gridSize);
	}
	
	static switchDirection() {
		OpponentAI.lastCell = OpponentAI.firstCell;
		switch(OpponentAI.directionCode) {
			case -1:
				throw 'Cannot switch from none direction';
			case 0:
				OpponentAI.directionCode = 1;
				break;
			case 1:
				OpponentAI.directionCode = 0;
				break;
			case 2:
				OpponentAI.directionCode = 3;
				break;
			case 3:
				OpponentAI.directionCode = 2;
				break;
			default:
				throw 'Invalid directionCode';
		}
	}
	
	static findOutDirection() {
		var i = 0;
		while (OpponentAI.testedDirections[i] === true && i <= 3) {
			i++;
		}
		var cell = OpponentAI.newCellDependingOnDir(i);
		OpponentAI.checkForBoat(cell[0], cell[1], i);
		OpponentAI.testedDirections[i] = true;
		return cell;
	}
	
	static giveCell() {
		if (OpponentAI.lastCell[0] !== -1) {
			OpponentAI.checkForSunkenBoat(OpponentAI.lastCell[0], OpponentAI.lastCell[1]);
		}
		if (!OpponentAI.foundBoatCell) {
			var cell = OpponentAI.newRandomCell();
			var boat = new Boat('player', 1, 'H', cell[0], cell[1], false);
			while (!boat.fitsInGrid(false)) {
				cell = OpponentAI.newRandomCell();
				boat = new Boat('player', 1, 'H', cell[0], cell[1], false);
			}
			OpponentAI.checkForBoat(cell[0], cell[1]);
		} else {
			if (OpponentAI.directionCode === -1) {
				var cell = OpponentAI.findOutDirection();
				while (!OpponentAI.checkIfValidCell(cell[0], cell[1]) || Player.grid[cell[0]][cell[1]] === 2) {
					cell = OpponentAI.findOutDirection();
				}
			} else {
				var cell = OpponentAI.newCellDependingOnDir(OpponentAI.directionCode);
				if (!OpponentAI.checkIfValidCell(cell[0], cell[1]) || Player.grid[cell[0]][cell[1]] === 2) {
					OpponentAI.switchDirection();
					cell = OpponentAI.newCellDependingOnDir(OpponentAI.directionCode);
				}
				if (!OpponentAI.checkForBoat(cell[0], cell[1], OpponentAI.directionCode)) {
					OpponentAI.switchDirection();
				}
			}
		}
		return cell;
	}
}