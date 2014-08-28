/*global ig*/
ig.module(
    'system.entity.behaviours.on-entity-unpaused'
).requires(
    'system.entity.behaviours.base'
).defines(function () {
    'use strict';
    ig.OnEntityUnpaused = ig.BaseBehaviour.extend({
        name: 'on-entity-unpaused',
        concept: function (entity) {
            return entity.state === 'paused' && entity.maxVel.x === 0;
        },
        update: function (entity) {
            entity.unpauseAnimations(entity);
            entity.unpauseMovement(entity);
            entity.setState(entity.oldAnim);
        },
        added: function (entity) {
            entity.addComponent(new ig.SetState());
        }
    });
});