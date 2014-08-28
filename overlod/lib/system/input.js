/*jslint nomen: true*/
/*global ig*/
ig.module(
    'system.input'
).requires(
    'impact.game',
    'system.input.mouse'
).defines(function () {
    'use strict';
    ig.InputManagerError = function (message) {
        this.name = "InputManagerError";
        this.message = message;
    };
    ig.InputManagerError.prototype = Error.prototype;
    ig.InputManager = ig.Class.extend({
        /**
         * Create a static instance of this class
         */
        staticInstantiate: function (ignore) {
            this.alias('inputManager');
            return ig.InputManager.instance || null;
        },
        /**
         * Sets an alias that can be used to access this singleton
         */
        alias: function (name) {
            Object.defineProperty(ig, name, {
                value: this
            });
        },
        init: function () {
            var mouse = new ig.Mouse();
            // Inventory keys
            ig.input.bind(ig.KEY._1, 'inv_0');
            ig.input.bind(ig.KEY._2, 'inv_1');
            ig.input.bind(ig.KEY._3, 'inv_2');
            ig.input.bind(ig.KEY._4, 'inv_3');
            ig.input.bind(ig.KEY._5, 'inv_4');
            ig.input.bind(ig.KEY._6, 'inv_5');
        }
    });
});