/*global ig*/
ig.module(
    'system.entity.concepts.is-moving'
).requires(
    'system.entity.concepts.base'
).defines(function () {
    'use strict';
    ig.IsMoving = ig.BaseConcept.extend({
        name: 'is-moving',
        staticInstantiate: function (i) {
            return ig.IsMoving.instance || null;
        },
        init: function () {
            ig.IsMoving.instance = this;
        },
        update: function (entity) {
            if (entity.pos.x === entity.last.x && entity.pos.y === entity.last.y) {
                entity.isMoving = false;
            } else {
                entity.isMoving = true;
            }
        },
        added: function (entity) {
            entity.isMoving = false;
        },
        removed: function (entity) {
            entity.isMoving = null;
        }
    });
});