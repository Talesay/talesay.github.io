/*global ig*/
ig.module(
	'scene.run.ent.slime-04'
).requires(
	'scene.run.ent.slime-01',
	'scene.run.ent.slime-03'
).defines(function () {
	'use strict';
	window.EntitySlime04 = window.EntitySlime01.extend({
		vel: {
			x: 0,
			y: 1
		},
		friction: {
			x: 4,
			y: 0
		},
		maxVel: {
			x: 200,
			y: 900
		},
		accel: {
			x: 0,
			y: 48
		},
		jumpTimer: 0,
		flipTimer: 0,
		animSheet: new ig.AnimationSheet('med/spr/enemy/slime-04.png', 16, 16),
		health: 1,
		slimeLevel: 4,
		init: function (x, y, settings) {
			this.parent(x, y, settings);
			var animSeq = [[0, 1], [1, 0]];
			this.addAnim('idle', 0.24, animSeq.random());
		},
		unite: function() {
			this.split(false);
		},
		kill: function (attacked) {
			this.spawnOthers(attacked);
			this.parent(attacked);
		},
		spawnOthers: function (attacked) {
			var one = ig.game.spawnEntity(window.EntitySlime03, this.pos.x - 2, this.pos.y - 1),
				two = ig.game.spawnEntity(window.EntitySlime03, this.pos.x + 2, this.pos.y);
			one.split(attacked);
			two.split(attacked);
		},
		handleMovement: function () {

			var cliff = !ig.game.collisionMap.getTile(this.pos.x + (this.currentAnim.flip.x ? this.size.x + 4 : -2), this.pos.y + this.size.y + 1);
			if (this.pos.x < ig.game.player.pos.x && this.flipTimer > 0.2 && this.standing) {
				this.vel.x = 32;
			} else if (this.flipTimer > 0.2 && this.standing) {
				this.vel.x = -32;
			}
			if (this.flipTimer > 0.1 && cliff && this.standing) {
				this.flipTimer = 0;
				//this.vel.x = -this.vel.x;
				if (this.standing){
				this.vel.y = -128;
				}
			}
			if (this.pos.x < ig.game.player.pos.x) {
				this.currentAnim.flip.x = true;
			} else {
				this.currentAnim.flip.x = false;
			}
			this.flipTimer += ig.system.tick;
		}
	});
});