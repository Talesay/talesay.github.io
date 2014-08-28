/*global ig*/
ig.module(
    'system.entity.concepts.mouse-over'
).requires(
    'system.entity.concepts.base'
).defines(function () {
    'use strict';
    ig.MouseOver = ig.BaseConcept.extend({
        name: 'mouse-over',
        update: function (entity) {

            /*if (!entity.onScreen || (ig.mouse.isOverCanvas() === false && !ig.ua.mobile)) {
                entity.mouseOver = false;
                return;
            }*/
            if (entity.isMouseOver(entity)) {
                entity.mouseOver = true;
                entity.mouseOverOld = true;
            } else {
                entity.mouseOver = false;
                entity.mouseOut = true;
            }
        },
        isMouseOver: function (entity) {
            var mousePosition = ig.mouse.getMousePosition();
            return (
                mousePosition.x + ig.game.screen.x > entity.pos.x &&
                mousePosition.x + ig.game.screen.x < entity.pos.x + entity.size.x &&
                mousePosition.y + ig.game.screen.y > entity.pos.y &&
                mousePosition.y + ig.game.screen.y < entity.pos.y + entity.size.y
            );
        },
        added: function (entity) {
            entity.addComponent(new ig.OnScreen());
            entity.isMouseOver = this.isMouseOver;
            entity.isMouseOver(entity);
        },
        removed: function (entity) {
            entity.mouseOver = null;
            entity.mouseOverOld = null;
            entity.mouseOut = null;
        }
    });
});