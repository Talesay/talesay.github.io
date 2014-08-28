/*global ig*/
ig.module(
    'scene.shared.player'
).requires(
    'impact.impact'
).defines(function () {
    'use strict';
    ig.PlayerError = function (message) {
        this.name = "PlayerError";
        this.message = message;
    };
    ig.PlayerError.prototype = Error.prototype;
    ig.Player = ig.Class.extend({
        init: function () {
            //this.inventory = new ig.InventoryManager();
            if (!ig.player) {
                this.alias('player');
            }
        },
        /**
         * Sets an alias that can be used to access this singleton
         */
        alias: function (name) {
            Object.defineProperty(ig, name, {
                value: this
            });
        },
        minions: {
            skeleton: {
                plural: 'skeletons',
                amount: 1,
                costProgression: 1.07,
                costBase: 4,
                lootBase: 1,
                lootTimer: 1,
                progress: 0,
                whipProgress: 21,
                whipCounter: 0
            },
            bat: {
                plural: 'bats',
                amount: 0,
                costProgression: 1.13,
                costBase: 15,
                lootBase: 60,
                lootTimer: 4,
                progress: 0,
                whipProgress: 10.5,
                whipCounter: 0
            },
            slime: {
                plural: 'slimes',
                amount: 0,
                costProgression: 1.12,
                costBase: 180,
                lootBase: 540,
                lootTimer: 6,
                progress: 0,
                whipProgress: 5.25,
                whipCounter: 0
            },
            zombie: {
                plural: 'zombies',
                amount: 0,
                costProgression: 1.11,
                costBase: 2160,
                lootBase: 4320,
                lootTimer: 24,
                progress: 0,
                whipProgress: 2.125,
                whipCounter: 0
            },
            lizardman: {
                plural: 'lizardmen',
                amount: 0,
                costProgression: 1.1,
                costBase: 25920,
                lootBase: 51840,
                lootTimer: 96,
                progress: 0,
                whipProgress: 1.12,
                whipCounter: 0
            },
            mummy: {
                plural: 'mummies',
                amount: 0,
                costProgression: 1.09,
                costBase: 311040,
                lootBase: 622080,
                lootTimer: 384,
                progress: 0,
                whipProgress: 1.11,
                whipCounter: 0
            },
            wizard: {
                plural: 'wizards',
                amount: 0,
                costProgression: 1.08,
                costBase: 3732480,
                lootBase: 7464960,
                lootTimer: 1536,
                progress: 0,
                whipProgress: 1.1,
                whipCounter: 0
            },
            demon: {
                plural: 'demons',
                amount: 0,
                costProgression: 1.07,
                costBase: 44789760,
                lootBase: 89579520,
                lootTimer: 6144,
                progress: 0,
                whipProgress: 1,
                whipCounter: 0
            }
        },
        money: 1
    });
    return new ig.Player();
});