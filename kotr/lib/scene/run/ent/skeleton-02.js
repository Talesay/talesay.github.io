/*global ig*/
ig.module(
    'scene.run.ent.skeleton-02'
).requires(
    'scene.run.ent.skeleton-01'
).defines(function () {
    'use strict';
    window.EntitySkeleton02 = window.EntitySkeleton01.extend({
        vel: {
            x: -32,
            y: 1
        },
        friction: {
            x: 0,
            y: 0
        },
        flipTimer: 0,
        minBounceVelocity: 10,
        bounciness: 1,
        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.A,
        animSheet: new ig.AnimationSheet('med/spr/enemy/skeleton-02.png', 14, 16),
        health: 1,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            // Add the animations
            var animSeq = [[0, 1], [1, 0]];
            this.addAnim('idle', 0.24, animSeq.random());
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
        handleAnims: function () {},
        handleMovement: function () {
            // Near an edge? return!
            if (this.flipTimer > 0.3 && !ig.game.collisionMap.getTile(
                    this.pos.x + (this.currentAnim.flip.x ? this.size.x + 4 : -2),
                    this.pos.y + this.size.y + 1
                )) {
                //this.flip = !this.flip;
                this.vel.x = -this.vel.x;
                this.flipTimer = 0;
            }
            this.flipTimer += ig.system.tick;
            if (this.vel.x > 0) {
                this.currentAnim.flip.x = true;
            } else {
                this.currentAnim.flip.x = false;
            }

        }
    });
});