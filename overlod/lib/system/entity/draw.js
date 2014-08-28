/*global ig*/
ig.module(
    'system.entity.draw'
).requires(
    'impact.entity',
    'impact.system'
).defines(function () {
    'use strict';
    // Entity tweaks
    ig.Entity.inject({
        alpha: 1,
        blend: 'normal',
        scale: {
            x: 1,
            y: 1
        }, //user-defined scale
        initialOffset: {
            x: 0,
            y: 0
        }, //cached offset prior to scaling
        relativeScale: {
            x: 1,
            y: 1
        }, //scale relative to ig.system.scale
        initialSize: {
            x: 0,
            y: 0
        }, //cached size prior to scaling
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.initialOffset.x = this.offset.x;
            this.initialOffset.y = this.offset.y;
            this.initialSize.x = this.size.x;
            this.initialSize.y = this.size.y;
            this.setScale(this.scale.x, this.scale.y);
        },
        draw: function () {
            if (!this.currentAnim) {
                return;
            }
            var alpha = this.currentAnim.alpha,
                ctx = ig.system.context;
            this.currentAnim.alpha *= this.alpha;
            ctx.save();
            ctx.translate(
                ig.system.getDrawPos(this.pos.x.round() - this.offset.x - ig.game.screen.x),
                ig.system.getDrawPos(this.pos.y.round() - this.offset.y - ig.game.screen.y)
            );
            ctx.globalCompositeOperation = this.blend;
            ctx.scale(this.relativeScale.x, this.relativeScale.y);
            this.currentAnim.draw(0, 0);
            ctx.restore();
            this.currentAnim.alpha = alpha;
        },
        setScale: function (x, y) {
            //cache size prior to scaling
            var oX = this.size.x,
                oY = this.size.y;

            //set scale
            this.scale.x = x || this.scale.x;
            this.scale.y = y || this.scale.y;

            //set scale relative to game scale
            if (ig.system) { //'if' needed to avoid uglify bug
                this.relativeScale.x = this.scale.x / ig.system.scale;
                this.relativeScale.y = this.scale.y / ig.system.scale;
            }

            //scale offset
            this.offset.x = this.initialOffset.x * this.relativeScale.x;
            this.offset.y = this.initialOffset.y * this.relativeScale.y;

            //scale size
            this.size.x = this.initialSize.x * this.relativeScale.x;
            this.size.y = this.initialSize.y * this.relativeScale.y;

            //offset entity's position by the change in size
            this.pos.x += (oX - this.size.x) / 2;
            this.pos.y += (oY - this.size.y) / 2;
        }
    });
});