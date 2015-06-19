/*global ig*/
ig.module(
    'scene.run.ent.bat-03'
).requires(
    'scene.run.ent.bat-01'
).defines(function () {
    'use strict';
    window.EntityBat03 = window.EntityBat01.extend({
        vel: {
            x: 16,
            y: 0
        },
        friction: {
            x: 0,
            y: 0
        },
        animSheet: new ig.AnimationSheet('med/spr/enemy/bat-03.png', 16, 16),
        health: 1,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            var animSeq = [[0, 1], [1, 0]];
            this.addAnim('idle', 0.09, animSeq.random());
        },
        handleAnims: function () {},
        handleMovement: function () {
            if (this.currentAnim.loopCount % 2 === 0) {
                this.vel.y = -16;
            } else {
                this.vel.y = 16;
            }
            if (this.distanceTo(ig.game.player) < 48) {
                this.vel.x = -64;
                this.accel.x = -128;
                if (ig.game.player.pos.y > this.pos.y) {
                    this.vel.y = 16;
                } else {
                    this.vel.y = -16;
                }
            }
        }
    });
});