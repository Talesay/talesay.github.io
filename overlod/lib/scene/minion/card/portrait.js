/*global ig*/
ig.module(
    'scene.minion.card.portrait'
).requires(
    'impact.entity',
    'system.atlas',
    'scene.minion.whip'
).defines(function () {
    'use strict';
    ig.MinionPortrait = ig.Entity.extend({
        size: {
            x: 32,
            y: 32
        },
        zIndex: 1,
        minionId: '',
        init: function (x, y, settings) {
            var id = settings.minionId,
                portrait = 'card-portrait-' + id;
            this.minionId = id;
            this.name = portrait;
            this.initGfx(portrait);
            this.initComponents();
            this.parent(x, y, settings);
        },
        initGfx: function (portrait) {
            var atlas = ig.game.sceneAtlas;
            this.addTextureAtlasAnim(atlas, 'active', 0.4, [portrait + '-01', portrait + '-02'], false, true);
            this.addTextureAtlasAnim(atlas, 'inactive', 1, [portrait + '-inactive'], true);
            this.addTextureAtlasAnim(atlas, 'pressed', 1, [portrait + '-inactive'], true);
        },
        initComponents: function () {
            this.addComponent(new ig.OnMousePressed());
            this.addComponent(new ig.AnimStates());
        },
        update: function () {
            this.updateComponents();
            this.parent();
            this.isPortraitActive();
            this.handleWhip();

        },
        updateComponents: function () {
            this.evaluate();
            this.behave();
            this.execute('update');
        },
        handleWhip: function () {
            var whiped = ig.player.minions[this.minionId].whiped,
                whipAmount = ig.player.minions[this.minionId].whipCounter,
                minionAmount = ig.player.minions[this.minionId].amount;
            if (whiped && whipAmount > 10) {

                if (minionAmount < 2) {
                    return;
                }
                if (Math.random() * whipAmount > 9) {
                    this.decreaseMinionStock(1);

                    ig.player.minions[this.minionId].whipCounter = 0;
                }
            }
        },
        decreaseMinionStock: function (n) {
            var costProgression = ig.player.minions[this.minionId].costProgression,
                i;
            ig.player.minions[this.minionId].amount -= n;
            for (i = 0; i < n; i += 1) {
                ig.player.minions[this.minionId].costBase /= costProgression;
            }

        },
        draw: function () {
            this.parent();
            this.execute('draw');
        },
        isPortraitActive: function () {
            var currentAmount = ig.player.minions[this.minionId].amount;
            if (currentAmount > 0) {
                this.setState('active');
            } else {
                this.setState('inactive');
            }
        },
        pressed: function () {
            if (ig.player.minions[this.minionId].amount < 1) {
                return;
            }
            ig.game.spawnEntity(ig.Whip, this.pos.x, this.pos.y);
            ig.player.minions[this.minionId].whiped = true;
        }
    });
});