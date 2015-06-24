/*global ig*/
ig.module(
    'scene.run.ent.slime-01'
).requires(
    'impact.entity',
    'scene.run.ent.particle.enemy-emitter',
    'scene.run.ent.particle.bubble-emitter'
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
            x: 128,
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
        collisionTimer: 0,
        lifetime: 2,
        splitScale: 1,
        slimeLevel: 1,
        timer: undefined,
        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.ACTIVE,
        animSheet: new ig.AnimationSheet('med/spr/enemy/slime-01.png', 16, 16),
        slimeSnd: [
            new ig.Sound('med/sfx/slime-00.*'),
            new ig.Sound('med/sfx/slime-01.*'),
            new ig.Sound('med/sfx/slime-02.*'),
            new ig.Sound('med/sfx/slime-03.*')
        ],
        health: 1,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            var animSeq = [[0, 1], [1, 0]];
            this.addAnim('idle', 0.24, animSeq.random());
        },
        split: function (attacked) {
            this.collides = ig.Entity.COLLIDES.PASSIVE;
            if (attacked) {
                if (this.id % 2 === 0) {
                    this.vel.x = [64, 104].random() - (this.id % 5);
                    this.accel.x = [6, 14].random() - (this.id % 3);
                    this.accel.y = [6, 14].random() - (this.id % 2);
                } else {
                    this.vel.x = [-6, 0].random();
                    this.accel.x = [0, -12].random() - (this.id % 7);
                    this.accel.y = [18, 12].random() - (this.id % 11);
                }
            } else {
                if (this.id % 2 === 0) {
                    this.vel.x = [-32, -64].random() - (this.id % 5);
                    this.accel.x = [-6, -14].random() - (this.id % 3);
                    this.accel.y = [6, 14].random() - (this.id % 2);
                } else {
                    this.vel.x = [32, 64].random();
                    this.accel.x = [6, 12].random() - (this.id % 7);
                    this.accel.y = [18, 12].random() - (this.id % 11);
                }
            }
            this.vel.y = [-108, -96, -64, -48].random() + (this.id % 13);
            this.timer = new ig.Timer(this.lifetime);
        },
        spawnOthers: function (attacked) {},
        unite: function () {
            ig.game.spawnEntity(window.EntitySlime02, this.pos.x, this.pos.y);
        },
        draw: function () {
            if (this.currentAnim) {
                var c = document.getElementById('canvas'),
                    ctx = c.getContext('2d');
                ctx.save();
                ctx.translate(ig.system.getDrawPos(this.pos.x - this.offset.x - ig.game.screen.x),
                    ig.system.getDrawPos(this.pos.y - this.offset.y - ig.game.screen.y));
                ctx.scale(this.splitScale, this.splitScale);
                this.currentAnim.draw(
                    0,
                    0
                );
                ctx.restore();
            }
        },
        update: function () {
            if (ig.game.player.pos.x < this.pos.x - ig.system.width) {
                return;
            } else if (this.pos.x + this.size.x < ig.game.screen.x || this.pos.y > 80 || this.pos.y < -80) {
                ig.game.removeEntity(this);
            }
            if ((this.collides === ig.Entity.COLLIDES.PASSIVE && this.timer.delta() > 0) || (this.collides === ig.Entity.COLLIDES.PASSIVE && this.standing)) {
                this.collides = ig.Entity.COLLIDES.ACTIVE;
                this.currentAnim.alpha = 1;
                this.splitScale = 1;
                this.currentAnim.angle = 0;
                this.accel = {
                    x: 0,
                    y: 0
                };
                this.vel.x = 0;
            } else if (this.collides === ig.Entity.COLLIDES.PASSIVE) {
                var alpha = this.timer.delta();
                this.currentAnim.alpha = alpha.map(-this.lifetime, 0, 0.5, 1);
                this.splitScale = alpha.map(-this.lifetime, 0, 0.75, 1);
                if (this.vel.y < 0) {
                    this.currentAnim.angle -= ig.system.tick;
                } else {
                    this.currentAnim.angle += ig.system.tick;
                }
            }
            this.collisionTimer += ig.system.tick;
            this.handleMovement();
            this.handleAnims();
            this.parent();
        },
        collideWith: function (other, axis) {
            if (other.type === ig.Entity.TYPE.B) {
                this.vel.x = -this.vel.x;
                this.currentAnim.flip.x = !this.currentAnim.flip.x;
                if (other.slimeLevel) {
                    if (other.slimeLevel < this.slimeLevel && this.collisionTimer > 0.1) {
                        this.collisionTimer = 0;
                        this.slimeSnd.random().play();
                        other.spawnOthers(false);
                        ig.game.removeEntity(other);
                        ig.game.spawnEntity(
                            window.RunParticleBubbleEmitter,
                            this.pos.x,
                            this.pos.y
                        );
                    } else if (other.slimeLevel === this.slimeLevel) {
                        if (other.id < this.id) {
                            this.slimeSnd.random().play();
                            ig.game.removeEntity(other);
                            this.unite();
                            ig.game.removeEntity(this);
                        }
                    }
                } else {
                    ig.game.removeEntity(this);
                }
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
                newAnimSheet: false,
                animWidth: this.currentAnim.sheet.width,
                animHeight: this.currentAnim.sheet.height,
                otherAttack: attacked
            });
            ig.game.spawnEntity(
                window.RunParticleBubbleEmitter,
                this.pos.x,
                this.pos.y
            );
            this.parent();
        },
        handleAnims: function () {},
        handleMovement: function () {
            var cliff = !ig.game.collisionMap.getTile(this.pos.x + (this.currentAnim.flip.x ? this.size.x + 4 : -2), this.pos.y + this.size.y + 1);
            if (this.flipTimer > 0.3 && cliff) {
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