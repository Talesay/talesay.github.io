/*global ig*/
ig.module(
    'plugins.scene.manager'
).requires(
    'impact.impact'
).defines(function () {
    'use strict';
    ig.SceneManager = ig.Class.extend({
        staticInstantiate: function (ignore) {
            this.alias('scene');
            return ig.SceneManager.instance || null;
        },
        alias: function (name) {
            Object.defineProperty(ig, name, {
                value: this
            });
        },
        init: function () {
            ig.SceneManager.instance = this;
        },
        set: function (scene, data) {
            var key;
            for (key in data) {
                if (data.hasOwnProperty(key)) {
                    scene.prototype[key] = data[key];
                }
            }
            ig.system.setGame(scene);
        }
    });
    return new ig.SceneManager();
});