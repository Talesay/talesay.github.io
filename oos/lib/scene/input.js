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
        accumulator: 0,
        init: function () {
            //Reset Context
            var context = ig.system.context;
            context.globalCompositeOperation = "source-over";
            context.globalAlpha = 1;
        },
        update: function () {
            this.parent();
            if (ig.input.state('click')) {
                this.accumulator += ig.system.tick;
                if (this.accumulator > 0.3) {
                    ig.game.inputText = 'hold';
                }
            }
            // Each time player clicks, record click X and Y coordinates
            if (ig.input.pressed('click')) {
                this.gestureStartX = ig.input.mouse.x;
                this.gestureStartY = ig.input.mouse.y;
            }
            if (ig.input.released('click')) {
                this.gestureEndX = ig.input.mouse.x;
                this.gestureEndY = ig.input.mouse.y;
                this.evaluateGesture();
                this.accumulator = 0;
            }

        },
        evaluateGesture: function () {
            // Check to make sure swipe was left to right & long enough
            // By subtracting end/release coordinates from start coordinates
            // And run any other checks for your action
            var swipeDistance = 12 * ig.dimensions.ratioConstraint,
                x1 = this.gestureStartX,
                x2 = this.gestureEndX,
                y1 = this.gestureStartY,
                y2 = this.gestureEndY,
                distance = this.distanceTo(x1, y1, x2, y2),
                angle;
            if (distance < swipeDistance && this.accumulator <= 0.3) {
                //taping
                ig.game.inputText = 'tap';
                this.clearGesture();
            } else if (distance >= swipeDistance && this.accumulator <= 0.5) {
                //swiping
                angle = this.angleTo(x1, y1, x2, y2);

                ig.game.inputText = angle + ' ';

                if (angle <= -100 && angle >= -170) {
                    ig.game.inputText += 'izquierda arriba';
                } else if (angle < -80 && angle > -100) {
                    ig.game.inputText += 'arriba';
                } else if (angle >= -80 && angle <= -10) {
                    ig.game.inputText += 'derecha arriba';
                } else if (angle > -10 && angle < 10) {
                    ig.game.inputText += 'derecha';
                } else if (angle >= 10 && angle <= 80) {
                    ig.game.inputText += 'derecha abajo';
                } else if (angle > 80 && angle < 100) {
                    ig.game.inputText += 'abajo';
                } else if (angle >= 100 && angle <= 170) {
                    ig.game.inputText += 'izquierda abajo';
                } else {
                    ig.game.inputText += 'izquierda';
                }

                this.clearGesture();
            }

        },
        distanceTo: function (x1, y1, x2, y2) {
            var xd = x1 - x2,
                yd = y1 - y2;
            return Math.sqrt(xd * xd + yd * yd);
        },
        angleTo: function (x1, y1, x2, y2) {
            return Math.atan2(
                y2 - y1,
                x2 - x1
            ).toDeg();
        },
        clearGesture: function () {
            this.gestureEndX = undefined;
            this.gestureStartX = undefined;
            this.gestureStartY = undefined;
            this.gestureEndY = undefined;
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