/*global ig*/
ig.module(
    'scene.minion.card.cost'
).requires(
    'impact.entity',
    'system.atlas',
    'impact.font'
).defines(function () {
    'use strict';
    ig.MinionCost = ig.Entity.extend({
        size: {
            x: 107,
            y: 30
        },
        font: new ig.Font('nevis-9-000000'),
        zIndex: -1,
        cost: 0,
        init: function (x, y, settings) {
            this.minionId = settings.minionId;
            this.initGfx();
            this.exponent = '0';
            this.font.letterSpacing = -1;
            this.moneyIconSpacing = 0;
            this.cost = ig.player.minions[this.minionId].costBase;
            this.parent(x, y, settings);
        },
        initGfx: function () {
            this.addTextureAtlasAnim(ig.game.sceneAtlas, 'active', 1, ['card-cost-bkg'], true, true);
            this.moneyIcon = new ig.AtlasImage(ig.game.sceneAtlas, 'money-0-16x16', true);
        },
        update: function () {
            var arr,
                remainder;

            this.cost = ig.player.minions[this.minionId].costBase;


            this.cost = (this.cost).toExponential();
            arr = this.cost.split('e+');

            this.exponent = arr[1];

            //this.previousExponent = this.exponent;
            this.moneyIcon = new ig.AtlasImage(ig.game.sceneAtlas, 'money-' + this.exponent + '-16x16', true);


            remainder = this.exponent % 15;
            this.cost = Math.round(arr[0] * Math.pow(10, remainder));
            this.moneyIconSpacing = this.font.widthForString(this.cost.toString());
            this.parent();
        },
        draw: function () {
            this.parent();
            this.font.draw("$" + this.cost, this.pos.x + 60, this.pos.y + 4, ig.Font.ALIGN.CENTER);
            this.moneyIcon.draw(this.pos.x + 5, this.pos.y);
        }
    });
});