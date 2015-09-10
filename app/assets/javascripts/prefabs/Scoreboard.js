// inherits from Phaser.group

var Scoreboard = function(game) {
	Phaser.Group.call(this, game);
};

	Scoreboard.prototype = Object.create(Phaser.Group.prototype);
	Scoreboard.prototype.constructor = Scoreboard;

	// Two custom methods:
	// Display game over text, score achieved, high score, tap to play again instruction. If it's a new score, display a new high score 
	Scoreboard.prototype.show = function (score) {
		var bmd, background, gameoverText, scoreText, highScoreText, newHighScoreText, starText;
		bmd = this.game.add.bitmapData(this.game.width, this.game.height);
		bmd.ctx.fillStyle = '#000';
		bmd.ctx.fillRect(0, 0, this.game.width, this.game.height); 
			// creates rectangle the same size as the screen

		background = this.game.add.sprite(0, 0, bmd);
		background.alpha = 0.5; //opacity
		this.add(background);

		var isNewHighScore = false;
		var highScore = localStorage.getItem('highScore');
		if(!highScore || highScore < score) {
			isNewHighScore = true;
			highScore = score;
			localStorage.setItem('highScore', highScore);
		}
		this.y = this.game.height;

		gameoverText = this.game.add.bitmapText(0, 200, 'minecraftia', 'You died!', 36);
		gameoverText.x = this.game.width/2 - (gameoverText.textWidth/2);
		this.add(gameoverText);

		scoreText = this.game.add.bitmapText(0, 250, 'minecraftia', 'Your score: ' + score, 24);
		scoreText.x = this.game.width/2 - (scoreText.textWidth/2);
		this.add(scoreText);

		highScoreText = this.game.add.bitmapText(0, 300, 'minecraftia', 'Your high score: ' + highScore, 24);
		highScoreText.x = this.game.width/2 - (highScoreText.textWidth/2);
		this.add(highScoreText);

		startText = this.game.add.bitmapText(0, 350, 'minecraftia', 'Tap to play again!', 16);
		startText.x = this.game.width/2 - (startText.textWidth/2);
		this.add(startText);

		if(isNewHighScore) {
			newHighScoreText = this.game.add.bitmapText(0, 100, 'minecraftia', 'New high score!', 12);
			newHighScoreText.tint = 0x4ebef7; // #0x4ebef7 using as number instead of string
			newHighScoreText.x = gameoverText.x + gameoverText.textWidth + 40;
			newHighScoreText.angle = 45;
			this.add(newHighScoreText); // add to scoreboard group
		}

		this.game.add.tween(this).to({y:0}, 1000, Phaser.Easing.Bounce.Out, true);

		this.game.input.onDown.addOnce(this.restart, this);
		// if push button multiple times not going to restart game multiple times





		// newHighScoreText.inputEnabled = true;
  // 		newHighScoreText.events.onInputDown.add(this.highscoreClickHandler, this); 

	};

	Scoreboard.prototype.restart = function (score) {
		this.game.state.start('Game', true, false);
	};






// }
// ...

// GameOverState.prototype.highscoreClickHandler = function() {
//   alert("You clicked the new high score!");
// }