/*global ig*/
ig.module(
	'scene.run.ent.particle.backtrack-emitter'
).requires(
	//nothing
	'impact.entity',
	'scene.run.ent.particle.backtrack'
).defines(function () {
	'use strict';
	window.RunParticleBacktrackEmitter = ig.Entity.extend({
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
		backtrackSnd: [
            new ig.Sound('med/sfx/backtrack-00.*'),
            new ig.Sound('med/sfx/backtrack-01.*'),
            new ig.Sound('med/sfx/backtrack-02.*')
        ],
		init: function (x, y, settings) {
			this.parent(x, y, settings);
			this.timer = new ig.Timer(this.lifetime);
			this.backtrackSnd.random().play();
			var amount = Math.floor(Math.random() * 2) + 5;
			do {
				ig.game.spawnEntity(window.RunParticleBacktrack, this.pos.x + (Math.floor(Math.random() * 12)), this.pos.y);
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