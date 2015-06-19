/*global ig*/
ig.module(
    'scene.run.ent.skeleton-04'
).requires(
    'scene.run.ent.skeleton-01'
).defines(function () {
    'use strict';
    window.EntitySkeleton04 = window.EntitySkeleton01.extend({
        vel: {
            x: -32,
            y: 1
        },
        friction: {
            x: 0,
            y: 0
        },
        jumpTimer: 0,
        flipTimer: 0,
        animSheet: new ig.AnimationSheet('med/spr/enemy/skeleton-04.png', 14, 16),
        health: 1,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            var animSeq = [[0, 1], [1, 0]];
            this.addAnim('idle', 0.24, animSeq.random());
            this.addAnim('jump', 0.24, [1]);
        },
        collideWith: function (other, axis) {
            if (other.type === ig.Entity.TYPE.B) {
                if (this.pos.x < other.pos.x) {
                    this.vel.x = -32;
                } else {
                    this.vel.x = 32;
                }
                this.currentAnim.flip.x = !this.currentAnim.flip.x;
            }
            this.parent(other, axis);
        },
        handleAnims: function () {
            if (this.vel.y < 0) {
                this.currentAnim = this.anims.jump;
            } else if (this.standing) {
                this.currentAnim = this.anims.idle;
            }
        },
        handleMovement: function () {
            if (this.flipTimer > 0.3 && !ig.game.collisionMap.getTile(
                    this.pos.x + (this.currentAnim.flip.x ? this.size.x + 4 : -2),
                    this.pos.y + this.size.y + 1
                )) {
                if (this.standing) {
                    this.vel.x = -this.vel.x;
                }
                this.flipTimer = 0;
            }
            this.flipTimer += ig.system.tick;
            if (this.vel.x > 0) {
                this.currentAnim.flip.x = true;
            } else {
                this.currentAnim.flip.x = false;
            }
            if (this.distanceTo(ig.game.player) < 48 && !this.standing && this.jumpTimer === 0) {
                //this.accel.y = -200;
                this.vel.y -= 24;
                //this.jumpTimer = 0;
            }
            if (this.distanceTo(ig.game.player) < 48 && this.jumpTimer > 1 && this.standing) {
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