/*global ig*/
ig.module(
    'scene.run.ent.bat-04'
).requires(
    'scene.run.ent.bat-01',
    'scene.run.ent.proyectile.fireball-01'
).defines(function () {
    'use strict';
    window.EntityBat04 = window.EntityBat01.extend({
        vel: {
            x: 5,
            y: 0
        },
        friction: {
            x: 0,
            y: 0
        },
        animSheet: new ig.AnimationSheet('med/spr/enemy/bat-04.png', 16, 16),
        health: 1,
        shootTimer: 0,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            var animSeq = [[0, 1], [1, 0]];
            this.addAnim('idle', 0.09, animSeq.random());
            this.addAnim('shoot', 0.09, [2, 2]);
            this.originalPosY = this.pos.y;
        },
        handleAnims: function () {},
        handleMovement: function () {
            if (this.currentAnim.loopCount % 2 === 0 || this.pos.y > this.originalPosY) {
                this.vel.y = -16;
            } else {
                this.vel.y = 16;
            }
            if (this.shootTimer > 1 && this.currentAnim.loopCount % 3 === 0) {
                this.currentAnim = this.anims.shoot;
                ig.game.spawnEntity(window.EntityFireball01, this.pos.x - 2, this.pos.y -2);
                this.shootTimer = 0;
            } else {
                this.shootTimer += ig.system.tick;
            }

            if (this.shootTimer < 1 && this.shootTimer > 0.3) {
                this.currentAnim = this.anims.idle;
            }
        }
    });
});