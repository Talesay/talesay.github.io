/*global ig*/
ig.module(
    'scene.minion.top-current.base'
).requires(
    'impact.entity',
    'impact.font'
).defines(function () {
    'use strict';
    ig.CurrentMoneyIndicator = ig.Entity.extend({
        size: {
            x: 225,
            y: 18
        },
        font: new ig.Font('nevis-12-dfefd7'),
        zIndex: -1,
        current: 0,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.moneyIcon = new ig.AtlasImage(ig.game.sceneAtlas, 'money-0', true);
            this.exponent = '0';
        },
        update: function () {
            var arr,
                remainder;
            this.current = (ig.player.money).toExponential();
            arr = this.current.split('e+');

            this.exponent = arr[1];

            //this.previousExponent = this.exponent;
            this.moneyIcon = new ig.AtlasImage(ig.game.sceneAtlas, 'money-' + this.exponent, true);


            remainder = this.exponent % 15;
            this.current = Math.round(arr[0] * Math.pow(10, remainder));

            this.current = this.numberWithCommas(this.current);

            this.parent();
        },
        draw: function () {
            this.parent();
            this.font.draw("$ " + this.current, this.pos.x - 18, this.pos.y, ig.Font.ALIGN.RIGHT);
            this.moneyIcon.draw(this.pos.x - 14, this.pos.y - 10);
        },
        numberWithCommas: function (x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    });
});