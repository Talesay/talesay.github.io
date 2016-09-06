/*jslint nomen: true*/
/*global ig*/
ig.module(
    'scene.input'
).requires(
    'impact.game',
    'scene.crush.countdown',
    'scene.crush.player'
).defines(function () {
    'use strict';
    ig.SceneInput = ig.Game.extend({
        font: new ig.Font('med/04b03.font.png'),
        inputText: 'not working',
        seaAnimSheet: new ig.AnimationSheet('med/spr/crush/sea.png', 398, 75),
        skyAnimSheet: new ig.AnimationSheet('med/spr/crush/sky2.png', 398, 112),
        pier: new ig.Image('med/spr/crush/pier2.png'),
        flashCounter: 0,
        flashTreshold: 3,
        thunder: [
            new ig.Sound('med/sfx/crush/thunder-01.*'),
            new ig.Sound('med/sfx/crush/thunder-02.*'),
            new ig.Sound('med/sfx/crush/thunder-03.*')
        ],
        backgroundPos: {
            x1: 0,
            x2: 394
        },
        init: function () {
            //Reset Context
            var context = ig.system.context;
            context.globalCompositeOperation = "source-over";
            context.globalAlpha = 1;
            //anims
            this.seaAnimation = new ig.Animation(this.seaAnimSheet, 0.16, [0, 1, 2, 3, 4, 5, 6, 7]);
            this.skyAnimation = new ig.Animation(this.skyAnimSheet, 1, [0]);
            this.flashAnimation = new ig.Animation(this.skyAnimSheet, 0.016, [1, 2, 3, 2, 1]);
            //flash
            this.alphaFlash = new ig.Interpolation(0.5, 0, 0.048, ig.Interpolation.quarticOut);
            //Countdown
            this.countdown = ig.game.spawnEntity('EntityCountdown', ig.system.width / 2, 8);
            this.player = ig.game.spawnEntity('EntityPlayer', 60, 98);
        },
        update: function () {
            this.parent();
            ig.touch.update();
            ig.keyboard.update();
            ig.game.inputText = ig.keyboard.status || ig.touch.status;
            this.seaAnimation.update();
            this.backgroundPos.x1 -= 16 * ig.system.tick;
            this.backgroundPos.x2 -= 16 * ig.system.tick;
            if (this.backgroundPos.x1 <= -394) {
                this.backgroundPos.x1 = 0;
                this.backgroundPos.x2 = 394;
            }

            this.flashCounter += Math.random() * ig.system.tick;
            if (this.flashCounter > this.flashTreshold) {
                this.flashTreshold = 6 + Math.random() * 4;
                this.flashCounter = 0;
                this.flashAnimation.rewind();
                this.alphaFlash.reset();
                this.thunder.random().play();
            } else {
                this.skyAnimation.draw(this.backgroundPos.x1, 0);
                this.skyAnimation.draw(this.backgroundPos.x2, 0);
            }


            this.skyAnimation.update();
            this.flashAnimation.update();

        },
        draw: function () {
            // Draw all entities and backgroundMaps
            this.parent();
            this.seaAnimation.draw(0, 96);
            if (this.flashAnimation.loopCount < 1) {
                this.flashAnimation.draw(this.backgroundPos.x1, 0);
                this.flashAnimation.draw(this.backgroundPos.x2, 0);
                this.pier.draw(0, 160);
                //Draw Thunder
                ig.system.context.fillStyle = 'rgba(255, 255, 255,' + this.alphaFlash.value + ')';
                ig.system.context.fillRect(0, 0, ig.system.realWidth, ig.system.realHeight);
            } else {
                this.skyAnimation.draw(this.backgroundPos.x1, 0);
                this.skyAnimation.draw(this.backgroundPos.x2, 0);
                this.pier.draw(0, 160);
                // Add your own drawing code here
                var x = 150,
                    y = 100;
                if (ig.game.inputText) {
                    this.font.draw(ig.game.inputText, x, y, ig.Font.ALIGN.CENTER);
                }
            }
            this.player.draw();
            this.countdown.draw();
        }
    });
});