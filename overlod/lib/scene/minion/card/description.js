/*global ig*/
ig.module(
    'scene.minion.card.description'
).requires(
    'impact.entity',
    'impact.font'
).defines(function () {
    'use strict';
    ig.MinionDescription = ig.Entity.extend({
        size: {
            x: 107,
            y: 30
        },
        font: new ig.Font('nevis-14'),
        zIndex: -1,
        init: function (x, y, settings) {
            this.minionId = settings.minionId;
            this.parent(x, y, settings);
        },
        update: function () {
            this.parent();
        },
        draw: function () {
            var identifier;
            this.parent();
            if (ig.player.minions[this.minionId].amount !== 1) {
                identifier = ig.player.minions[this.minionId].plural;
            } else {
                identifier = this.minionId;
            }
            this.font.draw(ig.player.minions[this.minionId].amount + ' ' + identifier, this.pos.x, this.pos.y, ig.Font.ALIGN.CENTER);
        }
    });
});