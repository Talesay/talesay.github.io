/*global ig*/
ig.module(
    'scene.minion.card.achievements'
).requires(
    'impact.entity',
    'system.atlas'
).defines(function () {
    'use strict';
    ig.MinionAchievements = ig.Entity.extend({
        size: {
            x: 205,
            y: 31
        },
        zIndex: 1,
        init: function (x, y, settings) {
            this.minionId = settings.minionId;
            this.name = 'achievements-' + this.minionId;
            this.initGfx();
            this.parent(x, y, settings);
        },
        initGfx: function () {
            this.addTextureAtlasAnim(ig.game.sceneAtlas, 'active', 1, ['card-achievements-bkg'], true, true);
        },
        update: function () {
            this.parent();
        },
        draw: function () {
            this.parent();
        }
    });
});