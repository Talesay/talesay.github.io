/*global ig*/
ig.module(
    'scene.run.ent.skeleton-03'
).requires(
    'scene.run.ent.skeleton-01'
).defines(function () {
    'use strict';
    window.EntitySkeleton03 = window.EntitySkeleton01.extend({
        vel: {
            x: 0,
            y: 1
        },
        friction: {
            x: 0,
            y: 0
        },
        jumpTimer: 0,
        bounciness: 0,
        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.A,
        animSheet: new ig.AnimationSheet('med/spr/enemy/skeleton-03.png', 14, 16),
        health: 1,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            // Add the animations
            var animSeq = [[0, 1], [1, 0]];
            this.addAnim('idle', 0.24, animSeq.random());
            this.addAnim('jump', 0.24, [1]);
        },
        handleAnims: function () {
            if (this.vel.y < 0) {
                this.currentAnim = this.anims.jump;
            } else if (this.standing) {
                this.currentAnim = this.anims.idle;
            }
        },
        handleMovement: function () {
            if (this.distanceTo(ig.game.player) < 64 && !this.standing && this.jumpTimer === 0) {
                console.log('close');
                //this.accel.y = -200;
                this.vel.y -= 24;
                //this.jumpTimer = 0;
            }
            if (this.distanceTo(ig.game.player) < 96 && this.jumpTimer > 1 && this.standing) {
                this.jumpTimer = 0;
                this.vel.y = -78;
            } else {
                if (this.distanceTo(ig.game.player) > 48) {
                    this.accel.y = 100;
                } else {
                    this.accel.y = 0;
                }
                this.jumpTimer += ig.system.tick;
            }

        }
    });
});