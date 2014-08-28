/*global ig*/
ig.module(
    'system.entity.behaviours.on-mouse-over'
).requires(
    'system.entity.behaviours.base'
).defines(function () {
    'use strict';
    ig.OnMouseOver = ig.BaseBehaviour.extend({
        name: 'on-mouse-over',
        concept: function (entity) {
            return entity.mouseOver && !entity.mousePressed;
        },
        update: function (entity) {

            entity.setState('over');
            if (entity.mouseOut) {
                entity.over();
                entity.mouseOut = false;
            }

        },

        over: function () {},

        added: function (entity) {
            entity.addComponent(new ig.MouseOver());
            entity.over = entity.over || this.over;


        },
        removed: function (entity) {}
    });
});