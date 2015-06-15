/*global ig*/
ig.module(
    'scene.run.ent.particle.jump'
).requires(
    //nothing
    'impact.entity'
).defines(function () {
    'use strict';
    window.RunParticleJump = ig.Entity.extend({
        collides: ig.Entity.COLLIDES.NEVER,
        lifetime: 0.25,
        gravityFactor: 1.1,
        size: {
            x: 1,
            y: 1
        },
        vel: {
            x: -48,
            y: -78
        },
        //this.vel.y = -110;
        //				this.vel.x = 48;
        //				this.accel.x = 64;
        animSheet: new ig.AnimationSheet('med/spr/run/particle/land.png', 4, 4),
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.vel.x = (Math.random() * this.vel.x) - this.vel.x * 0.7;
            this.vel.y = (Math.random() * this.vel.y * 0.7) + (this.vel.y / 3);
            this.timer = new ig.Timer(this.lifetime);
            this.addAnim('base', 0.1, [0, 1, 2]);
            this.currentAnim.angle = (Math.random() * 1.4) - 0.7;
        },
        update: function () {
            if (this.timer.delta() > 0) {
                this.kill();
            }
            var alpha = this.timer.delta();
            this.currentAnim.alpha = alpha.map(-this.lifetime, 0, 0.25, 0);
            this.parent();
        }
    });
});