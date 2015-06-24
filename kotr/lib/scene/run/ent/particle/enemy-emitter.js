/*global ig*/
ig.module(
	'scene.run.ent.particle.enemy-emitter'
).requires(
	//nothing
	'impact.entity',
	'scene.run.ent.particle.enemy',
	'scene.run.ent.particle.hit',
	'scene.run.ent.particle.collide'
).defines(function () {
	'use strict';
	window.RunParticleEnemyEmitter = ig.Entity.extend({
		zIndex: 200,
		collides: ig.Entity.COLLIDES.NEVER,
		lifetime: 0.6,
		size: {
			x: 1,
			y: 1
		},
		hitSnd: [
            new ig.Sound('med/sfx/hit-00.*'),
            new ig.Sound('med/sfx/hit-01.*'),
            new ig.Sound('med/sfx/hit-02.*')
        ],
		init: function (x, y, settings) {
			this.parent(x, y, settings);
			this.timer = new ig.Timer(this.lifetime);
			this.animWidth = this.animWidth / 2;
			this.animHeight = this.animHeight / 2;
			if (this.newAnimSheet) {
				this.animSheet = new ig.AnimationSheet(this.newAnimSheet, this.animWidth, this.animHeight);
				var amount = 4;
				do {
					ig.game.spawnEntity(window.RunParticleEnemy,
						this.pos.x + this.animWidth * (amount % 2),
						this.pos.y + this.animHeight * (amount % 2) - 4, {
							animSheet: this.animSheet,
							segment: amount
						});
					amount -= 1;
				} while (amount > 0);
			}
			if (this.otherAttack) {
				//this.hitSnd.random().play();
				ig.game.spawnEntity(
					window.RunParticleHit,
					this.pos.x - 12,
					this.pos.y - 16
				);
			} else {
				this.hitSnd.random().play();
				ig.game.spawnEntity(
					window.RunParticleCollide,
					this.pos.x,
					this.pos.y - 4
				);
			}
		},
		update: function () {
			if (this.timer.delta() > 0) {
				this.kill();
			}
			this.parent();
		}
	});
});