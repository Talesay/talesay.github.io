/*global ig*/
ig.module(
    'system.entity.components.set-state'
).requires(
    'system.entity.components.base'
).defines(function () {
    'use strict';
    ig.SetState = ig.BaseComponent.extend({
        name: 'set-state',
        family: 'components',
        setState: function (newState) {
            if (newState !== this.oldState) {
                this.state = newState;
                this.oldState = this.state;
            }
        },
        added: function (entity) {
            entity.oldState = entity.state;
            entity.setState = this.setState.bind(entity);
        }
    });
});