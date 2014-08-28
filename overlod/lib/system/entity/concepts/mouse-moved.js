/*global ig*/
ig.module(
    'system.entity.concepts.mouse-moved'
).requires(
    'system.entity.concepts.base'
).defines(function () {
    'use strict';
    ig.MouseMoved = ig.BaseConcept.extend({
        name: 'mouse-moved',
        previousMousePosition: {
            x: 0,
            y: 0
        },
        staticInstantiate: function (i) {
            return ig.MouseMoved.instance || null;
        },
        init: function () {
            ig.MouseMoved.instance = this;
            this.previousPosition = ig.mouse.getMousePosition();
        },
        update: function (entity) {
            if (ig.mouse.isOverCanvas() === false) {
                entity.mouseMoved = true;
                return;
            }
            entity.mouseMoved = this.debounce(this.hasMouseMoved, [], 30);
        },
        hasMouseMoved: function () {
            var currentPosition = ig.mouse.getMousePosition();
            if (currentPosition.x === this.previousPosition.x && currentPosition.y === this.previousPosition.y) {
                return false;
            } else {
                this.previousPosition = currentPosition;
                return true;
            }
        },
        removed: function (entity) {
            entity.mouseMoved = null;
        }
    });
});