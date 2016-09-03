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
        },
        update: function () {
            this.parent();
            // Each time player clicks, record click X and Y coordinates
            if (ig.input.pressed('click')) {
                this.gestureStartX = ig.input.mouse.x;
                this.gestureStartY = ig.input.mouse.y;
            } else if (ig.input.released('click')) {
                this.gestureEndX = ig.input.mouse.x;
                this.gestureEndY = ig.input.mouse.y;
                this.evaluateGesture();
            }
        },
        evaluateGesture: function () {
            // Check to make sure swipe was left to right & long enough
            // By subtracting end/release coordinates from start coordinates
            // And run any other checks for your action
            if (this.gestureStartX < this.gestureEndX && this.gestureEndX - this.gestureStartX > ig.system.width / 3) {
                // Do stuff if all conditions are met
                this.swipedRight();
                // Clear the old gesture
                this.clearGesture();
            } else {
                ig.game.inputText = 'not a swipe';
                this.clearGesture();
            }
        },
        clearGesture: function () {
            this.gestureEndX = null;
            this.gestureStartX = null;
            this.gestureStartY = null;
            this.gestureEndY = null;
            this.gesturesReady = false;
        },
        swipedRight: function () {
            ig.game.inputText = 'swiped right';
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