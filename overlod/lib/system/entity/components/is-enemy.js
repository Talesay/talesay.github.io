/*global ig*/
ig.module(
    'system.entity.components.is-enemy'
).requires(
    'system.entity.components.base'
).defines(function () {
    'use strict';
    ig.IsEnemy = ig.BaseComponent.extend({
        name: 'is-enemy',
        added: function (entity) {
            if (!entity.createdByWaveManager) {
                return;
            }
            entity.speed = -entity.speed;
            entity.accel.x = -entity.accel.x;
            entity.type = ig.Entity.TYPE.B;
            entity.checkAgainst = ig.Entity.TYPE.A;
            entity.addComponent(new ig.FlipAnimationsX());
        }
    });
});