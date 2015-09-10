'use strict';
var stateCounter = 0;
JetpackPug.Game = function (game) {
  console.log('init');
  
  //Array of Different Astroids


  // settings
  this.playerMaxY = null;
  this.playerMaxAngle = 20;
  this.playerMinAngle = -20;
  this.previousCoinType = null;
  this.foodSpacingX = 10;
  this.foodSpacingY = 10;
  this.spawnX = null;
};

// This is where the magic happens

JetpackPug.Game.prototype = {
  create: function () {
    
    
    // set up the width and height of the canvas in pixels
    this.game.world.bounds = new Phaser.Rectangle(0,0, this.game.width + 300, this.game.height);

    // start the physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 400;

    // initialize settings
    this.playerMaxY = this.game.height - 176;
    this.spawnX = this.game.width + 64;

    this.background = this.game.add.tileSprite(0,0,this.game.width, 512, 'background');
    this.background.autoScroll(-100,0);

    this.midground = this.game.add.tileSprite(0,470,this.game.width, this.game.height - 460 - 73, 'midground');
    this.midground.autoScroll(-100,0);

    this.ground = this.game.add.tileSprite(0,this.game.height - 73, this.game.width, 73, 'ground');
    this.ground.autoScroll(-400,0);

    this.game.physics.arcade.enableBody(this.ground);
    this.ground.body.allowGravity = false;
    this.ground.body.immovable = true;

    // Array of Enemy Types
    this.asteroidType = ['smallAsteroid', 'mediumAsteroid', 'largeAsteroid'];

    // create groups
    this.enemies = this.game.add.group();
    this.coins = this.game.add.group();

    // create score text
    //this.score = 0;
    this.scoreText = this.game.add.bitmapText(10,10, 'minecraftia', 'Score: ' + this.score, 24);

    

    this.player = this.add.sprite(200, this.game.world.height/2, 'player_fly');
    this.player.anchor.setTo(0.5);
    this.player.scale.setTo(0.3);
    this.player.animations.add('fly', [0,1,2,3,2,1]);
    this.player.animations.play('fly', 8, true);
    this.player.alive = true;

    // add physics to player
    this.game.physics.arcade.enableBody(this.player);
    this.player.body.collideWorldBounds = true;
    this.player.body.bounce.setTo(0.25, 0.25);

    // create shadow
    this.shadow = this.game.add.sprite(this.player.x, this.game.world.height - 73, 'shadow');
    this.shadow.anchor.setTo(0.5, 0.5);

    //create scoreboard
    this.scoreboard = new Scoreboard(this.game);
    this.add.existing(this.scoreboard);

    // create an enemy spawn loop
    this.enemyGenerator = this.game.time.events.loop(Phaser.Timer.SECOND, this.generateEnemy, this);
    this.enemyGenerator.timer.start();
    // create a food spawn loop
    this.foodGenerator = this.game.time.events.loop(Phaser.Timer.SECOND, this.generateFood, this);
    this.foodGenerator.timer.start();


    // instantiate music
    this.music = this.game.add.audio('gameMusic');
    this.music.play('',0,true); 
    // start game music the moment the game is run (start at beginning and loop)

    // instantiate sounds
    this.bounceSound = this.game.add.audio('bounce');
    this.flapSound = this.game.add.audio('flap');
    this.foodSound = this.game.add.audio('food');
    this.deathSound = this.game.add.audio('death');

  },
  update: function () {
    // Update is run for every frame of the game, used for checking for collisions, movement or collecting food items
    if(this.player.alive) {
      if(this.game.input.activePointer.isDown) {
        this.player.body.velocity.y -= 25;
        if(!this.flapSound.isPlaying) {
          this.flapSound.play('',0,true); 
          //(marker, start position (0 = beginning), true = loop sound, volume (blank if not changing intensity))
        }
        this.player.animations.play('fly', 16);
      } else {
        this.flapSound.stop(); // if player not interacting
      }

      if(this.player.body.velocity.y < 0 || this.game.input.activePointer.isDown) {
        if(this.player.angle > 0) {
          this.player.angle = 0;
        }
        if(this.player.angle > this.playerMinAngle) {
          this.player.angle -= 0.5;
        }
      }

      if(this.player.body.velocity.y >= 0 && !this.game.input.activePointer.isDown) {
        
        if(this.player.angle < this.playerMaxAngle) {
          this.player.angle += 0.5;
        }
      }
      this.shadow.scale.setTo(this.player.y / this.game.height);
      this.game.physics.arcade.collide(this.player, this.ground, this.groundHit, null, this);
      this.game.physics.arcade.overlap(this.player, this.food, this.foodHit, null, this);
      this.game.physics.arcade.overlap(this.player, this.enemies, this.enemyHit, null, this);

    } else {
      this.game.physics.arcade.collide(this.player, this.ground);
    }
  },
  shutdown: function() {
    console.log('shutting down');
    //this.food.destroy();
    this.enemies.destroy(); // removes references to enemies in memory (garbage collected)
    // this.scoreboard.destroy();
    this.score = 0;
    this.coinTimer = 0;
    this.enemyTimer = 0;
    // this.foodGenerator.timer.destroy();
    // this.enemyGenerator.timer.destroy();
  },
  generateEnemy: function() {
    var enemy = this.enemies.getFirstExists(false);
    var x = this.spawnX;
    var y = this.game.rnd.integerInRange(50, this.game.world.height - 192);
    
    if(!enemy) {

      var rndNumber = Math.random(0, 2);

      enemy = new Enemy(this.game, 0, 0, 'doughnut');
      this.enemies.add(enemy);
    }

    enemy.reset(x, y);
    enemy.revive();
  },
  generateFood: function() {
    // if(!this.previousFoodType || this.previousFoodType < 3) {
    //   var coinType = this.game.rnd.integer() % 5;
    //   switch(foodType) {
    //     case 0:
    //       //do nothing. No food generated
    //       break;
    //     case 1:
    //     // case 2:
    //     //   // if the food type is 1 or 2, create a single coin
    //     //   //this.createCoin();
    //     //   this.createCoin();

    //       break;
    //     case 2:
    //       // create a small group of food
    //       this.createFoodGroup(2, 2);
    //       break;
    //     case 3:
    //       //create a large food group
    //       this.createFoodGroup(6, 2);
    //       break;
    //     default:
    //       // if somehow we error on the food type, set the previousfoodtype to zero and do nothing
    //       this.previousFoodType = 0;
    //       break;
    //   }

    //   this.previousFoodType = foodType;
    // } else {
    //   if(this.previousFoodType === 4) {
    //     // the previous food generated was a large group, 
    //     // skip the next generation as well
    //     this.previousFoodType = 3;
    //   } else {
    //     this.previousFoodType = 0;  
    //   }
      
    // }
  },
  createFood: function(x, y) {
    x = x ||  this.spawnX;
    y = y || this.game.rnd.integerInRange(50, this.game.world.height - 192);
    // recycle our coins
    // 
    var food = this.food.getFirstExists(false);
    if(!food) {
      food = new Food(this.game, 0, 0, 'food');
      this.food.add(food);
    }
    food.reset(x, y);
    food.revive();
    return food;
  },
  createFoodGroup: function(columns, rows) {
    //create 4 food items in a group
    var foodSpawnY = this.game.rnd.integerInRange(50, this.game.world.height - 192);
    var foodRowCounter = 0;
    var foodColumnCounter = 0;
    var food;
    for(var i = 0; i < columns * rows; i++) {
      food = this.createFood(this.spawnX, foodSpawnY);
      food.x = food.x + (foodColumnCounter * coin.width) + (foodColumnCounter * this.foodSpacingX);
      food.y = food.y + (foodRowCounter * food.height) + (foodRowCounter * this.foodSpacingY);
      foodColumnCounter++;
      if(i+1 >= columns && (i+1) % columns === 0) {
        foodRowCounter++;
        foodColumnCounter = 0;
      } 
    }
  },
  groundHit: function() {
    this.player.angle = 0;
    this.player.body.velocity.y = -200;
    this.bounceSound.play();
  },

  foodHit: function(player, food) {
    this.score++;

    food.kill();
    this.foodSound.play('',0,0.25);
    
    var scoreFood = new Food(this.game, coin.x, coin.y);
    this.game.add.existing(scoreFood);
    // scoreCoin.animations.play('spin', 40, true);
    var scoreTween = this.game.add.tween(scoreFood).to({x: 50, y: 50}, 300, Phaser.Easing.Linear.None, true);
    scoreTween.onComplete.add(function() {
      scoreFood.destroy();
      this.scoreText.text = 'Score: ' + this.score;
    }, this);
    
  },
  enemyHit: function(player, enemy) {
    player.kill();
    enemy.kill();

    this.player.alive = false;
    this.player.animations.stop();
    
    this.music.stop(); // stop game music if hit an enemy
    this.deathSound.play();
    this.ground.stopScroll();
    this.background.stopScroll();
    this.enemies.setAll('body.velocity.x', 0);

    this.enemyTimer = Number.MAX_VALUE; // stop generating enemies
    this.foodTimer = Number.MAX_VALUE;

    var scoreboard = new Scoreboard(this.game);

    this.shadow.destroy();
    this.enemyGenerator.timer.stop();
    this.foodGenerator.timer.stop();

    var deathTween = this.game.add.tween(this.player).to({angle:180}, 2000, Phaser.Easing.Bounce.Out, true);
    deathTween.onComplete.add(this.showScoreboard, this);
    
  },
  showScoreboard: function() {

    this.scoreboard.show(this.score);
    
  },
  render: function() {
  // Render function is called after all the sprites have auto-rendered by the game engine
  }
};