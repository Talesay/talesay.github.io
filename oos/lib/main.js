/*global ig*/
ig.module(
    'main'
).requires(
    'impact.game',
    'scene.entry',
    'scene.game',
    'plugins.scene.manager',
    'plugins.interpolation.manager',
    'mixin.draw-flat-background'
    //'impact.debug.debug',
).defines(function () {
    'use strict';
    ig.System.drawMode = ig.System.DRAW.SMOOTH;
    ig.Main = ig.Game.extend({
        init: function () {
            ig.input.bind(ig.KEY.MOUSE1, 'click');
            ig.scene.add('entry', ig.SceneEntry);
            ig.scene.add('game', ig.SceneGame);
            //Music
            ig.music.add('med/msc/entry.*', 'entry-msc');
        },
        update: function () {
            var scene = ig.scene.set('entry');
        }
    });
    ig.init = function () {
        ig.init.scaleCanvas();
        ig.Sound.channels = 2;
        ig.main('#canvas', ig.Main, 60, ig.dimensions.width, ig.dimensions.height, ig.dimensions.scale);
        window.addEventListener('resize', ig.init.scaleCanvas, false);
    };
    ig.init.scaleCanvas = function () {
        var canvas = document.getElementById('canvas'),
            widthProprotion = (window.innerWidth / ig.dimensions.width),
            heightProprotion = (window.innerHeight / ig.dimensions.height),
            ratioConstraint = Math.min(widthProprotion, heightProprotion),
            nsWidth = (ig.dimensions.width * ratioConstraint) + "px",
            nsHeight = (ig.dimensions.height * ratioConstraint) + "px";
        // Scale the canvas
        canvas.style.width = nsWidth;
        canvas.style.height = nsHeight;
    };
    return ig.init();
});