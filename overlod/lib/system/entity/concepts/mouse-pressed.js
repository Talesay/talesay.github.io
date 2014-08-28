/*global ig*/
ig.module(
    'system.entity.concepts.mouse-pressed'
).requires(
    'system.entity.concepts.base'
).defines(function () {
    'use strict';
    ig.MousePressed = ig.BaseConcept.extend({
        name: 'mouse-pressed',
        staticInstantiate: function (i) {
            return ig.MousePressed.instance || null;
        },
        init: function () {
            ig.MousePressed.instance = this;
        },
        update: function (entity) {
            entity.mousePressed = ig.input.pressed('click');
        },
        removed: function (entity) {
            entity.mousePressed = null;
        }
    });
});