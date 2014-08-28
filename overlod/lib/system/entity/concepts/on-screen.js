/*global ig*/
ig.module(
    'system.entity.concepts.on-screen'
).requires(
    'system.entity.concepts.base'
).defines(function () {
    'use strict';
    ig.OnScreen = ig.BaseConcept.extend({
        name: 'on-screen',
        update: function (entity) {

            if (!entity.isMoving) {
                return;
            }
            entity.onScreen = this.debounce(this.isOnScreen, [entity], 300);

        },
        isOnScreen: function (entity) {

            return (
                entity.pos.x + entity.size.x - 1 >= ig.game.screen.x &&
                entity.pos.x < ig.game.screen.x + ig.system.width &&
                entity.pos.y + entity.size.y - 1 >= ig.game.screen.y &&
                entity.pos.y < ig.game.screen.y + ig.system.height
            );
        },
        added: function (entity) {
            entity.addComponent(new ig.IsMoving());
            entity.onScreen = this.debounce(this.isOnScreen, [entity], 300);
        },
        removed: function (entity) {
            entity.onScreen = null;
        }
    });
});