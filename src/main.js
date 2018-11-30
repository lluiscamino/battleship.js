var battleship = new Game;
Game.initGame();

document.addEventListener('DOMContentLoaded', function() {
	var gridBtns = document.getElementsByClassName('grid_btn');
	var playerGrid = document.getElementById('player_grid');
	var opponentGrid = document.getElementById('opponent_grid');
	
	try {
	Graphics.loadGrids(playerGrid, opponentGrid, Game.gridSize);
	} catch(e) {
		console.error('Could not start game.');
		return;
	}
	if (Game.turn === 'opponent') {
		console.log('The opponent starts.');
		Opponent.shootCell();
		Game.switchTurn();
		Graphics.updateGrid('player', playerGrid);
	} else {
		console.log('You start!');
	}
	for (var i = 0; i < gridBtns.length; i++) {
		gridBtns[i].addEventListener('click', function() {
			if (Game.hasStarted) {
				if (this.getAttribute('data-type') === 'opponent') {
					if (Game.turn === 'player') {
						Player.shootCell(this.getAttribute('data-w'), this.getAttribute('data-h'));
						Graphics.updateGrid('opponent', opponentGrid);
						if (Opponent.numBoatsAlive === 0) {
							Game.restartGame(playerGrid, opponentGrid, 'player');
						}
						Game.switchTurn();
						Opponent.shootCell();
						Graphics.updateGrid('player', playerGrid);
						if (Player.numBoatsAlive === 0) {
							Game.restartGame(playerGrid, opponentGrid, 'opponent');
						}
						Game.switchTurn();
					} else {
						throw 'It is not your turn';
					}
				} else {
					throw 'data-type attribute must be equal to opponent';
				}
			} else {
				throw 'Game has already ended';
			}
		});
	}
});