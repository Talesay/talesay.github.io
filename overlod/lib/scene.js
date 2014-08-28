/*global ig*/
ig.module(
    'scene'
).requires(
    'impact.impact',
    'scene.minion',
    'scene.shared.player'
).defines(function () {
    'use strict';
    ig.SceneManager = ig.Class.extend({
        currentScene: null,
        previousScene: null,
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
            // Singleton instance assignation
            ig.SceneManager.instance = this;
        },
        getCurrentScene: function () {
            return this.currentScene;
        },
        getPreviousScene: function () {
            return this.previousScene;
        },
        goToPrevious: function () {
            this.load(this.previousScene);
        },
        load: function (scene) {
            // Stop all sounds
            ig.soundManager.stopSounds();
            // Reset time to normal
            ig.Timer.timeScale = 1;
            // Set previous scene
            this.previousScene = this.currentScene;
            // Set new scene
            this.currentScene = scene;
            ig.system.setGame(scene);
        }
    });
    return new ig.SceneManager();
});