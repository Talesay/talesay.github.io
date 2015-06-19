/*global ig*/
ig.module(
    'scene.run.ent.slime-03'
).requires(
    'scene.run.ent.slime-01',
    'scene.run.ent.slime-02'
).defines(function () {
    'use strict';
    window.EntitySlime03 = window.EntitySlime01.extend({
        vel: {
            x: -32,
            y: 1
        },
        friction: {
            x: 0,
            y: 0
        },
        jumpTimer: 0,
        flipTimer: 0,
        animSheet: new ig.AnimationSheet('med/spr/enemy/slime-03.png', 16, 16),
        health: 1,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            var animSeq = [[0, 1], [1, 0]];
            this.addAnim('idle', 0.24, animSeq.random());
        },
        kill: function (attacked) {
            var one = ig.game.spawnEntity(window.EntitySlime02, this.pos.x - 2, this.pos.y - 1),
                two = ig.game.spawnEntity(window.EntitySlime02, this.pos.x + 2, this.pos.y);
            one.split();
            two.split();
            this.parent();
        }
    });
});