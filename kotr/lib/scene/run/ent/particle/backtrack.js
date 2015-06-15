/*global ig*/
ig.module(
	'scene.run.ent.particle.backtrack'
).requires(
	//nothing
	'impact.entity'
).defines(function () {
	'use strict';
	window.RunParticleBacktrack = ig.Entity.extend({
		collides: ig.Entity.COLLIDES.NEVER,
		lifetime: 0.4,
		gravityFactor: 0.5,
		size: {
			x: 2,
			y: 2
		},
		vel: {
			x: 32,
			y: -64
		},
		animSheet: new ig.AnimationSheet('med/spr/run/particle/land.png', 4, 4),
		init: function (x, y, settings) {
			this.parent(x, y, settings);
			this.vel.x = (Math.random() * this.vel.x) + this.vel.x / 2;
			this.vel.y = (Math.random() * this.vel.y) - (this.vel.y / 4);
			this.timer = new ig.Timer(this.lifetime);
			this.addAnim('base', 0.1, [0, 1, 2], true);
			this.currentAnim.angle = (Math.random() * 1.4) + 0.7;
		},
		update: function () {
			if (this.timer.delta() > 0) {
				this.kill();
			}
			var alpha = this.timer.delta()
			this.currentAnim.alpha = alpha.map(-this.lifetime, 0, 0.35, 0);
			this.parent();
		}
	});
});