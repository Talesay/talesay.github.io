/*global ig*/
ig.module(
    'scene.run.ent.slime-01'
).requires(
    'impact.entity',
    'scene.run.ent.particle.enemy-emitter'
).defines(function () {
    'use strict';
    window.EntitySlime01 = ig.Entity.extend({
        size: {
            x: 8,
            y: 10
        },
        offset: {
            x: 2,
            y: 3
        },
        maxVel: {
            x: 72,
            y: 900
        },
        vel: {
            x: 0,
            y: 1
        },
        accel: {
            x: 0,
            y: 0
        },
        friction: {
            x: 32,
            y: 0
        },
        jumpTimer: 0,
        flipTimer: 0,
        lifetime: 2,
        timer: undefined,
        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.ACTIVE,
        animSheet: new ig.AnimationSheet('med/spr/enemy/slime-01.png', 16, 16),
        health: 1,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            var animSeq = [[0, 1], [1, 0]];
            this.addAnim('idle', 0.24, animSeq.random());
        },
        split: function () {
            this.collides = ig.Entity.COLLIDES.PASSIVE;
            if (this.id % 2 === 0) {
                this.vel.x = [64, 104].random();
                this.accel.x = [6, 14].random();
                this.accel.y = [6, 14].random();
            } else {
                this.vel.x = [98, 68].random();
                this.accel.x = [18, 12].random();
                this.accel.y = [18, 12].random();
            }
            this.vel.y = [-108, -96, -64, -48].random();
            this.timer = new ig.Timer(this.lifetime);
        },
        update: function () {
            if (ig.game.player.pos.x < this.pos.x - 196) {
                return;
            } else if (ig.game.player.pos.x > this.pos.x + 96) {
                ig.game.removeEntity(this);
            }
            if ((this.collides === ig.Entity.COLLIDES.PASSIVE && this.timer.delta() > 0) || (this.collides === ig.Entity.COLLIDES.PASSIVE && this.standing)) {
                this.collides = ig.Entity.COLLIDES.ACTIVE;
                this.currentAnim.alpha = 1;
                this.accel = {
                    x: 0,
                    y: 0
                };
            } else if (this.collides === ig.Entity.COLLIDES.PASSIVE) {
                var alpha = this.timer.delta();
                this.currentAnim.alpha = alpha.map(-this.lifetime, 0, 0.5, 1);
            }
            this.handleMovement();
            this.handleAnims();
            this.parent();
        },
        collideWith: function (other, axis) {
            if (other.type === ig.Entity.TYPE.B) {
                if (this.pos.x < other.pos.x) {
                    if (other.id < this.id) {
                        this.kill();
                    }
                    this.vel.x = -32;
                } else {
                    if (other.id < this.id) {
                        this.kill();
                    }
                    this.vel.x = 32;
                }
                this.currentAnim.flip.x = !this.currentAnim.flip.x;
            }
            if (other.attacked && other.type === ig.Entity.TYPE.A) {
                other.crit();
                this.kill(true);
                return;
            }
            if (other.type === ig.Entity.TYPE.A) {
                other.hit();
                this.kill(false);
            }
        },
        kill: function (attacked) {
            ig.game.spawnEntity(window.RunParticleEnemyEmitter, this.pos.x, this.pos.y, {
                newAnimSheet: this.currentAnim.sheet.image.path,
                animWidth: this.currentAnim.sheet.width,
                animHeight: this.currentAnim.sheet.height,
                otherAttack: attacked
            });
            this.parent();
        },
        handleAnims: function () {},
        handleMovement: function () {
            if (this.flipTimer > 0.3 && !ig.game.collisionMap.getTile(
                    this.pos.x + (this.currentAnim.flip.x ? this.size.x + 4 : -2),
                    this.pos.y + this.size.y + 1
                )) {
                if (this.standing) {
                    this.vel.x = -this.vel.x;
                }
                this.flipTimer = 0;
                if (this.vel.x > 0) {
                    this.currentAnim.flip.x = true;
                } else {
                    this.currentAnim.flip.x = false;
                }
            }
            this.flipTimer += ig.system.tick;
            if ((this.distanceTo(ig.game.player) < 48 && this.jumpTimer > 0.5 && this.standing)) {
                this.vel.x = [16, -16].random();
                this.jumpTimer = 0;
                this.vel.y = -54;
            } else {
                if (this.distanceTo(ig.game.player) > 48) {
                    this.accel.y = 128;
                } else {
                    this.accel.y = 0;
                }
                this.jumpTimer += ig.system.tick;
            }
        }
    });
});