/*global ig*/
ig.module(
	'scene.run.ent.player'
).requires(
	'impact.entity',
	'scene.run.ent.particle.combo',
	'scene.run.ent.particle.bounce-emitter',
	'scene.run.ent.particle.land-emitter',
	'scene.run.ent.particle.run-emitter',
	'scene.run.ent.particle.backtrack-emitter',
	'scene.run.ent.particle.draw-emitter',
	'scene.run.ent.particle.jump-emitter'
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
		dustEmitTime: 0,
		breakTime: 1,
		collisionCounter: 0,
		airCollisionCounter: 0,
		critCounter: 0,
		critTimer: 0,
		critLimit: 2,
		attacked: false,
		jumped: false,
		velGround: 32,
		velAir: 32,
		deathTimer: false,
		type: ig.Entity.TYPE.A, // Player friendly group
		checkAgainst: ig.Entity.TYPE.BOTH,
		collides: ig.Entity.COLLIDES.PASSIVE,
		animSheet: new ig.AnimationSheet('med/spr/player.png', 16, 18),
		deathFallSnd: new ig.Sound('med/sfx/death-fall.*'),
		bumpSnd: [
            new ig.Sound('med/sfx/bump-00.*'),
            new ig.Sound('med/sfx/bump-01.*'),
            new ig.Sound('med/sfx/bump-02.*')
        ],
		critSnd: [
            new ig.Sound('med/sfx/critical-00.*'),
            new ig.Sound('med/sfx/critical-01.*'),
            new ig.Sound('med/sfx/critical-02.*'),
            new ig.Sound('med/sfx/critical-03.*'),
            new ig.Sound('med/sfx/critical-04.*'),
            new ig.Sound('med/sfx/critical-05.*'),
            new ig.Sound('med/sfx/critical-06.*'),
            new ig.Sound('med/sfx/critical-07.*')
        ],
		health: 3,
		hurt: false,
		hurtTimer: 0,
		invisTimer: 0,
		flashCounter: 2,
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
			this.addAnim('hurt', 0.13, [7, 11]);
			this.addAnim('combo', 0.13, [9]);
			// Set a reference to the player on the game instance
			ig.game.player = this;
		},
		update: function () {
			this.handleOffscreen();
			this.handleMovement();
			this.handleAnims();
			if (this.deathTimer) {
				if (this.deathTimer.delta() > 0) {
					this.kill();
				}
			}
			this.parent();
		},
		handleOffscreen: function () {
			if (this.pos.y > 70) {
				this.deferredKill(2.32);
			}
		},
		deferredKill: function (wait) {
			if (!this.deathTimer) {
				ig.music.fadeOut(1.7);
				this.deathFallSnd.play();
				this.deathTimer = new ig.Timer(wait);
			}
		},
		kill: function () {
			ig.scene.set(ig.SceneRun, {
				level: {
					start: ig.LevelStart,
					end: ig.LevelEnd,
					pieces: [
                        ig.LevelA00,
                        ig.LevelA01,
                        ig.LevelA02,
                        ig.LevelA03,
                        ig.LevelA03,
                        ig.LevelA04,
                        ig.LevelA05,
                        ig.LevelA06,
                        ig.LevelA07,
                        ig.LevelA08,
                        ig.LevelA09,
                        ig.LevelA10,
                        ig.LevelA11,
                        ig.LevelA12,
                        ig.LevelA13,
                        ig.LevelA14,
                        ig.LevelA15
                    ],
					length: 41,
					checkX: false,
					checkY: false
				}
			});
			this.parent();
		},
		hit: function () {
			if (this.invisTimer < 0) {
				this.hurt = true;
				this.health -= 1;
				this.critCounter = 0;
			}
		},
		crit: function () {
			if (this.critCounter > 6) {
				this.critSnd[7].play();
				this.critCounter = 0;
				this.health += 1;
				ig.game.spawnEntity(window.RunParticleCombo, this.pos.x + 7, this.pos.y + 10);
			} else {
				this.critSnd[this.critCounter].play();
				this.critCounter += 1;
			}

			this.critTimer = 0;

		},
		collideWith: function (other, axis) {
			if (this.hurt && other.type === ig.Entity.TYPE.B) {
				other.kill(false);
				return;
			}
		},
		handleAnims: function () {
			if (ig.Timer.timeScale < 1) {
				this.currentAnim = this.anims.combo;
			} else if (this.hurt) {
				this.currentAnim = this.anims.hurt;
			} else if ((this.standing && this.breakTime > 0) || (this.standing && this.vel.x < 0)) {
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

			if (this.invisTimer > 0 && this.flashCounter % 4 === 0) {
				this.currentAnim.alpha = 0.5;
				this.flashCounter = 0;
			} else if (this.currentAnim.alpha !== 1 && this.flashCounter % 3 === 0) {
				this.currentAnim.alpha = 1;
			}
			this.flashCounter += 1;
		},
		handleMovement: function () {
			if (this.attacked) {
				this.critTimer += ig.system.tick;
			}
			if (this.critTimer > this.critLimit) {
				this.critCounter = 0;
			}
			if (this.hurt) {
				if (this.hurtTimer === 0) {
					this.accel.x = 0;
					this.vel.x = 0;
					if (this.vel.y < 0) {
						this.vel.y = 0;
						this.accel.y = -16;
					}
					this.collisionCounter = 1;
					this.invisTimer = 1.7;
				}
				this.hurtTimer += ig.system.tick;
				if (this.hurtTimer > 0.3 && this.health > 0) {
					this.hurt = false;
					this.hurtTimer = 0;
				} else if (this.hurtTimer > 1 && this.health < 1) {
					this.kill();
				}
				return;
			}
			this.invisTimer -= ig.system.tick;
			if (!this.standing) {
				if ((this.vel.x === 0 && this.airCollisionCounter === 0) || (this.vel.y === 0 && this.airCollisionCounter === 0)) {
					this.bumpSnd.random().play();
					this.airCollisionCounter += 1;
				}
			}
			if (this.standing && this.vel.x === 0 && this.collisionCounter === 1 && this.hurtTimer > 0) {
				this.vel.y = -32;
				this.accel.x = 32;
				this.jumped = true;
				this.vel.x = 48;
				this.collisionCounter = 0;
				this.hurtTimer = 0;
				ig.game.spawnEntity(window.RunParticleJumpEmitter, this.pos.x + 7, this.pos.y + 10);
			}
			if (this.standing && this.vel.x === 0 && this.collisionCounter === 1) {
				this.vel.y = -96;
				this.accel.x = 32;
				this.jumped = true;
				this.vel.x = 48;
				this.collisionCounter = 0;
				ig.game.spawnEntity(window.RunParticleJumpEmitter, this.pos.x + 7, this.pos.y + 10);
				return;
			} else if (this.standing && this.vel.x === 0) {
				this.vel.x = -32;
				this.collisionCounter += 1;
				this.bumpSnd.random().play();
				return;
			}

			if (this.standing && !ig.game.collisionMap.getTile(this.pos.x + this.size.x * 0.9, this.pos.y + this.size.y)) {
				if (this.vel.x > 32 && this.breakTime < 0.25 && !this.attacked) {
					if (this.breakTime === 0 && !this.hurt) {
						ig.game.spawnEntity(window.RunParticleBacktrackEmitter, this.pos.x + 7, this.pos.y + 10);
					}
					this.friction.x = 180;
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
				this.bounceSpeed = -112 + this.last.y;
				if (this.bounceSpeed < -88) {
					this.attacked = true;
					this.jumped = false;
					this.critTimer += 1;
					ig.game.spawnEntity(window.RunParticleDrawEmitter, this.pos.x + 3, this.pos.y - 4);
				}
			}
			if (this.jumped && this.standing) {
				this.vel.x = 48;
				this.accel.x = 96;
				this.jumped = false;
				ig.game.spawnEntity(window.RunParticleLandEmitter, this.pos.x + 7, this.pos.y + 10);
			}
			if (this.standing) {
				this.jumpTime = 0;
				this.airCollisionCounter = 0;
				this.dustEmitTime += ig.system.tick;
				if (this.dustEmitTime > 0.36) {
					this.dustEmitTime = 0;
					ig.game.spawnEntity(window.RunParticleRunEmitter, this.pos.x + (Math.floor(Math.random() * 3) - 3), this.pos.y + 11);
				}
				if (ig.input.pressed('click') && !this.attacked) {
					if (this.vel.x > 0) {
						this.accel.x = 32;
						if (this.vel.x < 48) {
							this.vel.x = 48;
						}
					} else {
						this.vel.x = 48;
						this.accel.x = 64;
					}
					this.vel.y = -134;
					this.jumped = true;
					ig.game.spawnEntity(window.RunParticleJumpEmitter, this.pos.x + 7, this.pos.y + 10);
				}

				if (this.attacked) {
					this.attacked = false;
					this.jumped = true;
					this.accel.x = 32;
					if (this.vel.x < 48) {
						this.vel.x = 48;
					}
					if (ig.input.state('click')) {
						this.vel.y = (this.bounceSpeed * 1.2).limit(-135, 0);
					}
					ig.game.spawnEntity(window.RunParticleBounceEmitter, this.pos.x + 7, this.pos.y + 10);
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
			if (this.jumpTime > 0 && this.jumpTime < 0.2 && !ig.input.state('click')) {
				this.jumpTime = 0.6;
				this.vel.y = -64;
			}
			if (this.vel.y < 0 && ig.input.state('click')) {
				this.jumpTime += ig.system.tick;
			}
			if (this.jumpTime > 0.6 || !ig.input.state('click')) {
				if (this.vel.y < 0) {
					this.accel.y = 62;
				}
			} else if (this.jumpTime > 0 && ig.input.state('click')) {
				this.accel.y = -34;
			}
			if (!ig.input.state('click') && this.jumpTime < 0.25) {
				if (this.pos.y < 14) {
					this.accel.y = 256;
				}
			}
			if (this.pos.y <= -50) {
				this.accel.y = 128;
			} else if (this.pos.y <= -32) {
				this.accel.y = 96;
				this.accel.x = 64;
				this.maxVel.x = 78;
			} else {
				this.maxVel.x = 72;
			}
		}
	});
});