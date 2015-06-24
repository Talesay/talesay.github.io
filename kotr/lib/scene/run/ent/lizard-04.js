/*global ig*/
ig.module(
    'scene.run.ent.lizard-04'
).requires(
    'scene.run.ent.lizard-01',
    'scene.run.ent.proyectile.arrow-01'
).defines(function () {
    'use strict';
    window.EntityLizard04 = window.EntityLizard01.extend({
        vel: {
            x: 0,
            y: 0
        },
        friction: {
            x: 0,
            y: 0
        },
        animSheet: new ig.AnimationSheet('med/spr/enemy/lizard-04.png', 16, 16),
        health: 1,
        shootTimer: 0,
        shootSnd: [
            new ig.Sound('med/sfx/arrow-00.*'),
            new ig.Sound('med/sfx/arrow-01.*'),
            new ig.Sound('med/sfx/arrow-02.*')
        ],
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            var animSeq = [[0, 1], [1, 0]];
            this.addAnim('idle', 0.25, animSeq.random());
            this.addAnim('shoot', 0.25, [0, 0]);
            this.originalPosY = this.pos.y;
        },
        handleAnims: function () {},
        handleMovement: function () {
            var distance = this.distanceTo(ig.game.player);
            if (this.shootTimer > 1 && this.standing && !ig.game.player.standing && distance < 64) {
                this.vel.y = -96;
            }
            if (this.shootTimer > 1 && this.currentAnim.loopCount % 3 === 0 && distance < 54) {
                this.currentAnim = this.anims.shoot;
                this.shootSnd.random().play();
                ig.game.spawnEntity(window.EntityArrow01, this.pos.x - 2, this.pos.y - 2);
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