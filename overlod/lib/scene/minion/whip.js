/*global ig*/
ig.module(
    'scene.minion.whip'
).requires(
    'impact.entity',
    'system.atlas'
).defines(function () {
    'use strict';
    ig.Whip = ig.Entity.extend({
        size: {
            x: 0,
            y: 0
        },
        zIndex: 200,
        dyingSound: new ig.Sound('whip-01.*', true),
        init: function (x, y, settings) {
            this.addTextureAtlasAnim(ig.game.sceneAtlas, 'active', 0.1, ['whip-01', 'whip-02', 'whip-03', 'whip-04', 'whip-05'].shuffle(), false, false);

            this.parent(x, y, settings);
            this.timer = new ig.Timer();
            this.currentAnim.angle = Math.random() * 100;
        },
        update: function () {
            this.evaluate();
            this.behave();
            this.execute('update');
            if (this.timer.delta() > 0.1) {
                this.dyingSound.play();
                this.kill();
            }
            this.state = 'dying';
            //this.parent();
        },
        draw: function () {
            this.parent();
            this.execute('draw');

        }
    });
});