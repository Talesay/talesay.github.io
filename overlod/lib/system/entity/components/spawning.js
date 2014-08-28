/*global ig*/
ig.module(
    'system.entity.components.spawning'
).requires(
    'system.entity.components.base'
).defines(function () {
    'use strict';
    ig.Spawning = ig.BaseComponent.extend({
        name: 'spawning',
        added: function (entity) {
            entity.addComponent(new ig.SetState());
            entity.addComponent(new ig.SpawningSound());
            entity.addComponent(new ig.SpawningParticles());
            entity.removeComponent(new ig.Spawning());
            entity.setState('spawning');
        }
    });
});