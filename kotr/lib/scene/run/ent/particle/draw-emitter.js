/*global ig*/
ig.module(
	'scene.run.ent.particle.draw-emitter'
).requires(
	//nothing
	'impact.entity',
	'scene.run.ent.particle.land'
).defines(function () {
	'use strict';
	window.RunParticleDrawEmitter = ig.Entity.extend({
		zIndex: 200,
		collides: ig.Entity.COLLIDES.NEVER,
		lifetime: 0.032,
		size: {
			x: 2,
			y: 2
		},
		vel: {
			x: 0,
			y: -64
		},
		drawSnd: [
            new ig.Sound('med/sfx/draw-00.*'),
            new ig.Sound('med/sfx/draw-01.*'),
            new ig.Sound('med/sfx/draw-02.*')
        ],
		animSheet: new ig.AnimationSheet('med/spr/run/particle/draw.png', 10, 10),
		init: function (x, y, settings) {
			this.parent(x, y, settings);
			this.addAnim('base', 1, [[0], [1]].random());
			this.currentAnim.flip.x = [true, false].random();
			this.timer = new ig.Timer(this.lifetime);
			this.drawSnd.random().play();
		},
		update: function () {
			if (this.timer.delta() > 0) {
				this.kill();
			}
			var alpha = this.timer.delta()
			this.currentAnim.alpha = alpha.map(-this.lifetime, 0, 0.8, 0);
			this.parent();
		}
	});
});