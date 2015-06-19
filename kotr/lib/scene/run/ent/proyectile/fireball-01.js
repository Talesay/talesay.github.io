/*global ig*/
ig.module(
    'scene.run.ent.proyectile.fireball-01'
).requires(
    'impact.entity',
    'scene.run.ent.particle.enemy-emitter'
).defines(function () {
    'use strict';
    window.EntityFireball01 = ig.Entity.extend({
        size: {
            x: 2,
            y: 8
        },
        offset: {
            x: 0,
            y: 0
        },
        maxVel: {
            x: 200,
            y: 900
        },
        vel: {
            x: -64,
            y: 0
        },
        accel: {
            x: -128,
            y: 0
        },
        gravityFactor: 0,
        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.ACTIVE,
        animSheet: new ig.AnimationSheet('med/spr/enemy/proyectile/fireball-01.png', 8, 8),
        health: 1,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            var animSeq = [[0, 1], [1, 0]];
            this.addAnim('idle', 0.032, animSeq.random());
        },
        update: function () {
            if (ig.game.player.pos.x < this.pos.x - 196) {
                return;
            } else if (ig.game.player.pos.x > this.pos.x - 10) {
                this.collides = ig.Entity.COLLIDES.NEVER;
            } else if (ig.game.player.pos.x > this.pos.x + 96) {
                ig.game.removeEntity(this);
            }
            this.handleMovement();
            this.handleAnims();
            this.parent();
        },
        collideWith: function (other, axis) {
            if (other.type === ig.Entity.TYPE.A) {
                other.hit();
                this.collides = ig.Entity.COLLIDES.NEVER;
                this.vel.x = -96;
            } else {
                this.collides = ig.Entity.COLLIDES.NEVER;
                this.vel.x = -96;
            }
        },
        handleAnims: function () {},
        handleMovement: function () {}
    });
});