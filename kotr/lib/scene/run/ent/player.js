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
            x: 64,
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
            if (this.standing && this.vel.x < 0) {
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
            if (this.standing) {
                if (!ig.game.collisionMap.getTile(this.pos.x + this.size.x, this.pos.y + this.size.y)) {
                    if (this.vel.x > 0) {
                        this.accel.x = -64;
                        this.vel.x = this.vel.x * 0.5;
                    }
                }
                if (this.vel.x < 0) {
                    if (this.vel.x <= -24) {
                        this.accel.x = 0;
                        this.vel.x = 0;
                    }
                    if (!ig.game.collisionMap.getTile(this.pos.x - this.size.x / 2, this.pos.y + this.size.y)) {
                        this.accel.x = 0;
                        this.vel.x = 0;
                    }
                }
            }
            if (!this.standing && ig.input.pressed('click') && !this.attacked && this.jumped) {

                this.bounceSpeed = -ig.system.height + this.pos.y;
                if (this.bounceSpeed < -90) {
                    this.attacked = true;
                    this.jumped = false;
                }
            }
            if (this.jumped && this.standing) {
                this.vel.x = 32;
                this.accel.x = 32;
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
                if (this.accel.x < 0) {
                    this.accel.x = 0;
                }
            }
            if (this.vel.y < 0 && ig.input.state('click')) {
                this.jumpTime += ig.system.tick;
            }
            if (this.jumpTime > 0.7) {
                if (this.vel.y < 0) {
                    this.accel.y = 0;
                }
            } else if (!ig.input.state('click')) {
                this.accel.y = 32;
            } else if (this.jumpTime > 0 && ig.input.state('click')) {
                this.accel.y = -32; //The general acceleration of the jump
            }
        }
    });


});