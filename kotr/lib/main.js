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
    ig.Sound.channels = 2;
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
            ig.music.volume = 0.33;
            ig.musicManager.addTrack('med/msc/04-we-can-do-this', '04');
        },
        update: function () {
            ig.scene.set(ig.SceneRun, {
                level: {
                    start: ig.LevelStart,
                    end: ig.LevelEnd,
                    pieces: [
                        //ig.LevelOther,
                        //ig.LevelSegment00,
                        //ig.LevelSegment01,
                        //ig.LevelSegment02,
                        //ig.LevelSegment03,
                        //ig.LevelSegment04,
                        //ig.LevelSegment05,
                        ig.LevelSegment06 //,
                        //ig.LevelSegment07
                    ],
                    length: 25,
                    checkX: false,
                    checkY: false
                }
            });
        }
    });
    ig.init = function () {
        //ig.init.scaleCanvas();
        ig.main('#canvas', ig.Main, 60, window.innerWidth, window.innerHeight, 1, ig.Loader);
        window.addEventListener('resize', ig.init.scaleCanvas, false);
    };
    ig.init.scaleCanvas = function () {
        var canvas = document.getElementById('canvas'),
            widthProportion = (window.innerWidth / ig.dimensions.width),
            heightProportion = (window.innerHeight / ig.dimensions.height),
            image,
            i;
        ig.dimensions.scale = Math.floor(window.innerWidth / 200) - 1;
        if (ig.dimensions.scale < 1) {
            ig.dimensions.scale = 1;
        }

        if (!ig.game) {
            return;
        }
        for (image in ig.Image.cache) {
            if (ig.Image.cache.hasOwnProperty(image)) {
                if (!ig.Image.cache[image].data[ig.dimensions.scale]) {
                    ig.Image.cache[image].resize(ig.dimensions.scale);
                }
            }
        }
        ig.system.resize((window.innerWidth) / ig.dimensions.scale, (window.innerHeight) / ig.dimensions.scale, ig.dimensions.scale);
    };
    return ig.init();
});