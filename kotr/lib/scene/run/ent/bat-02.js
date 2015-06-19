/*global ig*/
ig.module(
    'scene.run.ent.bat-02'
).requires(
    'scene.run.ent.bat-01'
).defines(function () {
    'use strict';
    window.EntityBat02 = window.EntityBat01.extend({
        vel: {
            x: -32,
            y: 0
        },
        friction: {
            x: 0,
            y: 0
        },
        animSheet: new ig.AnimationSheet('med/spr/enemy/bat-02.png', 16, 16),
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
        }
    });
});