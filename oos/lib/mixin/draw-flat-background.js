/*jslint nomen: true*/
/*global ig*/
ig.module(
    'mixin.draw-flat-background'
).defines(function () {
    'use strict';
    // Game tweaks
    ig.MixinDrawFlatBackground = {
        draw: function () {
            // This is a bit of a circle jerk. Entities reference game._rscreen 
            // instead of game.screen when drawing themselfs in order to be 
            // "synchronized" to the rounded(?) screen position
            this._rscreen.x = ig.system.getDrawPos(this.screen.x) / ig.system.scale;
            this._rscreen.y = ig.system.getDrawPos(this.screen.y) / ig.system.scale;
            this.background.draw(0, 0);
            this.drawEntities();
        }
    };
});