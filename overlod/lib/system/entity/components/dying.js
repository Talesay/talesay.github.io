/*global ig*/
ig.module(
    'system.entity.components.dying'
).requires(
    'system.entity.components.base'
).defines(function () {
    'use strict';
    ig.Dying = ig.BaseComponent.extend({
        name: 'dying',
        added: function (entity) {
            if (entity.state === 'dying') {
                return;
            }
            this.collides = ig.Entity.COLLIDES.NEVER;
            this.type = ig.Entity.TYPE.NONE;
            this.checkAgainst = ig.Entity.TYPE.NONE;
            entity.addComponent(new ig.SetState());
            entity.setState('dying');
            entity.addComponent(new ig.DyingSound());
            //entity.addComponent(new ig.DyingParticles());
            entity.removeComponent(new ig.Dying());
        }
    });
});