'use strict';

var Enemy = function(game, x, y, key, frame) {
  
  // if a key isn't passed in
  // set the key variable to 'enemy'
  key = key || 'demon';

  // if a frame isn't passed in
  // set the frame variable to 0
  // 
  frame = frame || 0;

  Phaser.Sprite.call(this, game, x, y, key, frame);
  
  // rescale the enemy sprite
  this.scale.setTo(0.1, 0.1);

  // set the anchor
  this.anchor.setTo(0.5, 0.5);

  // add animation
  // and play it
  this.animations.add('fly');
  
  // add physics to our enemy
  this.game.physics.arcade.enableBody(this);

  //disable gravity on our enemy
  this.body.allowGravity = false;

  

  // tell Phaser to check our enemy to see if it left the world
  this.checkWorldBounds = true;

  // Kill it if it leaves the world
  this.outOfBoundsKill = true;

  
  this.events.onRevived.add(this.onRevived, this);

};

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.onRevived = function() {
  // add a "hover" tween so that it it bobbles up and down
  this.game.add.tween(this).to({y: this.y - 16}, 500, Phaser.Easing.Linear.NONE, true, 0, 100, true);

  // set the enemy in motion at a speed of -200
  this.body.velocity.x = -400;
  this.animations.play('fly', 10, true);
};