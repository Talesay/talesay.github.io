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
        nextCameraPosY: 0,
        nextCameraPosX: 0,
        cameraPosY: {},
        cameraPosX: {},
        init: function () {
            this.infiniteLevel = new ig.InfiniteLevelManager(this.level);
            this.nextCameraPosY = this.player.pos.y / 2.5 - ig.system.height / 2 + this.player.size.y;
            this.nextCameraPosX = this.player.pos.x - ig.system.width / 4;
            this.getCameraPosY(this.nextCameraPosY, this.nextCameraPosY);
            this.getCameraPosX(this.nextCameraPosX, this.nextCameraPosX, 1, ig.Interpolation.linear);
        },
        getCameraPosY: function (start, end) {
            var duration = 1,
                easing = ig.Interpolation.exponentialOut;
            this.cameraPosY = new ig.Interpolation(start, end, duration, easing, function () {});
        },
        getCameraPosX: function (start, end, duration, easing) {
            this.cameraPosX = new ig.Interpolation(start, end, duration, easing, function () {});
        },
        update: function () {
            this.parent();
            this.infiniteLevel.update();
            this.camera();
        },
        camera: function () {
            if (this.player.vel.x > 32 && this.player.standing && !this.player.attacked && this.player.standTime > 0.5) {
                this.nextCameraPosX = this.player.pos.x + 256 - ig.system.width / 4;
                this.getCameraPosX(this.cameraPosX.value, this.nextCameraPosX, 3, ig.Interpolation.exponentialIn);
            } else if (this.player.standing && this.player.vel.x < 32) {
                this.nextCameraPosX = this.player.pos.x + 64 - ig.system.width / 4;
                this.getCameraPosX(this.cameraPosX.value, this.nextCameraPosX, 2, ig.Interpolation.linear);
            } else {
                this.nextCameraPosX = this.player.pos.x + 64 - ig.system.width / 4;
                this.getCameraPosX(this.cameraPosX.value, this.nextCameraPosX, 1.1, ig.Interpolation.linear);
            }

            if (this.player.standing) {
                if (this.player.pos.y <= -14 && this.player.standTime > 0.1) {
                    this.nextCameraPosY = this.player.pos.y / 5 - ig.system.height / 2 + this.player.size.y;
                    this.getCameraPosY(this.cameraPosY.value, this.nextCameraPosY);
                } else if (this.player.pos.y <= 2 && this.player.standTime > 0.1) {
                    this.nextCameraPosY = this.player.pos.y / 4 - ig.system.height / 2 + this.player.size.y;
                    this.getCameraPosY(this.cameraPosY.value, this.nextCameraPosY);
                } else if (this.player.pos.y <= 18 && this.player.standTime > 0.25) {
                    this.nextCameraPosY = this.player.pos.y / 3 - ig.system.height / 2 + this.player.size.y;
                    this.getCameraPosY(this.cameraPosY.value, this.nextCameraPosY);
                } else if (this.player.pos.y <= 34) {
                    this.nextCameraPosY = this.player.pos.y / 2.5 - ig.system.height / 2 + this.player.size.y;
                    this.getCameraPosY(this.cameraPosY.value, this.nextCameraPosY);
                }
            } else {
                if (this.player.pos.y <= -32) {
                    this.nextCameraPosY = this.player.pos.y * 0.2 - ig.system.height / 2 - this.player.size.y / 2;
                    this.getCameraPosY(this.cameraPosY.value, this.nextCameraPosY);
                } else {
                    this.nextCameraPosY = this.player.pos.y / 5 - ig.system.height / 2 + this.player.size.y;
                    this.getCameraPosY(this.cameraPosY.value, this.nextCameraPosY);
                }
            }
            this.screen.y = this.cameraPosY.value;
            this.screen.x = this.cameraPosX.value;
        },
        draw: function () {
            this.parent();
        }
    });
});