/*global ig*/
ig.module(
    'scene.run.ent.player'
).requires(
    'impact.entity'
).defines(function () {
    'use strict';
    window.EntityPlayer = ig.Entity.extend({
        size: {
            x: 14,
            y: 14
        },
        offset: {
            x: -1,
            y: 3
        },
        maxVel: {
            x: 72,
            y: 900
        },
        vel: {
            x: 64,
            y: 0
        },
        accel: {
            x: 32,
            y: 0
        },
        bounceSpeed: 150,
        jumpTime: 1,
        standTime: 1,
        breakTime: 1,
        collisionCounter: 0,
        airCollisionCounter: 0,
        attacked: false,
        jumped: false,
        velGround: 32,
        velAir: 32,
        deathTimer: false,
        playFanfarre: false,
        type: ig.Entity.TYPE.A, // Player friendly group
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.PASSIVE,
        animSheet: new ig.AnimationSheet('med/spr/player.png', 16, 18),
        deathFallSnd: new ig.Sound('med/sfx/death-fall.*'),
        defeatSnd: new ig.Sound('med/sfx/defeat.*'),
        backtrackSnd: [
            new ig.Sound('med/sfx/backtrack-00.*'),
            new ig.Sound('med/sfx/backtrack-01.*'),
            new ig.Sound('med/sfx/backtrack-02.*')
        ],
        bumpSnd: [
            new ig.Sound('med/sfx/bump-00.*'),
            new ig.Sound('med/sfx/bump-01.*'),
            new ig.Sound('med/sfx/bump-02.*')
        ],
        drawSnd: [
            new ig.Sound('med/sfx/draw-00.*'),
            new ig.Sound('med/sfx/draw-01.*'),
            new ig.Sound('med/sfx/draw-02.*')
        ],
        landSnd: [
            new ig.Sound('med/sfx/land-00.*'),
            new ig.Sound('med/sfx/land-01.*'),
            new ig.Sound('med/sfx/land-02.*')
        ],
        jumpSnd: [
            new ig.Sound('med/sfx/jump-00.*'),
            new ig.Sound('med/sfx/jump-01.*'),
            new ig.Sound('med/sfx/jump-02.*')
        ],
        bounceSnd: [
            new ig.Sound('med/sfx/bounce-00.*'),
            new ig.Sound('med/sfx/bounce-01.*'),
            new ig.Sound('med/sfx/bounce-02.*')
        ],
        health: 5,
        init: function (x, y, settings) {
            this.parent(x, y, settings);

            // Add the animations
            this.addAnim('run', 0.18, [2, 3]);
            this.addAnim('backtrack', 0.06, [2, 3]);
            this.addAnim('idle', 0.34, [0, 1]);
            this.addAnim('poke', 0.28, [3, 4]);
            this.addAnim('jump', 1, [5], true);
            this.addAnim('fall', 1, [8], true);
            this.addAnim('attack', 1, [6], true);
            this.addAnim('pain', 1, [7], true);

            // Set a reference to the player on the game instance
            ig.game.player = this;
        },


        update: function () {
            this.handleOffscreen();
            this.handleMovement();
            this.handleAnims();
            if (this.deathTimer) {
                if (this.deathTimer.delta() > -5.5 && this.playFanfarre) {
                    this.playFanfarre = false;
                    this.defeatSnd.play();
                }
                if (this.deathTimer.delta() > 0) {
                    this.kill();
                }
            }
            this.parent();
        },
        handleOffscreen: function () {
            if (this.pos.y > 70) {
                this.deferredKill(7);
            }
        },
        deferredKill: function (wait) {
            if (!this.deathTimer) {
                ig.music.fadeOut(1.7);
                this.deathFallSnd.play();
                this.playFanfarre = true;
                this.deathTimer = new ig.Timer(wait);
            }
        },
        kill: function () {
            ig.scene.set(ig.SceneRun, {
                level: {
                    start: ig.LevelStart,
                    end: ig.LevelEnd,
                    pieces: [
                        ig.LevelOther,
                        ig.LevelSegment00,
                        ig.LevelSegment01,
                        ig.LevelSegment02,
                        ig.LevelSegment03,
                        ig.LevelSegment04,
                        ig.LevelSegment05,
                        ig.LevelSegment06,
                        ig.LevelSegment07
                    ],
                    length: 25,
                    checkX: false,
                    checkY: false
                }
            });
            this.parent();
        },
        handleAnims: function () {
            if ((this.standing && this.breakTime > 0) || (this.standing && this.vel.x < 0)) {
                this.currentAnim = this.anims.backtrack;
            } else if (this.standing && this.vel.x === 0) {
                this.currentAnim = this.anims.idle;
            } else if (this.standing) {
                this.currentAnim = this.anims.run;
            } else if (this.attacked) {
                this.currentAnim = this.anims.attack;
            } else if (!this.standing && this.vel.y < 0) {
                this.currentAnim = this.anims.jump;
            } else if (!this.standing && this.currentAnim !== this.anims.fall) {
                this.currentAnim = this.anims.fall;
            }
        },
        handleMovement: function () {
            if (!this.standing) {
                if ((this.vel.x === 0 && this.airCollisionCounter === 0) || (this.vel.y === 0 && this.airCollisionCounter === 0)) {
                    this.bumpSnd.random().play();
                    this.airCollisionCounter += 1;
                }
            }

            if (this.standing && this.vel.x === 0 && this.collisionCounter === 1) {
                this.vel.y = -92;
                this.accel.x = 32;
                this.jumped = true;
                this.vel.x = 48;
                this.collisionCounter = 0;
                this.jumpSnd.random().play();
                return;
            } else if (this.standing && this.vel.x === 0) {
                this.vel.x = -32;
                this.collisionCounter += 1;
                this.bumpSnd.random().play();
                return;
            }

            if (this.standing && !ig.game.collisionMap.getTile(this.pos.x + this.size.x * 0.9, this.pos.y + this.size.y)) {
                if (this.vel.x > 32 && this.breakTime < 0.25 && !this.attacked) {
                    if (this.breakTime === 0) {
                        this.backtrackSnd.random().play();
                    }
                    this.friction.x = 160;
                    this.breakTime += ig.system.tick;
                    this.accel.x = 0;
                } else {
                    this.accel.x = 10;
                }
            } else {
                this.breakTime = 0;
                this.friction.x = 0;
                this.accel.x = 64;
            }
            if (!this.standing && ig.input.pressed('click') && !this.attacked && this.jumped) {
                this.bounceSpeed = -ig.system.height + this.last.y;
                if (this.bounceSpeed < -90) {
                    this.attacked = true;
                    this.jumped = false;
                    this.drawSnd.random().play();
                }
            }
            if (this.jumped && this.standing) {
                this.vel.x = 48;
                this.accel.x = 96;
                this.jumped = false;
                this.landSnd.random().play();
            }
            if (this.standing) {
                this.jumpTime = 0;
                this.airCollisionCounter = 0;
                if (ig.input.pressed('click') && !this.attacked) {
                    if (this.vel.x > 0) {
                        this.vel.y = -138;
                        this.accel.x = 32;
                        this.jumped = true;
                        if (this.vel.x < 48) {
                            this.vel.x = 48;
                        }
                    } else {
                        this.vel.y = -110;
                        this.vel.x = 48;
                        this.accel.x = 64;
                        this.jumped = true;
                    }
                    this.jumpSnd.random().play();
                }

                if (this.attacked) {
                    this.attacked = false;
                    this.jumped = true;
                    this.accel.x = 32;
                    this.vel.y = (this.bounceSpeed * 1.2).limit(-145, 0);
                    if (this.vel.x < 48) {
                        this.vel.x = 48;
                    }
                    this.bounceSnd.random().play();
                }

            }
            if (this.attacked) {
                if (this.vel.y < 128) {
                    this.vel.y = 128;
                }
                this.accel.y = 600;
                return;
            }
            if (this.vel.y > 0) {
                this.jumped = true;
                this.collisionCounter = 0;
                this.standTime = 0;
                if (this.accel.x < 0) {
                    this.accel.x = 0;
                }
            } else {
                this.standTime += ig.system.tick;
            }
            if (this.vel.y < 0 && ig.input.state('click')) {
                this.jumpTime += ig.system.tick;
            }
            if (this.jumpTime > 0.67) {
                if (this.vel.y < 0) {
                    this.accel.y = 0;
                }
            } else if (!ig.input.state('click')) {
                this.accel.y = 32;
            } else if (this.jumpTime > 0 && ig.input.state('click')) {
                this.accel.y = -32; //The general acceleration of the jump
            }

            if (this.pos.y <= -32) {
                this.accel.y = 72;
                this.accel.x = 64;
                this.maxVel.x = 78;
            } else if (this.pos.y <= -60) {
                this.accel.y = 84;
            } else {
                this.maxVel.x = 72;
            }
        }
    });
});