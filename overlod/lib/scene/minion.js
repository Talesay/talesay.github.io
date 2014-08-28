/*global ig*/
ig.module(
    'scene.minion'
).requires(
    'impact.game',
    'system.atlas',
    'scene.minion.atlas',
    'scene.minion.card',
    'scene.minion.whip',
    'scene.minion.top-button',
    'scene.minion.top-current.base'
).defines(function () {
    'use strict';
    ig.MinionScene = ig.Game.extend({
        sceneAtlas: new ig.Atlas(new ig.Image('sprites'), new ig.MinionAtlas().sprites),
        sceneMusic: 'bkgMsc_00',
        init: function () {
            this.sceneBackground = new ig.AtlasImage(this.sceneAtlas, 'bkg');
            this.initTopMenu();
            this.initCards();
        },
        initTopMenu: function () {
            ig.game.spawnEntity(ig.MinionSceneTopButtonMinion, 11, 16);
            ig.game.spawnEntity(ig.MinionSceneTopButtonBoss, 145, 16);
            ig.game.spawnEntity(ig.MinionSceneTopButtonLair, 279, 16);
            ig.game.spawnEntity(ig.MinionSceneTopButtonNewGame, 413, 16);
            ig.game.getEntityByName('minion-top-button-minion').setAsActive();

            ig.game.spawnEntity(ig.CurrentMoneyIndicator, 770, 26);
        },
        initCards: function () {
            ig.game.spawnEntity(ig.MinionCard, 29, 84, {
                minionId: 'skeleton'
            });
            ig.game.spawnEntity(ig.MinionCard, 29, 210, {
                minionId: 'bat'
            });
            ig.game.spawnEntity(ig.MinionCard, 29, 336, {
                minionId: 'slime'
            });
            ig.game.spawnEntity(ig.MinionCard, 288, 84, {
                minionId: 'zombie'
            });
            ig.game.spawnEntity(ig.MinionCard, 288, 210, {
                minionId: 'lizardman'
            });
            ig.game.spawnEntity(ig.MinionCard, 288, 336, {
                minionId: 'mummy'
            });
            ig.game.spawnEntity(ig.MinionCard, 546, 84, {
                minionId: 'wizard'
            });
            ig.game.spawnEntity(ig.MinionCard, 546, 210, {
                minionId: 'demon'
            });
        },
        update: function () {
            this.parent();
        },
        draw: function () {
            this.parent();
        }
    });

});