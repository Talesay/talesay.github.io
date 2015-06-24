/*global ig*/
ig.module(
	'scene.run.ent.lizard-02'
).requires(
	'scene.run.ent.lizard-01'
).defines(function () {
	'use strict';
	window.EntityLizard02 = window.EntityLizard01.extend({
		size: {
			x: 8,
			y: 10
		},
		offset: {
			x: 2,
			y: 5
		},
		maxVel: {
			x: 200,
			y: 900
		},
		vel: {
			x: 0,
			y: 1
		},
		accel: {
			x: 0,
			y: 0
		},
		friction: {
			x: 64,
			y: 0
		},
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.ACTIVE,
		attackTimer: 0,
		animSheet: new ig.AnimationSheet('med/spr/enemy/lizard-02.png', 16, 16),
		health: 1,
		init: function (x, y, settings) {
			this.parent(x, y, settings);
			var animSeq = [[0, 1], [1, 0]];
			this.addAnim('idle', 0.24, animSeq.random());
			this.addAnim('attack', 0.24, [0]);
		},
		collideWith: function (other, axis) {
			if (other.attacked && other.type === ig.Entity.TYPE.A) {
				other.crit();
				this.kill(true);
				return;
			}
			if (other.type === ig.Entity.TYPE.A) {
				other.hit();
				this.kill(false);
			}
		},
		kill: function (attacked) {
			ig.game.spawnEntity(window.RunParticleEnemyEmitter, this.pos.x, this.pos.y, {
				newAnimSheet: this.currentAnim.sheet.image.path,
				animWidth: this.currentAnim.sheet.width,
				animHeight: this.currentAnim.sheet.height,
				otherAttack: attacked
			});
			this.parent();
		},
		handleAnims: function () {},
		handleMovement: function () {
			if (ig.game.player.pos.x > this.pos.x && this.attackTimer === 0) {
				this.vel.x = 128;
				this.accel.x = 32;
				this.currentAnim = this.anims.attack;
				if (!this.currentAnim.flip.x) {
					this.currentAnim.flip.x = true;
				}
				this.currentAnim.angle = 1;
				this.attackTimer += ig.system.tick;
			} 
			
			if (ig.game.player.pos.x + this.size.x < this.pos.x) {
				this.attackTimer = 0;
				this.accel.x = 0;
				this.friction.x = 96;
				this.currentAnim = this.anims.idle;
				this.currentAnim.angle = 0;
			}
		}
	});
});