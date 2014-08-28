/*global ig*/
ig.module(
    'system.entity.components.fade-out-kill'
).requires(
    'system.entity.components.base'
).defines(function () {
    'use strict';
    ig.FadeOutKill = ig.BaseComponent.extend({
        name: 'fade-out-kill',
        fadeOutKill: function (entity) {
            if (entity.currentAnim !== entity.anims.dying) {
                entity.setState('dying');
            }
            entity.anims.dying.alpha -= ig.system.tick * 4;
            if (entity.anims.dying.alpha <= 0) {
                entity.kill(entity);
            }
        },
        added: function (entity) {
            entity.fadeOutKill = this.fadeOutKill;
        }
    });
});