/*global ig*/
ig.module(
    'system.input.mouse'
).requires().defines(function () {
    'use strict';
    ig.Mouse = ig.Class.extend({
        /**
         * Create a static instance of this class
         */
        staticInstantiate: function (ignore) {
            this.alias('mouse');
            return ig.Mouse.instance || null;
        },
        /**
         * Sets an alias that can be used to access this singleton
         */
        alias: function (name) {
            Object.defineProperty(ig, name, {
                value: this
            });
        },
        init: function () {
            ig.Mouse.instance = this;
            ig.input.initMouse();
            ig.input.bind(ig.KEY.MOUSE1, 'click');
            ig.input.bind(ig.KEY.MOUSE2, 'right-click');
            ig.system.canvas.focus();

            ig.input.bindTouch('#canvas', 'click');

            //Disable Context Menu Over Canvas
            ig.system.canvas.addEventListener('mouseover', function () {
                ig.Mouse.overCanvas = true;
            }, false);

            ig.system.canvas.addEventListener('mouseout', function () {
                ig.Mouse.overCanvas = false;
            }, false);

            ig.system.canvas.addEventListener('contextmenu', function (e) {
                e.preventDefault();
            }, false);

        },
        setCursorStyle: function (cursorStyle) {
            if (ig.ua.mobile) {
                return;
            }
            var layer = document.getElementById('canvas');
            if (typeof layer !== 'undefined' && layer !== null) {
                if (cursorStyle === 'none') {
                    layer.style.cursor = cursorStyle;
                } else {
                    layer.style.cursor = "url('css/" + cursorStyle + "-cursor.png'), " + cursorStyle;
                }
            }
        },
        getMousePosition: function () {
            return {
                x: (ig.input.mouse.x + ig.game.screen.x),
                y: (ig.input.mouse.y + ig.game.screen.y)
            };
        },
        isOverCanvas: function () {
            return ig.Mouse.overCanvas;
        }
    });
    ig.Mouse.overCanvas = true;
});