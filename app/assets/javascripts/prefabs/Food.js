'use strict';
var Food = function(game, x, y, key, frame) {
  
  // if a key isn't passed in
  // set the key variable to 'enemy'
  key = key || 'coin';

  // if a frame isn't passed in
  // set the frame variable to 0
  // 
  frame = frame || 0;

  Phaser.Sprite.call(this, game, x, y, key, frame);
  
  // rescale the food sprite
  this.scale.setTo(0.5, 0.5);

  // set the anchor
  this.anchor.setTo(0.5, 0.5);

  // add physics
  this.game.physics.arcade.enableBody(this);

  //disable gravity on our enemy
  this.body.allowGravity = false;

  

  // tell Phaser to check to see if it has left the world
  this.checkWorldBounds = true;

  // Kill it if it leaves the world
  this.outOfBoundsKill = true;


  this.events.onKilled.add(this.onKilled, this);
  this.events.onRevived.add(this.onRevived, this);


};

Food.prototype = Object.create(Phaser.Sprite.prototype);
Food.prototype.constructor = Food;

Food.prototype.onRevived = function() {
  // set the enemy in motion at a speed of -200
  this.body.velocity.x = -400;
  // this.animations.play('spin', 10, true);
};
Food.prototype.onKilled = function() {
  this.animations.frame = 0;

};