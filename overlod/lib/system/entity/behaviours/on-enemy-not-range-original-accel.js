/*global ig*/
ig.module(
    'system.entity.behaviours.on-enemy-not-range-original-accel'
).requires(
    'system.entity.behaviours.base'
).defines(function () {
    'use strict';
    ig.OnEnemyNotRangeOriginalAccel = ig.BaseBehaviour.extend({
        name: 'on-enemy-not-range-original-accel',
        concept: function (entity) {
            return !entity.enemyInRange && (entity.accel.x !== entity.originalAccelX || entity.mobility === 'static');
        },
        update: function (entity) {
            entity.setState('accelerating');
            entity.accel.x = entity.originalAccelX;

        },
        added: function (entity) {
            entity.addComponent(new ig.SetState());
            entity.addComponent(new ig.EnemyInRange());
            entity.originalAccelX = entity.accel.x;
        }
    });
});