/*global ig*/
ig.module(
    'system.entity.components.pause-entity'
).requires(
    'system.entity.components.base'
).defines(function () {
    'use strict';
    ig.PauseEntity = ig.BaseComponent.extend({
        name: 'pause-entity',
        added: function (entity) {
            entity.addComponent(new ig.PauseAnimations());
            entity.addComponent(new ig.PauseMovement());
        }
    });
});