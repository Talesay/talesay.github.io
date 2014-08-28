/*global ig*/
ig.module(
    'system.entity.components.dying-sound'
).requires(
    'system.entity.components.base'
).defines(function () {
    'use strict';
    ig.DyingSound = ig.BaseComponent.extend({
        name: 'dying-sound',
        dyingSnd: function (entity) {
            if (entity.dyingSound.isPlaying() || entity.state === 'paused') {
                return;
            }
            entity.dyingSound.play();
        },
        added: function (entity) {
            if (!entity.dyingSound) {
                throw new ig.ComponentError("Entity dyingSound not defined");
            }
            this.dyingSnd(entity);
            entity.removeComponent(new ig.DyingSound());
        }
    });
});