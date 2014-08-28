/*global ig*/
ig.module(
    'system.entity.behaviours.on-time-scale-zero'
).requires(
    'system.entity.behaviours.base'
).defines(function () {
    'use strict';
    ig.OnTimeScaleZero = ig.BaseBehaviour.extend({
        name: 'on-time-scale-zero',
        concept: function (entity) {
            return ig.Timer.timeScale === 0 && entity.state !== 'paused';
        },
        update: function (entity) {
            entity.setState('paused');
        },
        added: function (entity) {
            entity.addComponent(new ig.SetState());
        },
        removed: function (entity) {}
    });
});