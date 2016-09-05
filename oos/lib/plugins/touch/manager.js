/*global ig*/
ig.module(
    'plugins.touch.manager'
).requires(
    'impact.impact'
).defines(function () {
    'use strict';
    ig.TouchManager = ig.Class.extend({
        accumulator: 0,
        status: undefined,
        staticInstantiate: function (ignore) {
            this.alias('touch');
            return ig.TouchManager.instance || null;
        },
        alias: function (name) {
            Object.defineProperty(ig, name, {
                value: this
            });
        },
        update: function () {
            if (ig.input.state('click')) {
                this.accumulator += ig.system.tick;
                if (this.accumulator > 0.3) {
                    this.status = 'hold';
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
                //Taping
                this.status = 'tap';
                this.clearGesture();
            } else if (distance >= swipeDistance && this.accumulator <= 0.5) {
                //Swiping
                angle = this.angleTo(x1, y1, x2, y2);
                if (angle <= -100 && angle >= -170) {
                    this.status = 'swipe-up-left';
                } else if (angle < -80 && angle > -100) {
                    this.status = 'swipe-up';
                } else if (angle >= -80 && angle <= -10) {
                    this.status = 'swipe-up-right';
                } else if (angle > -10 && angle < 10) {
                    this.status = 'swipe-right';
                } else if (angle >= 10 && angle <= 80) {
                    this.status = 'swipe-down-right';
                } else if (angle > 80 && angle < 100) {
                    this.status = 'swipe-down';
                } else if (angle >= 100 && angle <= 170) {
                    this.status = 'swipe-down-left';
                } else {
                    this.status = 'swipe-left';
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
        }
    });
    return new ig.TouchManager();
});
/**
 * Impact JS Touch Manager
 * # The MIT License (MIT)
 * ## Copyright (c) 2015 Talesay
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */