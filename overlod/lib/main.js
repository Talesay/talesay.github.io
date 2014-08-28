/*global ig*/
ig.config = {
    build: '/* @echo BUILD */',
    version: '/* @echo GAMEVERSION */',
    date: '/* @echo DATE */',
    dimensions: {
        width: 800,
        height: 450
    },
    language: 'en',
    prefix: {
        //image: 'lib/scene/',
        image: '',
        //music: 'lib/scene/shared/music/' //hola
        music: '' //hola
    }
};
ig.module(
    'game.main'
).requires(
    'impact.game',
    //'impact.debug.debug',
    'scene',
    'system',
    'impact.font'
).defines(function () {
    'use strict';
    ig.System.drawMode = ig.System.DRAW.SUBPIXEL;
    ig.Main = ig.Game.extend({
        init: function () {
            // Initialize audio
            this.initAudio();
            // init Input
            var input = new ig.InputManager();
        },

        initAudio: function () {
            // Excluded sounds for pausing/unpausing game
            ig.soundManager.addPauseExcludedSound('button-over.*');
            ig.soundManager.addPauseExcludedSound('button-pressed.*');
            // Background Music definition
            ig.musicManager.addTrack('bgm', 'bkgMsc_00');
            // Music volume
            ig.music.volume = ig.persistence.getFloat("musicVolume", 1);
            // Sfx volume
            ig.soundManager.volume = ig.persistence.getFloat("effectVolume", 1);
        },
        update: function () {
            ig.scene.load(ig.MinionScene);
        },
        draw: function () {
            this.parent();
        }
    });
    ig.init = function () {
        ig.init.scaleCanvas();
        // Load Intro
        ig.Sound.channels = 2;
        ig.main('#canvas', ig.Main, 60, ig.config.dimensions.width, ig.config.dimensions.height, 1, ig.Loader);
        ig.setNocache(true);
        window.addEventListener('resize', ig.init.scaleCanvas, false);
    };
    ig.init.getScale = function () {
        var scale = 1,
            width = window.innerWidth;
        if (width > 800) {
            scale = 2;
        } else if (width > 1366) {
            scale = 4;
        }
        return scale;
    };
    ig.init.scaleCanvas = function () {
        var canvas = document.getElementById('canvas'),
            widthProprotion = (window.innerWidth / ig.config.dimensions.width),
            heightProprotion = (window.innerHeight / ig.config.dimensions.height),
            ratioConstraint = Math.min(widthProprotion, heightProprotion);
        // Scale the canvas
        canvas.style.width = (ig.config.dimensions.width * ratioConstraint) + "px";
        canvas.style.height = (ig.config.dimensions.height * ratioConstraint) + "px";
    };
    return ig.init();

});