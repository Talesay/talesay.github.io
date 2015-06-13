/*global ig*/
ig.module(
    'main'
).requires(
    'impact.debug.debug',
    'plugins.require',
    'scene.title',
    'scene.run',
    'impact.game'
).defines(function () {
    'use strict';
    ig.Sound.channels = 2;
    ig.Main = ig.Game.extend({
        init: function () {
            // Initialize your game here; bind keys etc.
            ig.input.bind(ig.KEY.MOUSE1, 'click');
        },
        update: function () {
            ig.scene.set(ig.SceneRun, {
                level: {
                    start: ig.LevelStart,
                    end: ig.LevelEnd,
                    pieces: [
                        ig.LevelOther,
                        ig.LevelSegment00,
                        ig.LevelSegment01,
                        ig.LevelSegment02,
                        ig.LevelSegment03,
                        ig.LevelSegment04,
                        ig.LevelSegment05,
                        ig.LevelSegment06,
                        ig.LevelSegment07
                    ],
                    length: 25,
                    checkX: true,
                    checkY: true
                }
            });
        }
    });
    ig.init = function () {
        ig.scaleCanvas();
        ig.main('#canvas', ig.Main, 60, ig.dimensions.width, ig.dimensions.height, 6, ig.Loader);
        window.addEventListener('resize', ig.scaleCanvas, false);
    };
    ig.scaleCanvas = function () {
        var canvas = ig.$('#canvas'),
            widthProprotion = (window.innerWidth / ig.dimensions.width),
            heightProprotion = (window.innerHeight / ig.dimensions.height),
            ratioConstraint = Math.min(widthProprotion, heightProprotion);
        canvas.style.width = (ig.dimensions.width * ratioConstraint) + "px";
        canvas.style.height = (ig.dimensions.height * ratioConstraint) + "px";
    };
    return ig.init();
});