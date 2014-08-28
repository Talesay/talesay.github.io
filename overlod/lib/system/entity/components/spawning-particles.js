/*global ig*/
ig.module(
    'system.entity.components.spawning-particles'
).requires(
    'system.entity.components.base'
).defines(function () {
    'use strict';
    ig.SpawningParticles = ig.BaseComponent.extend({
        name: 'spawning-particles',
        spawningPrt: function (entity) {
            if (!entity.onScreen) {
                return;
            }
            var i = 15,
                particle = entity.particleSpawning;
            do {
                ig.game.spawnEntity(ig.global.ig[particle], entity.pos.x, entity.pos.y);
            } while ((i -= 1) >= 0);
        },
        added: function (entity) {
            if (!entity.particleSpawning) {
                throw new ig.ComponentError("Entity particleSpawning not defined");
            }
            entity.addComponent(new ig.OnScreen());
            this.spawningPrt(entity);
            entity.removeComponent(new ig.SpawningParticles());
        }
    });
});