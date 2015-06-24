/*global ig*/
ig.module(
    'scene.run.ent.particle.fireball-shoot'
).requires(
    //nothing
    'impact.entity'
).defines(function () {
    'use strict';
    window.RunParticleFireballShoot = ig.Entity.extend({
        collides: ig.Entity.COLLIDES.NEVER,
        lifetime: 0.1,
        gravityFactor: 0,
        size: {
            x: 1,
            y: 1
        },
        vel: {
            x: 0,
            y: 0
        },
        zIndex: 200,
        //this.vel.y = -110;
        //				this.vel.x = 48;
        //				this.accel.x = 64;
        animSheet: new ig.AnimationSheet('med/spr/particle/fireball-shoot-00.png', 16, 16),
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.timer = new ig.Timer(this.lifetime);
            this.addAnim('base', 1, [0], true);
            this.currentAnim.angle = (Math.random() * 4);
        },
        update: function () {
            if (this.timer.delta() > 0) {
                this.kill();
            }
            var alpha = this.timer.delta();
            this.currentAnim.alpha = alpha.map(-this.lifetime, 0, 1, 0.5);
            this.parent();
        }
    });
});