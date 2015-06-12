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
    'scene.run.lvl.segment-07',
    'scene.run.lvl.other',
    'scene.run.lvl.end'
).defines(function () {
    'use strict';
    ig.SceneRun = ig.Game.extend({
        level: {},
        gravity: 200,
        nextCameraPos: 0,
        cameraPos: {},
        init: function () {
            this.infiniteLevel = new ig.InfiniteLevelManager(this.level);
            this.nextCameraPos = this.player.pos.y / 3 - ig.system.height / 2;
            this.getCameraPos(this.nextCameraPos, this.nextCameraPos);
        },
        getCameraPos: function (start, end) {
            var duration = 0.32,
                easing = ig.Interpolation.linear;
            this.cameraPos = new ig.Interpolation(start, end, duration, easing, function () {});
        },
        update: function () {
            this.parent();
            this.infiniteLevel.update();
            this.screen.x = this.player.pos.x - ig.system.width / 4;

            if (this.player.standing) {
                if (this.player.pos.y <= -14) {
                    this.nextCameraPos = this.player.pos.y / 5 - ig.system.height / 2;
                    this.getCameraPos(this.cameraPos.value, this.nextCameraPos);
                } else if (this.player.pos.y <= 2) {
                    this.nextCameraPos = this.player.pos.y / 4 - ig.system.height / 2;
                    this.getCameraPos(this.cameraPos.value, this.nextCameraPos);
                } else if (this.player.pos.y <= 18) {
                    this.nextCameraPos = this.player.pos.y / 3 - ig.system.height / 2;
                    this.getCameraPos(this.cameraPos.value, this.nextCameraPos);
                } else if (this.player.pos.y <= 34) {
                    this.nextCameraPos = this.player.pos.y / 2.5 - ig.system.height / 2;
                    this.getCameraPos(this.cameraPos.value, this.nextCameraPos);
                }
            }
            if (!this.cameraPos.done) {
                this.screen.y = this.cameraPos.value;
            }

        },
        draw: function () {
            this.parent();
        }
    });
});