/*global ig*/
ig.module(
	'scene.run.ent.lizard-01'
).requires(
	'impact.entity',
	'scene.run.ent.particle.enemy-emitter'
).defines(function () {
	'use strict';
	window.EntityLizard01 = ig.Entity.extend({
		size: {
			x: 8,
			y: 10
		},
		offset: {
			x: 2,
			y: 5
		},
		maxVel: {
			x: 72,
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
		animSheet: new ig.AnimationSheet('med/spr/enemy/lizard-01.png', 16, 16),
		health: 1,
		init: function (x, y, settings) {
			this.parent(x, y, settings);
			var animSeq = [[0, 1], [1, 0]];
			this.addAnim('idle', 0.24, animSeq.random());
			this.addAnim('attack', 0.24, [0]);
		},
		update: function () {
			if (ig.game.player.pos.x < this.pos.x - ig.system.width) {
                return;
            } else if (this.pos.x + this.size.x < ig.game.screen.x || this.pos.y > 80 || this.pos.y < -80) {
                ig.game.removeEntity(this);
            }
			this.handleMovement();
			this.handleAnims();
			this.parent();
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

			if (ig.game.player.pos.x < this.pos.x && this.distanceTo(ig.game.player) < 54) {
				this.vel.x = -64;
				if (this.currentAnim === this.anims.idle) {
					this.currentAnim = this.anims.attack;
					this.currentAnim.angle = -1;
				}
			} else if (this.distanceTo(ig.game.player) > 54 && this.currentAnim === this.anims.attack){
				this.currentAnim = this.anims.idle;
				this.currentAnim.angle = 0;
			}

		}
	});
});