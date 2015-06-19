/*global ig*/
ig.module(
    'scene.run'
).requires(
    'impact.game',
    'scene.run.ent.bat-01',
    'scene.run.ent.bat-02',
    'scene.run.ent.bat-03',
    'scene.run.ent.bat-04',
    'scene.run.ent.skeleton-01',
    'scene.run.ent.skeleton-02',
    'scene.run.ent.skeleton-03',
    'scene.run.ent.skeleton-04',
    'scene.run.ent.slime-01',
    'scene.run.ent.slime-02',
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
        clearColor: '#181624',
        init: function () {
            this.infiniteLevel = new ig.InfiniteLevelManager(this.level);
            this.initCamera();
            ig.music.play('04');
        },
        initCamera: function () {
            this.nextCameraPosY = this.player.pos.y / 2.5 - ig.system.height / 2 + this.player.size.y;
            this.nextCameraPosX = this.player.pos.x - ig.system.width / 4;
            this.getCameraPosY(this.nextCameraPosY, this.nextCameraPosY);
            this.getCameraPosX(this.nextCameraPosX, this.nextCameraPosX, 1, ig.Interpolation.linear);
        },
        positionCamera: function () {
            var lerp = ig.Interpolation.linear;
            this.nextCameraPosY = this.player.pos.y / 4 - ig.system.height / 2 + this.player.size.y;
            this.nextCameraPosX = this.player.pos.x - ig.system.width / 3;
            this.cameraPosY = new ig.Interpolation(this.cameraPosY.value, this.nextCameraPosY, 0.1, lerp, function () {});
            this.cameraPosX = new ig.Interpolation(this.cameraPosX.value, this.nextCameraPosX, 0.1, lerp, function () {});
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
            if (this.player.hitted) {
                this.nextCameraPosX = this.player.pos.x - ig.system.width / 3;
                this.getCameraPosX(this.cameraPosX.value, this.nextCameraPosX, 0.5, ig.Interpolation.exponentialIn);
            } else if (this.player.vel.x > 32 && this.player.standing && !this.player.attacked && this.player.standTime > 0.5) {
                this.nextCameraPosX = this.player.pos.x + 256 - ig.system.width / 4;
                this.getCameraPosX(this.cameraPosX.value, this.nextCameraPosX, 3, ig.Interpolation.exponentialIn);
            } else if (this.player.standing && this.player.vel.x < 32) {
                this.nextCameraPosX = this.player.pos.x - ig.system.width / 4;
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
            if (this.screen.y < -62) {
                this.screen.y = -62;
            }
            if (this.player.pos.y < 50) {
                this.screen.x = this.cameraPosX.value;
            }
        },
        draw: function () {
            this.parent();
        }
    });
});