/*global ig*/
ig.module(
    'scene.crush.countdown'
).requires(
    'impact.entity'
).defines(function () {
    'use strict';
    window.EntityCountdown = ig.Entity.extend({
        font: new ig.Font('med/spr/crush/lady-radical.font.png'),
        init: function (x, y, settings) {
            //font
            this.font.firstChar = 48;
            //timer
            this.timer = new ig.Timer(99);
            // Call the parent constructor
            this.parent(x, y, settings);
        },
        update: function () {
            this.count = -Math.floor(this.timer.delta());
            if (this.count < 1) {
                this.count = 0;
            }
            this.parent();
        },
        draw: function () {
            this.font.draw(this.count, this.pos.x, this.pos.y, ig.Font.ALIGN.CENTER);
        }
    });
});