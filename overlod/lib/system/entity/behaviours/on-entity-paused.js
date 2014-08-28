/*global ig*/
ig.module(
    'system.entity.behaviours.on-entity-paused'
).requires(
    'system.entity.behaviours.base'
).defines(function () {
    'use strict';
    ig.OnEntityPaused = ig.BaseBehaviour.extend({
        name: 'on-entity-paused',
        concept: function (entity) {
            return ig.Timer.timeScale === 0 && entity.state !== 'paused' && entity.state !== 'dying';
        },
        update: function (entity) {
            entity.pauseAnimations(entity);
            entity.pauseMovement(entity);
            entity.setState('paused');
        },
        added: function (entity) {
            entity.addComponent(new ig.SetState());
            entity.addComponent(new ig.PauseEntity());
            entity.addComponent(new ig.OnEntityUnpaused());
        }
    });
});