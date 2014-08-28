/*global ig*/
ig.module(
    'system.entity.concepts.mouse-pressing-entity'
).requires(
    'system.entity.concepts.base'
).defines(function () {
    'use strict';
    ig.MousePressingEntity = ig.BaseConcept.extend({
        name: 'mouse-pressing-entity',
        staticInstantiate: function (i) {
            return ig.MousePressingEntity.instance || null;
        },
        init: function () {
            ig.MousePressingEntity.instance = this;
        },
        update: function (entity) {
            if (entity.mousePressed && entity.mouseOver) {
                entity.mousePressingEntity = true;
            } else {
                entity.mousePressingEntity = false;
            }
        },
        added: function (entity) {
            entity.addComponent(new ig.MousePressed());
            entity.addComponent(new ig.MouseOver());
        },
        removed: function (entity) {
            entity.mousePressingEntity = null;
        }
    });
});