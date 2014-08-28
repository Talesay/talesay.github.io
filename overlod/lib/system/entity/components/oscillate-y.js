/*global ig*/
ig.module(
    'system.entity.components.oscillate-y'
).requires(
    'system.entity.components.base'
).defines(function () {
    'use strict';
    ig.OnMouseOverOscillateY = ig.BaseComponent.extend({
        name: 'oscillate-y',
        counter: 0,
        variation: 0,
        update: function (entity) {
            var oscillateY = Math.cos(this.counter);
            this.counter += 10 * ig.system.tick;
            this.variation -= oscillateY.map(-1, 1, -0.3, 0.3);
            entity.pos.y += oscillateY.map(-1, 1, -0.3, 0.3);
        },
        removed: function (entity) {
            entity.pos.y += this.variation;
        }
    });
});