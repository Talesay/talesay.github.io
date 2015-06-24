/*global ig*/
ig.module(
	'scene.run.ent.slime-03'
).requires(
	'scene.run.ent.slime-01',
	'scene.run.ent.slime-02'
).defines(function () {
	'use strict';
	window.EntitySlime03 = window.EntitySlime01.extend({
		vel: {
			x: -32,
			y: 1
		},
		friction: {
			x: 8,
			y: 0
		},
		jumpTimer: 0,
		flipTimer: 0,
		animSheet: new ig.AnimationSheet('med/spr/enemy/slime-03.png', 16, 16),
		health: 1,
		slimeLevel: 3,
		init: function (x, y, settings) {
			this.parent(x, y, settings);
			var animSeq = [[0, 1], [1, 0]];
			this.addAnim('idle', 0.24, animSeq.random());
		},
		unite: function () {
			ig.game.spawnEntity(window.EntitySlime04, this.pos.x, this.pos.y);
		},
		kill: function (attacked) {
			this.spawnOthers(attacked);
			this.parent(attacked);
		},
		spawnOthers: function (attacked) {
			var one = ig.game.spawnEntity(window.EntitySlime02, this.pos.x - 2, this.pos.y - 1),
				two = ig.game.spawnEntity(window.EntitySlime02, this.pos.x + 2, this.pos.y);
			one.split(attacked);
			two.split(attacked);
		},
		handleMovement: function () {
			var cliff = !ig.game.collisionMap.getTile(this.pos.x + (this.currentAnim.flip.x ? this.size.x + 4 : -2), this.pos.y + this.size.y + 1);
			if (this.flipTimer > 0.3 && cliff) {
				if (this.standing) {
					this.vel.x = -this.vel.x;
				}
				this.flipTimer = 0;
				if (this.vel.x > 0) {
					this.currentAnim.flip.x = true;
				} else {
					this.currentAnim.flip.x = false;
				}
			}
			this.flipTimer += ig.system.tick;
			if ((this.distanceTo(ig.game.player) < 48 && this.jumpTimer > 0.5 && this.standing)) {
				if (ig.game.player.pos.x < this.pos.x) {
					this.vel.x = -16;
				} else {
					this.vel.x = 16;
				}

				this.jumpTimer = 0;
				this.vel.y = -82;
			} else {
				if (this.distanceTo(ig.game.player) > 48) {
					this.accel.y = 128;
					this.friction.x = 10;
				} else {
					this.accel.y = 0;
					this.friction.x = 0;
				}
				this.jumpTimer += ig.system.tick;
			}
		}
	});
});