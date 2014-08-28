/*global ig*/
ig.module(
    'system.entity.components.flip-animations-x'
).requires(
    'system.entity.components.base'
).defines(function () {
    'use strict';
    ig.FlipAnimationsX = ig.BaseComponent.extend({
        name: 'flip-animations-x',
        flipAnimationsX: function (entity) {

            var unitAnims = entity.anims,
                anim,
                key;
            for (key in unitAnims) {
                if (unitAnims.hasOwnProperty(key)) {
                    anim = unitAnims[key];
                    anim.flip.x = !anim.flip.x;
                }
            }

        },
        added: function (entity) {
            this.flipAnimationsX(entity);
            entity.removeComponent(new ig.FlipAnimationsX());
        }
    });
});