/*global ig*/
ig.module(
    'system.entity.behaviours.on-cadence-shoot'
).requires(
    'system.entity.behaviours.base'
).defines(function () {
    'use strict';
    ig.OnCadenceShoot = ig.BaseBehaviour.extend({
        name: 'on-cadence-shoot',
        concept: function (entity) {
            return entity.enemyInRange && entity.timerShoot.delta() > 0;
        },
        update: function (entity) {

            entity.shoot(entity);
            entity.timerShoot.set(entity.cadence);
            entity.shootSnd();
        },
        added: function (entity) {

            entity.addComponent(new ig.Shoot());
            entity.addComponent(new ig.EnemyInRange());
        }
    });
});