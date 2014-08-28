/*global ig*/
ig.module(
    'system.entity.concepts.base'
).requires(
    'impact.impact'
).defines(function () {
    'use strict';
    ig.ConceptError = function (message) {
        this.name = "ConceptError";
        this.message = message;
    };
    ig.ConceptError.prototype = Error.prototype;
    ig.BaseConcept = ig.Class.extend({
        name: 'base-concept',
        family: 'concepts',
        update: function (entity) {},
        previousCall: 0,
        previousValue: "",
        debounce: function (fn, args, every) {
            if (Date.now() - this.previousCall >= every) {
                this.previousCall = Date.now();
                this.previousValue = fn.apply(this, args);
            }
            return this.previousValue;
        },
        added: function (entity) {},
        removed: function (entity) {}
    });
});