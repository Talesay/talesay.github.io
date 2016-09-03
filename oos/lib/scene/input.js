/*jslint nomen: true*/
/*global ig*/
ig.module(
    'scene.input'
).requires(
    'impact.game'
).defines(function () {
    'use strict';
    ig.SceneInput = ig.Game.extend({
        font: new ig.Font('med/04b03.font.png'),
        inputText: 'not working',
        init: function () {
            //Reset Context
            var context = ig.system.context;
            context.globalCompositeOperation = "source-over";
            context.globalAlpha = 1;
            //Input test
            document.addEventListener("swipe", function (ev) {
                ig.game.inputText = JSON.stringify(ev);
            });
        },
        update: function () {
            this.parent();
        },
        draw: function () {
            // Draw all entities and backgroundMaps
            this.parent();
            // Add your own drawing code here
            var x = ig.system.width / 2,
                y = ig.system.height / 2;

            this.font.draw(ig.game.inputText, x, y, ig.Font.ALIGN.CENTER);
        }
    });
});