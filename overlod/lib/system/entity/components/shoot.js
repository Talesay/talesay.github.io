/*global ig*/
ig.module(
    'system.entity.components.shoot'
).requires(
    'system.entity.components.base'
).defines(function () {
    'use strict';
    ig.Shoot = ig.BaseComponent.extend({
        name: 'shoot',
        cadence: 300,
        shoot: function (entity) {
            ig.game.spawnEntity(entity.bulletType, entity.pos.x, entity.pos.y, {
                type: entity.type,
                checkAgainst: entity.checkAgainst,
                accel: {
                    x: entity.accel.x,
                    y: entity.accel.y
                }
            });
        },
        added: function (entity) {
            entity.timerShoot = new ig.Timer(0);
            entity.shoot = this.shoot;

        }
    });
});