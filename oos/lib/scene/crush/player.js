/*global ig*/
ig.module(
    'scene.crush.player'
).requires(
    'impact.entity'
).defines(function () {
    'use strict';
    window.EntityPlayer = ig.Entity.extend({
        size: {
            x: 68,
            y: 116
        },
        // Load an animation sheet
        animSheet: new ig.AnimationSheet('med/spr/crush/player.png', 68, 116),
        consumedStatus: false,
        currentBehaviour: function () {},
        behaviours: {
            idle: function () {},
            tap: function () {
                this.pos.x += 10;
                this.consumedStatus = true;
            },
            hold: function () {
                this.pos.x -= 10;
                this.consumedStatus = true;
            },
            swipeUp: function () {},
            swipeDown: function () {},
            swipeUpRight: function () {},
            swipeUpLeft: function () {},
            swipeDownRight: function () {},
            swipeDownLeft: function () {},
            swipeLeft: function () {},
            swipeRight: function () {}
        },
        init: function (x, y, settings) {
            this.addAnim('idle', 1, [0]);
            // Call the parent constructor
            this.parent(x, y, settings);
        },
        update: function () {
            this.parent();
            if (!this.consumedStatus) {
                this.currentBehaviour();
            } else if (ig.touch.status === ig.touch.previousStatus && this.consumedStatus) {
                this.consumedStatus = false;
                return;
            }
            this.currentBehaviour = this.behaviours[ig.touch.status];
        }
    });
});