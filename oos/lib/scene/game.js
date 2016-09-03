/*global ig*/
ig.module(
    'scene.game'
).requires(
    'impact.game',
    'mixin.draw-flat-background'
).defines(function () {
    'use strict';
    ig.SceneGame = ig.Game.extend({
        id: 'game',
        background: new ig.Image('med/bkg/game.png'),
        init: function () {
            //Reset Context
            var context = ig.system.context;
            context.globalCompositeOperation = "source-over";
            context.globalAlpha = 1;

            window.console.log('ingame');
        }
    });
    ig.SceneGame.inject(ig.MixinDrawFlatBackground);
});