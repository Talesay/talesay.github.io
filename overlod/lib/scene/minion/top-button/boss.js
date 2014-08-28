/*global ig*/
ig.module(
    'scene.minion.top-button.boss'
).requires(
    'scene.minion.top-button.base'
).defines(function () {
    'use strict';
    ig.MinionSceneTopButtonBoss = ig.MinionSceneTopButton.extend({
        name: 'minion-top-button-boss',
        size: {
            x: 130,
            y: 41
        },
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addTextureAtlasAnim(ig.game.sceneAtlas, 'active', 1, ['btn-boss-active'], false);
            this.addTextureAtlasAnim(ig.game.sceneAtlas, 'over', 1, ['btn-boss-over'], false);
            this.addTextureAtlasAnim(ig.game.sceneAtlas, 'pressed', 1, ['btn-boss-over'], false);
            this.addTextureAtlasAnim(ig.game.sceneAtlas, 'inactive', 1, ['btn-boss-inactive'], false);
            this.currentAnim = this.anims.inactive;
        },
        update: function () {
            this.parent();
        },
        draw: function () {
            this.parent();
        },
        added: function () {
            this.parent();
        },
        over: function () {
            this.parent();
        },
        out: function () {
            this.parent();
        },
        pressed: function () {
            this.parent();
            //ig.scene.load(ig.SelectFactionScene);
        }
    });
});