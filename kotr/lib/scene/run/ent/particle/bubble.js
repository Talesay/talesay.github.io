/*global ig*/
ig.module(
    'scene.run.ent.particle.bubble'
).requires(
    //nothing
    'impact.entity'
).defines(function () {
    'use strict';
    window.RunParticleBubble = ig.Entity.extend({
        collides: ig.Entity.COLLIDES.NEVER,
        lifetime: 0.7,
        gravityFactor: 0.1,
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
        animSheet: new ig.AnimationSheet('med/spr/particle/bubble-00.png', 16, 16),
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.vel.x = (Math.random() * this.vel.x) - this.vel.x * 0.7;
            this.vel.y = (Math.random() * this.vel.y * 0.7) + (this.vel.y / 3);
            this.timer = new ig.Timer(this.lifetime);
            var animSeq = [[0, 1, 2], [0, 1], [0]];
            this.addAnim('base', 0.2, animSeq.random(), true);
            this.currentAnim.angle = (Math.random() * 1.4) - 0.7;
        },
        update: function () {
            if (this.timer.delta() > 0) {
                this.kill();
            }
            var alpha = this.timer.delta();
            this.currentAnim.alpha = alpha.map(-this.lifetime, 0, 0.9, 0);
            this.parent();
        }
    });
});