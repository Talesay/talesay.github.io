/*global ig*/
ig.module(
    'scene.run.ent.particle.bubble-emitter'
).requires(
    //nothing
    'impact.entity',
    'scene.run.ent.particle.bubble'
).defines(function () {
    'use strict';
    window.RunParticleBubbleEmitter = ig.Entity.extend({
        zIndex: 200,
        collides: ig.Entity.COLLIDES.NEVER,
        lifetime: 0.1,
        size: {
            x: 1,
            y: 1
        },
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.timer = new ig.Timer(this.lifetime);
            this.emitDust();
        },
        emitDust: function () {
            var amount = Math.floor(Math.random()) + 3;
            do {
                ig.game.spawnEntity(
                    window.RunParticleBubble,
                    this.pos.x + (Math.floor(Math.random() * 8) - 5),
                    this.pos.y
                );
                amount -= 1;
            } while (amount > 0);
        },
        update: function () {
            if (this.timer.delta() > 0) {
                this.kill();
            }
            this.parent();
        }
    });
});