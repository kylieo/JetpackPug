// 'use strict';
// $(document).ready(function() {
//   if ($('.game-panel').length <= 0) {
//     return;
//   };

//     function Menu() {}
    
//     Menu.prototype = {
//       preload: function() {

//       },
//       create: function() {
//         // add the background sprite
//         this.background = this.game.add.sprite(0,0,'background');
        
//         // add the ground sprite as a tile
//         // and start scrolling in the negative x direction
//         this.ground = this.game.add.tileSprite(0,400, 335,112,'ground');
//         this.ground.autoScroll(-200,0);

//         /** STEP 1 **/
//         // create a group to put the title assets in 
//         // so they can be manipulated as a whole
//         this.titleGroup = this.game.add.group()
          
//         /** STEP 2 **/
//         // create the title sprite
//         // and add it to the group
//         this.title = this.add.sprite(0,0,'title');
//         this.titleGroup.add(this.title);
        
//         /** STEP 3 **/
//         // create the bird sprite 
//         // and add it to the title group
//         this.bird = this.add.sprite(200,5,'bird');
//         this.titleGroup.add(this.bird);
        
//         /** STEP 4 **/
//         // add an animation to the bird
//         // and begin the animation
//         this.bird.animations.add('flap');
//         this.bird.animations.play('flap', 12, true);
        
//         /** STEP 5 **/
//         // Set the originating location of the group
//         this.titleGroup.x = 30;
//         this.titleGroup.y = 100;

//         /** STEP 6 **/
//         //  create an oscillating animation tween for the group
//         this.game.add.tween(this.titleGroup).to({y:115}, 350, Phaser.Easing.Linear.NONE, true, 0, 1000, true);

//         // add our start button with a callback
//         this.startButton = this.game.add.button(this.game.width/2, 300, 'startButton', this.startClick, this);
//         this.startButton.anchor.setTo(0.5,0.5);
//       },
//       startClick: function() {
//         // start button click handler
//         // start the 'play' state
//         this.game.state.start('play');
//       }
//     };
    
//     module.exports = Menu;

//     // PRELOAD state

//     'use strict';
//     function Preload() {
//       this.asset = null;
//       this.ready = false;
//     }

//     Preload.prototype = {
//       preload: function() {
//         this.asset = this.add.sprite(this.width/2,this.height/2, 'preloader');
//         this.asset.anchor.setTo(0.5, 0.5);

//         this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
//         this.load.setPreloadSprite(this.asset);
//         this.load.image('background', 'assets/background.png');
//         this.load.image('ground', 'assets/ground.png');
//         this.load.image('title', 'assets/title.png');
//         this.load.spritesheet('bird', 'assets/bird.png', 34,24,3);
//         this.load.image('startButton', 'assets/start-button.png');
//       },
//       create: function() {
//         this.asset.cropEnabled = false;
//       },
//       update: function() {
//         if(!!this.ready) {
//           this.game.state.start('menu');
//         }
//       },
//       onLoadComplete: function() {
//         this.ready = true;
//       }
//     };

//     module.exports = Preload

//   // Emanuele Feronato

//   // http://www.emanueleferonato.com/2015/03/10/html5-flappy-bird-prototype-using-phaser-states-extended-classes-and-arcade-physics/

//     window.onload = function() {	
//   	var game = new Phaser.Game(320, 480, Phaser.CANVAS);
//   	var pug;
//        // bird gravity, will make pug fall if you don't flap
//   	var pugGravity = 800;
//        // horizontal pug speed
//   	var pugSpeed = 125;
//        // thrust power
//   	var pugFlapPower = 300;
//        // milliseconds between the creation of two pipes
//   	var pipeInterval = 2000;
//        // hole between pipes, in puxels
//   	var pipeHole = 120;
//   	var pipeGroup;
//   	var score=0;
//   	var scoreText;
//        var topScore;
       
//        var play = function(game){}
       
//        play.prototype = {
//   		preload:function(){
//   			game.load.image("bird", "bird.png"); 
//   			game.load.image("pipe", "pipe.png");	
//   		},
//   		create:function(){
//   			pipeGroup = game.add.group();
//   			score = 0;
//   			topScore = localStorage.getItem("topFlappyScore")==null?0:localStorage.getItem("topFlappyScore");
//   			scoreText = game.add.text(10,10,"-",{
//   				font:"bold 16px Arial"
//   			});
//   			updateScore();
//   			game.stage.backgroundColor = "#87CEEB";
//   			game.stage.disableVisibilityChange = true;
//   			game.physics.startSystem(Phaser.Physics.ARCADE);
//   			bird = game.add.sprite(80,240,"bird");
//   			bird.anchor.set(0.5);
//   			game.physics.arcade.enable(bird);
//   			bird.body.gravity.y = birdGravity;
//   			game.input.onDown.add(flap, this);
//   			game.time.events.loop(pipeInterval, addPipe); 
//   			addPipe();
//   		},
//   		update:function(){
//   			game.physics.arcade.collide(bird, pipeGroup, die);
//   			if(bird.y>game.height){
//   				die();
//   			}	
//   		}
//   	}
       
//        game.state.add("Play",play);
//        game.state.start("Play");
       
//        function updateScore(){
//   		scoreText.text = "Score: "+score+"\nBest: "+topScore;	
//   	}
       
//   	function flap(){
//   		bird.body.velocity.y = -birdFlapPower;	
//   	}
  	
//   	function addPipe(){
//   		var pipeHolePosition = game.rnd.between(50,430-pipeHole);
//   		var upperPipe = new Pipe(game,320,pipeHolePosition-480,-birdSpeed);
//   		game.add.existing(upperPipe);
//   		pipeGroup.add(upperPipe);
//   		var lowerPipe = new Pipe(game,320,pipeHolePosition+pipeHole,-birdSpeed);
//   		game.add.existing(lowerPipe);
//   		pipeGroup.add(lowerPipe);
//   	}
  	
//   	function die(){
//   		localStorage.setItem("topFlappyScore",Math.max(score,topScore));	
//   		game.state.start("Play");	
//   	}
  	
//   	Pipe = function (game, x, y, speed) {
//   		Phaser.Sprite.call(this, game, x, y, "pipe");
//   		game.physics.enable(this, Phaser.Physics.ARCADE);
//   		this.body.velocity.x = speed;
//   		this.giveScore = true;	
//   	};
  	
//   	Pipe.prototype = Object.create(Phaser.Sprite.prototype);
//   	Pipe.prototype.constructor = Pipe;
  	
//   	Pipe.prototype.update = function() {
//   		if(this.x+this.width<bird.x && this.giveScore){
//   			score+=0.5;
//   			updateScore();
//   			this.giveScore = false;
//   		}
//   		if(this.x<-this.width){
//   			this.destroy();
//   		}
//   	};	
//   }
// })