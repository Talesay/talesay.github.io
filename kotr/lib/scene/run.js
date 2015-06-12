/*global ig*/
ig.module(
    'scene.run'
).requires(
    'impact.game',
    'scene.run.lvl.start',
    'scene.run.lvl.segment-00',
    'scene.run.lvl.segment-01',
    'scene.run.lvl.segment-02',
    'scene.run.lvl.segment-03',
    'scene.run.lvl.segment-04',
    'scene.run.lvl.segment-05',
    'scene.run.lvl.segment-06',
    'scene.run.lvl.other',
    'scene.run.lvl.end'
).defines(function () {
    'use strict';
    ig.SceneRun = ig.Game.extend({
        level: {},
        gravity:200,
        init: function () {
            this.infiniteLevel = new ig.InfiniteLevelManager(this.level);
            this.screen.y = -32;
        },
        update: function () {
            this.parent();
            this.infiniteLevel.update();
            this.screen.x = this.player.pos.x - ig.system.width / 3;
            //this.screen.y = this.player.pos.y - ig.system.height / 2;
        },
        draw: function () {
            this.parent();
        }
    });
});