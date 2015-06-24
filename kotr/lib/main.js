/*global ig*/
ig.module(
    'main'
).requires(
    //'impact.debug.debug',
    'plugins.require',
    'scene.title',
    'scene.run',
    'impact.game'
).defines(function () {
    'use strict';
    ig.Sound.channels = 1;
    ig.Sound.use = [ig.Sound.FORMAT.MP3, ig.Sound.FORMAT.OGG];
    ig.Main = ig.Game.extend({
        clearColor: '#524848',
        init: function () {
            ig.init.scaleCanvas();
            // Initialize your game here; bind keys etc.
            ig.input.bind(ig.KEY.MOUSE1, 'click');
            ig.input.bind(ig.KEY.UP_ARROW, 'click');
            this.initMusicTracks();
        },
        initMusicTracks: function () {
            // Background Music definition
            ig.music.volume = 0;//0.33;
            ig.musicManager.addTrack('med/msc/04-we-can-do-this', '04');
        },
        update: function () {
            ig.scene.set(ig.SceneRun, {
                level: {
                    start: ig.LevelStart,
                    end: ig.LevelEnd,
                    pieces: [
                        ig.LevelA00,
                        ig.LevelA01,
                        ig.LevelA02,
                        ig.LevelA03,
                        ig.LevelA03,
                        ig.LevelA04,
                        ig.LevelA05,
                        ig.LevelA06,
                        ig.LevelA07,
                        ig.LevelA08,
                        ig.LevelA09,
                        ig.LevelA10,
                        ig.LevelA11,
                        ig.LevelA12,
                        ig.LevelA13,
                        ig.LevelA14,
                        ig.LevelA15
                    ],
                    length: 41,
                    checkX: false,
                    checkY: false
                }
            });
        }
    });
    ig.init = function () {
        ig.dimensions.scale = ig.init.getCanvasScale();
        var size = ig.init.getCanvasSize();
        ig.main('#canvas', ig.Main, 60, size.w, size.h, ig.dimensions.scale, ig.Loader);
        window.addEventListener('resize', ig.init.scaleCanvas, false);
        window.addEventListener('orientationchange', ig.init.scaleCanvas, false);
    };
    ig.init.getCanvasScale = function () {
        var canvas = document.getElementById('canvas'),
            scale = Math.floor(window.innerWidth / 160) - 2;
        if (scale < 2) {
            scale = 2;
        }
        return scale;
    };
    ig.init.getCanvasSize = function () {
        var width = (window.innerWidth) / ig.dimensions.scale,
            height = (window.innerHeight) / ig.dimensions.scale;
        return {
            w: width,
            h: height
        };

    };
    ig.init.scaleCanvas = function () {
        ig.dimensions.scale = ig.init.getCanvasScale();
        var size = ig.init.getCanvasSize(),
            image;
        if (!ig.game || ig.dimensions.scale === ig.system.scale) {
            return;
        }
        for (image in ig.Image.cache) {
            if (ig.Image.cache.hasOwnProperty(image)) {
                if (!ig.Image.cache[image].data[ig.dimensions.scale]) {
                    ig.Image.cache[image].resize(ig.dimensions.scale);
                }
            }
        }
        ig.system.resize(size.w, size.h, ig.dimensions.scale);
        if (ig.game.camera) {
            ig.game.positionCamera();
        }
    };
    return ig.init();
});