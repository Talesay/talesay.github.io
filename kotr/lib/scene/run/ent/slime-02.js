/*global ig*/
ig.module(
	'scene.run.ent.slime-02'
).requires(
	'scene.run.ent.slime-01'
).defines(function () {
	'use strict';
	window.EntitySlime02 = window.EntitySlime01.extend({
		vel: {
			x: -32,
			y: 1
		},
		friction: {
			x: 16,
			y: 0
		},
		jumpTimer: 0,
		flipTimer: 0,
		animSheet: new ig.AnimationSheet('med/spr/enemy/slime-02.png', 16, 16),
		health: 1,
		slimeLevel: 2,
		init: function (x, y, settings) {
			this.parent(x, y, settings);
			var animSeq = [[0, 1], [1, 0]];
			this.addAnim('idle', 0.24, animSeq.random());
		},
		unite: function () {
			ig.game.spawnEntity(window.EntitySlime03, this.pos.x, this.pos.y);
		},
		kill: function (attacked) {
			this.spawnOthers(attacked);
			this.parent(attacked);
		},
		spawnOthers: function (attacked) {
			var one = ig.game.spawnEntity(window.EntitySlime01, this.pos.x - 2, this.pos.y - 1),
				two = ig.game.spawnEntity(window.EntitySlime01, this.pos.x + 2, this.pos.y);
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
				this.vel.x = [16, -16].random();
				this.jumpTimer = 0;
				this.vel.y = -96;
			} else {
				if (this.distanceTo(ig.game.player) > 48) {
					this.accel.y = 28;
				} else {
					this.accel.y = 0;
				}
				this.jumpTimer += ig.system.tick;
			}
		}
	});
});