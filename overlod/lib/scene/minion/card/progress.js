/*global ig*/
ig.module(
    'scene.minion.card.progress'
).requires(
    'impact.entity',
    'system.atlas'
).defines(function () {
    'use strict';
    ig.MinionProgress = ig.Entity.extend({
        size: {
            x: 210,
            y: 15
        },
        zIndex: 1,
        moneySnd: new ig.Sound('money-01.*', true),
        font: new ig.Font('nevis-12-dfefd7'),
        name: '',
        grd: null,
        goldPerSecond: 0,
        pause: true,
        minionId: '',
        progress: 0,
        init: function (x, y, settings) {
            var id = settings.minionId;
            this.minionId = id;
            this.name = 'progress-' + id + '-bar';
            this.progress = ig.player.minions[id].progress;
            this.initTimer(ig.player.minions[id].lootTimer);
            this.initGfx();
            this.initGradient(ig.system.context);
            this.parent(x, y, settings);
        },
        initTimer: function (time) {
            this.timer = new ig.Supertimer(time);
            this.timer.pause();
        },
        initGfx: function () {
            this.barInit = new ig.AtlasImage(ig.game.sceneAtlas, 'progress-init');
            this.barEnd = new ig.AtlasImage(ig.game.sceneAtlas, 'progress-end');
            this.moneyIcon = new ig.AtlasImage(ig.game.sceneAtlas, 'money-0-16x16', true);
        },
        initGradient: function (context) {
            var ctx = context;
            this.grd = ctx.createLinearGradient(105.000, 0.000, 105.000, 15.000);
            this.grd.addColorStop(0.020, 'rgb(173, 26, 0)');
            this.grd.addColorStop(0.105, 'rgb(241, 9, 0)');
            this.grd.addColorStop(0.147, 'rgb(255, 80, 0)');
            this.grd.addColorStop(0.208, 'rgb(255, 255, 255)');
            this.grd.addColorStop(0.239, 'rgb(255, 36, 0)');
            this.grd.addColorStop(0.520, 'rgb(255, 36, 0)');
            this.grd.addColorStop(0.779, 'rgb(255, 36, 0)');
            this.grd.addColorStop(0.801, 'rgb(255, 255, 255)');
            this.grd.addColorStop(0.856, 'rgb(255, 80, 0)');
            this.grd.addColorStop(0.897, 'rgb(241, 9, 0)');
            this.grd.addColorStop(0.980, 'rgb(173, 26, 0)');
        },
        update: function () {
            this.handlePause();
            this.handleProgress();
            this.handleWhip();
            this.handleCompletion();

            this.parent();
        },
        handlePause: function () {
            if (this.pause && ig.player.minions[this.minionId].amount > 1) {
                this.timer.unpause();
                this.pause = false;
            }
        },
        handleProgress: function () {
            if (ig.player.minions[this.minionId].amount > 1 && !ig.player.minions[this.minionId].whiped) {
                this.progress = this.timer.delta().map(-ig.player.minions[this.minionId].lootTimer, 0, 0, 210);
                this.getGoldPerSecond();
                this.getGoldPerSecondToken();
            }
        },
        handleWhip: function () {
            if (ig.player.minions[this.minionId].whiped) {
                ig.player.minions[this.minionId].whiped = false;
                this.progress += ig.player.minions[this.minionId].whipProgress;
                this.timer.winding += ig.player.minions[this.minionId].lootTimer * (ig.player.minions[this.minionId].whipProgress / 100);
                ig.player.minions[this.minionId].whipCounter += 1;
            }
        },
        handleCompletion: function () {
            if (this.progress >= 210) {
                ig.player.money += ig.player.minions[this.minionId].lootBase * ig.player.minions[this.minionId].amount;
                ig.player.minions[this.minionId].progress = 0;
                this.timer.winding = 0;
                this.progress = 0;
                this.moneySnd.play();
                this.timer.reset();
            }
        },
        draw: function () {
            this.parent();
            var ctx = ig.system.context,
                x = this.pos.x,
                y = this.pos.y;

            // Fill with gradient
            ctx.fillStyle = this.grd;
            ctx.translate(x, y);
            if (this.progress > 1) {
                ctx.fillRect(0, 0, this.progress + 1, 15.000);
                this.barInit.draw(0, 0);
                this.barEnd.draw(this.progress, 0);
            }
            this.font.draw(this.goldPerSecond, 194, 1, ig.Font.ALIGN.RIGHT);
            this.moneyIcon.draw(194, 0);
            ctx.resetTransform();
        },
        getGoldPerSecond: function () {
            var loot = ig.player.minions[this.minionId].lootBase * ig.player.minions[this.minionId].amount,
                time = ig.player.minions[this.minionId].lootTimer;
            this.goldPerSecond = loot / time;
        },
        getGoldPerSecondToken: function () {
            var arr,
                remainder;
            this.goldPerSecond = (this.goldPerSecond).toExponential();
            arr = this.goldPerSecond.split('e+');
            this.exponent = arr[1];
            this.moneyIcon = new ig.AtlasImage(ig.game.sceneAtlas, 'money-' + this.exponent + '-16x16', true);
            remainder = this.exponent % 15;
            this.goldPerSecond = Math.round(arr[0] * Math.pow(10, remainder));
            this.goldPerSecond = '$ ' + this.numberWithCommas(this.goldPerSecond) + ' GPS';
        },
        numberWithCommas: function (x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    });
});