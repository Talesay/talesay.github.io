/*global ig*/
ig.module(
	'scene.run.ent.particle.bounce'
).requires(
	//nothing
	'impact.entity'
).defines(function () {
	'use strict';
	window.RunParticleBounce = ig.Entity.extend({
		zIndex: 200,
		collides: ig.Entity.COLLIDES.NEVER,
		lifetime: 0.1,
		size: {
			x: 1,
			y: 1
		},
		bounceSnd: [
            new ig.Sound('med/sfx/bounce-00.*'),
            new ig.Sound('med/sfx/bounce-01.*'),
            new ig.Sound('med/sfx/bounce-02.*')
        ],
		bounceMissSnd: [
            new ig.Sound('med/sfx/bounce-miss-00.*'),
            new ig.Sound('med/sfx/bounce-miss-01.*'),
            new ig.Sound('med/sfx/bounce-miss-02.*')
        ],
		animSheet: new ig.AnimationSheet('med/spr/run/particle/bounce.png', 4, 4),
		init: function (x, y, settings) {
			this.parent(x, y, settings);
			this.timer = new ig.Timer(this.lifetime);
			this.addAnim('base', 0.034, [0, 1, 2]);
			this.currentAnim.angle = Math.random() * 100;
			//if (!ig.game.collisionMap.getTile(this.pos.x + 2, this.pos.y + 13)) {
			//	this.bounceMissSnd.random().play();
			//	this.kill();
			//} else {
			//this.bounceSnd.random().play();
			//}
		},
		update: function () {
			if (this.timer.delta() > 0) {
				this.kill();
			}
			this.parent();
		}
	});
});