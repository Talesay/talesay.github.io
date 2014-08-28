/*global ig*/
ig.module(
    'system.entity.components.pause-animations'
).requires(
    'system.entity.components.base'
).defines(function () {
    'use strict';
    ig.PauseAnimations = ig.BaseComponent.extend({
        name: 'pause-animations',
        pauseAnimations: function (entity) {
            var unitAnims = entity.anims,
                anim,
                key;
            for (key in unitAnims) {
                if (unitAnims.hasOwnProperty(key)) {
                    anim = unitAnims[key];
                    anim.timer.pause();
                }
            }

        },
        unpauseAnimations: function (entity) {

            var unitAnims = entity.anims,
                anim,
                key;
            for (key in unitAnims) {
                if (unitAnims.hasOwnProperty(key)) {
                    anim = unitAnims[key];
                    anim.timer.unpause();
                }
            }
        },
        added: function (entity) {
            entity.pauseAnimations = this.pauseAnimations;
            entity.unpauseAnimations = this.unpauseAnimations;
        }
    });
});