/*global ig*/
ig.module(
    'system.screenscale'
).requires(
    'impact.system'
).defines(function () {
    'use strict';
    ig.ScreenScaler = ig.Class.extend({
        update: function () {
            ig.game.setScale(1.1);
        }
    });
});