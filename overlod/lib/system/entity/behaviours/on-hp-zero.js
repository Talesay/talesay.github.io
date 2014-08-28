/*global ig*/
ig.module(
    'system.entity.behaviours.on-hp-zero'
).requires(
    'system.entity.behaviours.base'
).defines(function () {
    'use strict';
    ig.OnHpZero = ig.BaseBehaviour.extend({
        name: 'on-hp-zero',
        concept: function (entity) {
            return entity.hp <= 0 && entity.state !== 'dying' && entity.state !== 'paused';
        },
        update: function (entity) {
            entity.addComponent(new ig.Dying());
        },
        added: function (entity) {}
    });
});