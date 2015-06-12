/*jslint nomen: true*/
/*global ig*/
ig.module(
    'plugins.loader.inject'
).requires(
    'impact.loader'
).defines(function () {
    'use strict';
    ig.Loader.inject({
        endTime: 0,
        fadeToBlackTime: 2000,
        fadeToGameTime: 3000,
        logoWidth: 406,
        logoHeight: 120,
        logoImg: new Image(),
        init: function (gameClass, resources) {
            this.parent(gameClass, resources);
            this.logoImg.src = ('med/logo.png');
            ig.system.context.drawImage(this.logoImg, 0, 0);
        },
        end: function () {
            this.parent();
            this.endTime = Date.now();
            ig.system.setDelegate(this);
        },
        run: function () {
            var t = Date.now() - this.endTime,
                alpha = 1;
            if (t < this.fadeToBlackTime) {
                // Draw the logo -> fade to black
                this.draw();
                alpha = t.map(0, this.fadeToBlackTime, 0, 1);
            } else if (t < this.fadeToGameTime) {
                ig.game.run();
                alpha = t.map(this.fadeToBlackTime, this.fadeToGameTime, 1, 0);
            } else {
                ig.system.setDelegate(ig.game);
                return;
            }
            ig.system.context.fillStyle = 'rgba(19,32,39,' + alpha + ')';
            ig.system.context.fillRect(0, 0, ig.system.realWidth, ig.system.realHeight);
        },
        draw: function () {
            var ctx = ig.system.context,
                w = ig.system.realWidth,
                h = ig.system.realHeight,
                centerWidth = (ig.system.realWidth - this.logoWidth) * 0.5,
                centerHeight = (ig.system.realHeight - this.logoHeight) * 0.5,
                barW = 32;
            ctx.save();
            ctx.fillStyle = '#132027';
            ctx.fillRect(0, 0, w, h);
            ctx.translate(centerWidth, centerHeight);
            ctx.fillStyle = 'rgba(255,255,255,0.95)';
            this._drawStatus += (this.status - this._drawStatus) / 5;
            ctx.fillRect(-centerWidth, h - centerHeight - barW, w * this._drawStatus - barW, barW);
            ctx.fillRect(-centerWidth, -centerHeight, barW, h * this._drawStatus - barW);
            ctx.fillRect(w - centerWidth - barW, h - centerHeight, barW, -h * this._drawStatus + barW);
            ctx.fillRect(w - centerWidth, -centerHeight, -w * this._drawStatus + barW, barW);
            ig.system.context.drawImage(this.logoImg, 0, 0);
            ctx.restore();
        }
    });
});