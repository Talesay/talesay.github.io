/*global ig*/
ig.module(
    'scene.minion.card.hire'
).requires(
    'impact.entity',
    'system.atlas'
).defines(function () {
    'use strict';
    ig.MinionHire = ig.Entity.extend({
        size: {
            x: 114,
            y: 22
        },
        init: function (x, y, settings) {
            this.minionId = settings.minionId;
            this.name = 'hire-' + this.minionId + '-btn';
            this.initGfx();
            this.initComponents();
            this.added();
            this.parent(x, y, settings);
        },
        initGfx: function () {
            this.addTextureAtlasAnim(ig.game.sceneAtlas, 'active', 1, ['card-hire-active'], false);
            this.addTextureAtlasAnim(ig.game.sceneAtlas, 'over', 1, ['card-hire-over'], false);
            this.addTextureAtlasAnim(ig.game.sceneAtlas, 'pressed', 1, ['card-hire-inactive'], false);
            this.addTextureAtlasAnim(ig.game.sceneAtlas, 'inactive', 1, ['card-hire-inactive'], false);
        },
        initComponents: function () {
            this.addComponent(new ig.AnimStates());
            this.addComponent(new ig.OnMouseOver());
            this.addComponent(new ig.OnMouseOut());
            this.addComponent(new ig.OnMousePressed());
        },
        update: function () {
            this.evaluate();
            this.behave();
            this.execute('update');

            if (ig.player.money < ig.player.minions[this.minionId].costBase) {
                this.setState('inactive');
            } else {
                this.setState('active');
            }
        },
        draw: function () {
            if (this.state !== 'hidden' && this.onScreen) {
                this.parent();
                this.execute('draw');
            }
        },
        added: function () {},
        over: function () {},
        out: function () {},
        pressed: function () {
            var hireAmount = 1;
            if (ig.player.money < this.getMinionCost(hireAmount)) {
                return;
            }
            this.increaseMinionStock(hireAmount);
            ig.player.minions[this.minionId].whipCounter = 0;
        },
        getMinionCost: function (n) {
            var cost = ig.player.minions[this.minionId].costBase,
                costProgression = ig.player.minions[this.minionId].costProgression,
                i;
            for (i = 0; i < n; i += 1) {
                cost *= costProgression;
            }
            return cost;
        },
        increaseMinionStock: function (n) {
            var costProgression = ig.player.minions[this.minionId].costProgression,
                i;
            ig.player.minions[this.minionId].amount += n;
            for (i = 0; i < n; i += 1) {
                ig.player.money -= ig.player.minions[this.minionId].costBase;
                ig.player.minions[this.minionId].costBase *= costProgression;
            }

        }
    });
});