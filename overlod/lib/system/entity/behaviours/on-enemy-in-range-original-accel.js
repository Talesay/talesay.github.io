/*global ig*/
ig.module(
    'system.entity.behaviours.on-enemy-in-range-original-accel'
).requires(
    'system.entity.behaviours.base'
).defines(function () {
    'use strict';
    ig.OnEnemyInRangeOriginalAccel = ig.BaseBehaviour.extend({
        name: 'on-enemy-in-range-original-accel',
        concept: function (entity) {
            return entity.enemyInRange && entity.accel.x === entity.originalAccelX;
        },
        update: function (entity) {

            entity.setState('aiming');
            entity.accel.x = 0;

        },
        added: function (entity) {
            entity.addComponent(new ig.SetState());
            entity.addComponent(new ig.EnemyInRange());
            entity.originalAccelX = entity.accel.x;
        }
    });
});