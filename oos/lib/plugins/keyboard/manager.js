/*global ig*/
ig.module(
    'plugins.keyboard.manager'
).requires(
    'impact.impact'
).defines(function () {
    'use strict';
    ig.KeyboardManager = ig.Class.extend({
        status: undefined,
        staticInstantiate: function (ignore) {
            this.alias('keyboard');
            return ig.KeyboardManager.instance || null;
        },
        alias: function (name) {
            Object.defineProperty(ig, name, {
                value: this
            });
        },
        update: function () {
            if (ig.input.state('up') && ig.input.state('left')) {
                this.status = 'swipe-up-left';
            } else if (ig.input.state('up') && ig.input.state('right')) {
                this.status = 'swipe-up-right';
            } else if (ig.input.state('down') && ig.input.state('left')) {
                this.status = 'swipe-down-left';
            } else if (ig.input.state('down') && ig.input.state('right')) {
                this.status = 'swipe-down-right';
            } else if (ig.input.state('left')) {
                this.status = 'swipe-left';
            } else if (ig.input.state('right')) {
                this.status = 'swipe-right';
            } else if (ig.input.state('down')) {
                this.status = 'swipe-down';
            } else if (ig.input.state('up')) {
                this.status = 'swipe-up';
            }
        }
    });
    return new ig.KeyboardManager();
});
/**
 * Impact JS Keyboard Manager
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