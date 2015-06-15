/*global ig*/
ig.module(
	'scene.run.ent.particle.bounce-miss'
).requires(
	//nothing
	'impact.entity'
).defines(function () {
	'use strict';
	window.RunParticleBounceMiss = ig.Entity.extend({
		collides: ig.Entity.COLLIDES.NEVER,
		lifetime: 0.4,
		gravityFactor: 1,
		size: {
			x: 1,
			y: 1
		},
		vel: {
			x: 10,
			y: -32
		},
		animSheet: new ig.AnimationSheet('med/spr/run/particle/land.png', 4, 4),
		init: function (x, y, settings) {
			this.parent(x, y, settings);
			this.vel.x = (Math.random() * this.vel.x) - (this.vel.x / 2);
			this.vel.y = (Math.random() * this.vel.y) - (this.vel.y / 4);
			this.timer = new ig.Timer(this.lifetime);
			this.addAnim('base', 0.1, [1,2]);
			this.currentAnim.angle = (Math.random() * 1.4) - 0.7;
		},
		update: function () {
			if (this.timer.delta() > 0) {
				this.kill();
			}
			var alpha = this.timer.delta()
			this.currentAnim.alpha = alpha.map(-this.lifetime, 0, 0.25, 0);
			this.parent();
		}
	});
});