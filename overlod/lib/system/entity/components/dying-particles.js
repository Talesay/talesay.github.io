/*global ig*/
ig.module(
    'system.entity.components.dying-particles'
).requires(
    'system.entity.components.base'
).defines(function () {
    'use strict';
    ig.DyingParticles = ig.BaseComponent.extend({
        name: 'dying-particles',
        dyingPrt: function (entity) {
            if (!entity.onScreen) {
                return;
            }
            var i = 15,
                particle = entity.particleDying;
            do {
                ig.game.spawnEntity(ig.global.ig[particle], entity.pos.x, entity.pos.y);
            } while ((i -= 1) >= 0);
        },
        added: function (entity) {
            if (!entity.particleDying) {
                throw new ig.ComponentError("Entity particleDying not defined");
            }
            entity.addComponent(new ig.OnScreen());
            this.dyingPrt(entity);
            entity.removeComponent(new ig.DyingParticles());
        }
    });
});