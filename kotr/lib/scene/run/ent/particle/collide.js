/*global ig*/
ig.module(
	'scene.run.ent.particle.collide'
).requires(
	//nothing
	'impact.entity'
).defines(function () {
	'use strict';
	window.RunParticleCollide = ig.Entity.extend({
		collides: ig.Entity.COLLIDES.NEVER,
		lifetime: 0.1,
		size: {
			x: 1,
			y: 1
		},
		vel: {
			x: 0,
			y: 0
		},
		animSheet: new ig.AnimationSheet('med/spr/run/particle/collide.png', 12, 12),
		init: function (x, y, settings) {
			this.parent(x, y, settings);
			//this.vel.x = (Math.random() * this.vel.x) + this.vel.x / 2;
			//this.vel.y = (Math.random() * this.vel.y) - (this.vel.y / 8);
			this.timer = new ig.Timer(this.lifetime);
			this.addAnim('base', 0.1, [0], true);
			this.currentAnim.angle = Math.random() * 4;
		},
		update: function () {
			if (this.timer.delta() > 0) {
				this.kill();
			}
			var alpha = this.timer.delta();
			this.currentAnim.alpha = alpha.map(-this.lifetime, 0, 1, 0);
			this.parent();
		}
	});
});