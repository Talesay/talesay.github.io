/*global ig*/
ig.module(
    'main'
).requires(
    'impact.game',
    'scene.entry',
    'scene.game',
    'scene.input',
    'plugins.scene.manager',
    'plugins.touch.manager',
    'plugins.keyboard.manager',
    'plugins.interpolation.manager',
    'mixin.draw-flat-background'
).defines(function () {
    'use strict';
    ig.System.drawMode = ig.System.DRAW.SMOOTH;
    ig.Main = ig.Game.extend({
        init: function () {
            //Mouse
            ig.input.bind(ig.KEY.MOUSE1, 'click');
            this.initKeyboard();
            this.initTouch();
            ig.scene.add('entry', ig.SceneEntry);
            ig.scene.add('input', ig.SceneInput);
            ig.scene.add('game', ig.SceneGame);
            //Music
            ig.music.add('med/msc/entry.*', 'entry-msc');
        },
        initKeyboard: function () {
            //Keyboard
            ig.input.bind(ig.KEY.UP_ARROW, 'up');
            ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
            ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
            ig.input.bind(ig.KEY.LEFT_ARROW, 'left');

        },
        initTouch: function () {
            //Touch
            ig.input.bindTouch('#canvas', 'click');
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
            nsWidth = Math.ceil(ig.dimensions.width * ratioConstraint) + 1 + "px",
            nsHeight = Math.ceil(ig.dimensions.height * ratioConstraint) + 1 + "px";
        ig.dimensions.ratioConstraint = ratioConstraint;
        // Scale the canvas
        canvas.style.width = nsWidth;
        canvas.style.height = nsHeight;
    };
    return ig.init();
});