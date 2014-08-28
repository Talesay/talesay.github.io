/*global ig*/
ig.module(
    'system.entity.components.spawning-sound'
).requires(
    'system.entity.components.base'
).defines(function () {
    'use strict';
    ig.SpawningSound = ig.BaseComponent.extend({
        name: 'spawning-sound',
        spawningSnd: function (entity) {
            /*if (entity.spawningSound.isPlaying() || entity.state === 'paused') {
                return;
            }*/
            entity.spawningSound.play();
        },
        added: function (entity) {
            if (!entity.spawningSound) {
                throw new ig.ComponentError("Entity spawningSound not defined");
            }
            this.spawningSnd(entity);
            entity.removeComponent(new ig.SpawningSound());
        }
    });
});