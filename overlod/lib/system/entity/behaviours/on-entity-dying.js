/*global ig*/
ig.module(
    'system.entity.behaviours.on-entity-dying'
).requires(
    'system.entity.behaviours.base'
).defines(function () {
    'use strict';
    ig.OnEntityDying = ig.BaseBehaviour.extend({
        name: 'on-entity-dying',
        concept: function (entity) {
            return entity.state === 'dying' && !entity._killed;
        },
        update: function (entity) {
            entity.fadeOutKill(entity);
        },
        added: function (entity) {
            entity.addComponent(new ig.FadeOutKill());
        }
    });
});