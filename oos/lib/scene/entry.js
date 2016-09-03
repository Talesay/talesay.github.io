/*jslint nomen: true*/
/*global ig*/
ig.module(
    'scene.entry'
).requires(
    'impact.game',
    'mixin.draw-flat-background'
).defines(function () {
    'use strict';
    ig.SceneEntry = ig.Game.extend({
        id: 'game',
        start: false,
        //gfx
        background: new ig.Image('med/bkg/entry.png'),
        copyrightNotice: new ig.Image('med/spr/entry/copyright-notice.png'),
        logo: new ig.Image('med/spr/entry/omen-of-sorrow-logo.png'),
        superLogo: new ig.Image('med/spr/entry/super.png'),
        pressStartAnimSheet: new ig.AnimationSheet('med/spr/entry/press-start-anim.png', 82, 7),
        superAnimSheet: new ig.AnimationSheet('med/spr/entry/super-anim.png', 264, 96),
        //sfx
        omenOfSorrow: new ig.Sound('med/sfx/entry/omen-of-sorrow.*'),
        click: new ig.Sound('med/sfx/entry/click.*'),
        backgroundPos: {
            x1: 0,
            x2: 394,
            y: 0
        },
        init: function () {
            this.alphaFlash = new ig.Interpolation(1, 0, 5, ig.Interpolation.quarticOut);
            this.logoFlash = new ig.Interpolation(-1, 1, 5, ig.Interpolation.exponentialIn);
            this.omenOfSorrow.play();
            ig.music.play('entry-msc');
            this.pressStartAnimation = new ig.Animation(this.pressStartAnimSheet, 0.0416, [0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 3, 3, 3, 3]);
            this.superAnimation = new ig.Animation(this.superAnimSheet, 0.048, [0, 1, 2, 3, 4]);
        },
        update: function () {
            //Animate Scrolling Background
            if (!this.start) {
                this.backgroundPos.x1 -= 16 * ig.system.tick;
                this.backgroundPos.x2 -= 16 * ig.system.tick;
                if (this.backgroundPos.x1 <= -394) {
                    this.backgroundPos.x1 = 0;
                    this.backgroundPos.x2 = 394;
                }
                //Animate Press Start Animation
                this.pressStartAnimation.update();
                //Animate Super Sprite
                this.superAnimation.update();
                if (ig.input.pressed('click') && !this.start) {
                    this.start = true;
                    this.click.play();
                }
            }
            if (this.start) {
                this.backgroundPos.y += 1024 * ig.system.tick;
            }
            if (this.backgroundPos.y > 224) {
                var scene = ig.scene.set('entry');
            }
            this.parent();
        },
        draw: function () {
            var context = ig.system.context;
            context.globalAlpha = 1;
            // This is a bit of a circle jerk. Entities reference game._rscreen 
            // instead of game.screen when drawing themselfs in order to be 
            // "synchronized" to the rounded(?) screen position
            this._rscreen.x = ig.system.getDrawPos(this.screen.x) / ig.system.scale;
            this._rscreen.y = ig.system.getDrawPos(this.screen.y) / ig.system.scale;
            if (this.start) {
                context.globalCompositeOperation = "screen";
                //Draw Scrolling Background
                this.background.draw(this.backgroundPos.x1, this.backgroundPos.y);
                this.background.draw(this.backgroundPos.x2, this.backgroundPos.y);
                //Draw Copyright Notice
                this.copyrightNotice.draw(136, 202 + this.backgroundPos.y);
                //Draw Super

                this.superAnimation.draw(67, 28 + this.backgroundPos.y);
                //Draw Logo
                this.logo.draw(81, 9 + this.backgroundPos.y);
                return;
            }
            //Draw Scrolling Background
            this.background.draw(this.backgroundPos.x1, 0);
            this.background.draw(this.backgroundPos.x2, 0);
            if (this.logoFlash.value > 0) {
                context.globalAlpha = this.logoFlash.value;
            } else {
                context.globalAlpha = 0;
            }
            //Draw Copyright Notice
            this.copyrightNotice.draw(136, 202);
            //Draw Super
            context.globalCompositeOperation = "difference";
            this.superAnimation.draw(67, 28);
            context.globalCompositeOperation = "source-over";
            //Draw Logo
            this.logo.draw(81, 9);
            //Draw Press Start Animation
            this.pressStartAnimation.draw(158, 182);
            //Draw Thunder
            context.globalAlpha = 1;
            context.fillStyle = 'rgba(255, 255, 255,' + this.alphaFlash.value + ')';
            context.fillRect(0, 0, ig.system.realWidth, ig.system.realHeight);
        }
    });
});