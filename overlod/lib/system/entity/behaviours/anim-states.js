/*global ig*/
ig.module(
    'system.entity.behaviours.anim-states'
).requires(
    'system.entity.behaviours.base'
).defines(function () {
    'use strict';
    ig.AnimStates = ig.BaseBehaviour.extend({
        name: 'anim-states',
        concept: function (entity) {
            return entity.oldAnim !== entity.state && entity.state !== 'paused';
        },
        update: function (entity) {
            if (typeof entity.anims[entity.state] === 'undefined') {
                throw new ig.BehaviourError("No anim defined for state " + entity.state);
            }
            entity.currentAnim = entity.anims[entity.state].rewind();
            entity.oldAnim = entity.state;
        },
        added: function (entity) {
            entity.addComponent(new ig.SetState());
            entity.oldAnim = entity.state;
        }
    });
});