/*global ig*/
ig.module(
	'scene.run.ent.particle.bounce-emitter'
).requires(
	//nothing
	'impact.entity',
	'scene.run.ent.particle.bounce',
	'scene.run.ent.particle.bounce-miss'
).defines(function () {
	'use strict';
	window.RunParticleBounceEmitter = ig.Entity.extend({
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
		init: function (x, y, settings) {
			this.parent(x, y, settings);
			this.timer = new ig.Timer(this.lifetime);
			if (!ig.game.collisionMap.getTile(this.pos.x + 2, this.pos.y + 13)) {
				this.bounceMissSnd.random().play();
				this.emitDust();
			} else {
				this.emitDust();
				ig.game.spawnEntity(window.RunParticleBounce, this.pos.x, this.pos.y);
				this.bounceSnd.random().play();
			}
		},
		emitDust: function () {
			var amount = Math.floor(Math.random() * 2) + 5;
			do {
				ig.game.spawnEntity(
					window.RunParticleBounceMiss,
					this.pos.x + (Math.floor(Math.random() * 8) - 5),
					this.pos.y
				);
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