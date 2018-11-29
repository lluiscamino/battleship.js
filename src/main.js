var battleship = new Game;
var player = new Player;
var opponent = new Opponent;
var opponentAI = new OpponentAI;

document.addEventListener('DOMContentLoaded', function() {
	Player.placeBoats();
	Opponent.placeBoats();
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
			if (this.getAttribute('data-type') === 'opponent') {
				if (Game.turn === 'player') {
					Player.shootCell(this.getAttribute('data-w'), this.getAttribute('data-h'));
					Graphics.updateGrid('opponent', opponentGrid);
					Game.switchTurn();
					Opponent.shootCell();
					Graphics.updateGrid('player', playerGrid);
					Game.switchTurn();
				} else {
					throw 'It is not your turn';
				}
			} else {
				throw 'data-type attribute must be equal to opponent';
			}
		});
	}
});