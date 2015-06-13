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
            y: 400
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
        attacked: false,
        jumped: false,
        velGround: 32,
        velAir: 32,
        type: ig.Entity.TYPE.A, // Player friendly group
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.PASSIVE,
        animSheet: new ig.AnimationSheet('med/spr/player.png', 16, 18),
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
            this.handleJump();
            this.handleAnims();
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
        handleJump: function () {

            if (this.standing && this.vel.x === 0 && this.collisionCounter === 1) {
                this.vel.y = -92;
                this.accel.x = 32;
                this.jumped = true;
                this.vel.x = 48;
                this.collisionCounter = 0;
                return;
            } else if (this.standing && this.vel.x === 0) {
                this.vel.x = -32;
                this.collisionCounter += 1;
                return;
            }

            if (this.standing && !ig.game.collisionMap.getTile(this.pos.x + this.size.x * 0.9, this.pos.y + this.size.y)) {
                if (this.vel.x > 32 && this.breakTime < 0.25) {
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
                }
            }
            if (this.jumped && this.standing) {
                this.vel.x = 48;
                this.accel.x = 96;
                this.jumped = false;
            }
            if (this.standing) {
                this.jumpTime = 0;

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
                }

                if (this.attacked) {
                    this.attacked = false;
                    this.jumped = true;
                    this.accel.x = 32;
                    this.vel.y = (this.bounceSpeed * 1.2).limit(-145, 0);
                    if (this.vel.x < 48) {
                        this.vel.x = 48;
                    }
                }

            }
            if (this.attacked) {
                if (this.vel.y < 0) {
                    this.vel.y = 0;
                }
                this.accel.y = 300;
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
            } else {
                this.maxVel.x = 72;
            }
        }
    });
});