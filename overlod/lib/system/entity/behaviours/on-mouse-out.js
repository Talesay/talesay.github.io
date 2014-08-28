/*global ig*/
ig.module(
    'system.entity.behaviours.on-mouse-out'
).requires(
    'system.entity.behaviours.base'
).defines(function () {
    'use strict';
    ig.OnMouseOut = ig.BaseBehaviour.extend({
        name: 'on-mouse-out',
        concept: function (entity) {
            return !entity.mouseOver && entity.mouseOverOld;
        },
        update: function (entity) {
            entity.setState('active');
            if (entity.mouseOverOld) {
                entity.out();
                entity.mouseOverOld = false;
            }

        },
        out: function () {},
        added: function (entity) {
            entity.addComponent(new ig.MouseOver());

            entity.out = entity.out || this.out;

        }
    });
});