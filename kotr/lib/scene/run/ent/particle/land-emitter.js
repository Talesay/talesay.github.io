/*global ig*/
ig.module(
	'scene.run.ent.particle.land-emitter'
).requires(
	//nothing
	'impact.entity',
	'scene.run.ent.particle.land'
).defines(function () {
	'use strict';
	window.RunParticleLandEmitter = ig.Entity.extend({
		zIndex: 200,
		collides: ig.Entity.COLLIDES.NEVER,
		lifetime: 0.6,
		size: {
			x: 2,
			y: 2
		},
		vel: {
			x: 20,
			y: -64
		},
		landSnd: [
            new ig.Sound('med/sfx/land-00.*'),
            new ig.Sound('med/sfx/land-01.*'),
            new ig.Sound('med/sfx/land-02.*')
        ],
		init: function (x, y, settings) {
			this.parent(x, y, settings);
			this.timer = new ig.Timer(this.lifetime);
			this.landSnd.random().play();
			var amount = Math.floor(Math.random() * 3) + 4;
			do {
				ig.game.spawnEntity(window.RunParticleLand, this.pos.x + (Math.floor(Math.random() * 12) - 6), this.pos.y);
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