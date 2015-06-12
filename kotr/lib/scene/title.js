/*global ig*/
ig.module(
    'scene.title'
).requires(
    'impact.game'
).defines(function () {
    'use strict';
    ig.SceneTitle = ig.Game.extend({
        font: new ig.Font('med/fnt/04b03.font.png'),
        init: function () {
            // Initialize your game here; bind keys etc.
        },
        update: function () {
            // Update all entities and backgroundMaps
            this.parent();

            // Add your own, additional update code here
        },
        draw: function () {
            // Draw all entities and backgroundMaps
            this.parent();
            // Add your own drawing code here
            var x = ig.system.width / 2,
                y = ig.system.height / 2;

            this.font.draw(this.message, x, y, ig.Font.ALIGN.CENTER);
        }
    });
});