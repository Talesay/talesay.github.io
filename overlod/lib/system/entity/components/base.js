/*global ig*/
ig.module(
    'system.entity.components.base'
).requires(
    'impact.impact'
).defines(function () {
    'use strict';
    ig.ComponentError = function (message) {
        this.name = "ComponentError";
        this.message = message;
    };
    ig.ComponentError.prototype = Error.prototype;
    ig.BaseComponent = ig.Class.extend({
        name: 'base-component',
        family: 'components',
        draw: function (entity) {},
        update: function (entity) {},
        added: function (entity) {},
        removed: function (entity) {}
    });
});