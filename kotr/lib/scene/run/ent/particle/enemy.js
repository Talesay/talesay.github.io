/*global ig*/
ig.module(
    'scene.run.ent.particle.enemy'
).requires(
    //nothing
    'impact.entity'
).defines(function () {
    'use strict';
    window.RunParticleEnemy = ig.Entity.extend({
        collides: ig.Entity.COLLIDES.NEVER,
        lifetime: 0.5,
        gravityFactor: 2,
        size: {
            x: 4,
            y: 4
        },
        vel: {
            x: -48,
            y: -128
        },
        segment: 0,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.vel.x = (Math.random() * this.vel.x) - this.vel.x * 0.7;
            this.vel.y = (Math.random() * this.vel.y * 0.7) + (this.vel.y / 3);
            this.timer = new ig.Timer(this.lifetime);
            this.addAnim('base', 1, [this.segment]);
            this.currentAnim.angle = (Math.random() * 1.4) - 0.7;
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