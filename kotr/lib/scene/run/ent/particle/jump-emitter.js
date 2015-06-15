/*global ig*/
ig.module(
	'scene.run.ent.particle.jump-emitter'
).requires(
	//nothing
	'impact.entity',
	'scene.run.ent.particle.jump'
).defines(function () {
	'use strict';
	window.RunParticleJumpEmitter = ig.Entity.extend({
		zIndex: 200,
		collides: ig.Entity.COLLIDES.NEVER,
		lifetime: 0.6,
		size: {
			x: 2,
			y: 2
		},
		jumpSnd: [
            new ig.Sound('med/sfx/jump-00.*'),
            new ig.Sound('med/sfx/jump-01.*'),
            new ig.Sound('med/sfx/jump-02.*')
        ],
		init: function (x, y, settings) {
			this.parent(x, y, settings);
			this.timer = new ig.Timer(this.lifetime);
			this.jumpSnd.random().play();
			var amount = Math.floor(Math.random() * 2) + 3;
			do {
				ig.game.spawnEntity(window.RunParticleJump, this.pos.x + (Math.floor(Math.random() * 4) - 4), this.pos.y + 3);
				amount -= 1;
			} while (amount > 1);
		},
		update: function () {
			if (this.timer.delta() > 0) {
				this.kill();
			}
			this.parent();
		}
	});
});