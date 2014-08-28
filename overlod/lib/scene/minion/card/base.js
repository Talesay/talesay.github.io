/*global ig*/
ig.module(
    'scene.minion.card.base'
).requires(
    'impact.entity',
    'system.atlas',
    'scene.minion.card.portrait',
    'scene.minion.card.progress',
    'scene.minion.card.achievements',
    'scene.minion.card.hire',
    'scene.minion.card.cost',
    'scene.minion.card.description'
).defines(function () {
    'use strict';
    ig.MinionCard = ig.Entity.extend({
        size: {
            x: 221,
            y: 69
        },
        init: function (x, y, settings) {
            this.addTextureAtlasAnim(ig.game.sceneAtlas, 'active', 1, ['card-bkg-active'], true);
            this.addTextureAtlasAnim(ig.game.sceneAtlas, 'inactive', 1, ['card-bkg-inactive'], true);
            this.parent(x, y, settings);
            this.initGfx();
            this.initComponents();
        },
        initComponents: function () {
            this.addComponent(new ig.AnimStates());
        },
        initGfx: function () {
            var x = this.pos.x,
                y = this.pos.y,
                settings = {
                    minionId: this.minionId
                },
                spawn = function (type, x, y, settings) {
                    ig.game.spawnEntity(type, x, y, settings);
                };
            spawn(ig.MinionPortrait, x + 16, y + 8, settings);
            spawn(ig.MinionProgress, x + 5, y + 47, settings);
            spawn(ig.MinionAchievements, x + 8, y + 64, settings);
            spawn(ig.MinionHire, x, y - 23, settings);
            spawn(ig.MinionCost, x + 114, y - 17, settings);
            spawn(ig.MinionDescription, x + 144, y + 15, settings);
        },
        update: function () {
            this.evaluate();
            this.behave();
            this.execute('update');
            this.isCardActive();
        },
        isCardActive: function () {
            var money = ig.player.money,
                cost = ig.player.minions[this.minionId].costBase,
                currentAmount = ig.player.minions[this.minionId].amount;
            if (money < cost && currentAmount === 0) {
                this.setState('inactive');
            } else {
                this.setState('active');
            }
        },
        draw: function () {
            this.parent();
            this.execute('draw');

        }
    });
});