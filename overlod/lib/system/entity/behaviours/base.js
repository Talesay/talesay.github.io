/*global ig*/
ig.module(
    'system.entity.behaviours.base'
).requires(
    'impact.impact'
).defines(function () {
    'use strict';
    ig.BehaviourError = function (message) {
        this.name = "BehaviourError";
        this.message = message;
    };
    ig.BehaviourError.prototype = Error.prototype;
    ig.BaseBehaviour = ig.Class.extend({
        name: 'base-behaviour',
        family: 'behaviours',
        concept: function (entity) {
            throw new ig.BehaviourError("No concept defined for Behaviour " + this.name);
        },
        update: function (entity) {},
        added: function (entity) {},
        removed: function (entity) {}
    });
});