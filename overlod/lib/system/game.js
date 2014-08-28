/*jslint nomen: true*/
/*global ig*/
ig.module(
    'system.game'
).requires(
    'impact.game',
    'system.persistence',
    'system.input'
).defines(function () {
    'use strict';
    // Game tweaks
    ig.Game.inject({
        scale: {
            w: 1,
            h: 1
        },
        SORT_POS_YZ: function (a, b) {
            return (a.pos.y + a.zIndex) - (b.pos.y + b.zIndex);
        },
        staticInstantiate: function () {
            this.sortBy = this.SORT_POS_YZ;
            if (this.sceneMusic) {
                ig.music.play(this.sceneMusic);
            }
            ig.game = this;
            return null;
        },
        spawnEntity: function (type, x, y, settings) {
            var ent = this.parent(type, x, y, settings);
            // Sort entities every time whenever we spawn a new one.
            this._doSortEntities = true;
            return ent;
        },
        setScale: function (w, h) {
            this.scale.w = w;
            this.scale.h = h;

        },
        getEntitiesByGroup: function (TYPE) {
            var a = [],
                i = 0,
                ent;
            for (i; i < ig.game.entities.length; i += 1) {
                ent = ig.game.entities[i];
                if (ent.type === TYPE && !ent._killed) {
                    a.push(ent);
                }
            }
            return a;
        },
        draw: function () {
            if (this.clearColor && this.clearColor !== 'none') {
                ig.system.clear(this.clearColor);
            }
            ig.system.context.save();
            ig.system.context.scale(this.scale.w, this.scale.h);
            // This is a bit of a circle jerk. Entities reference game._rscreen 
            // instead of game.screen when drawing themselfs in order to be 
            // "synchronized" to the rounded(?) screen position
            this._rscreen.x = ig.system.getDrawPos(this.screen.x) / ig.system.scale;
            this._rscreen.y = ig.system.getDrawPos(this.screen.y) / ig.system.scale;

            if (this.sceneBackground) {
                if (this.sceneBackgroundPos) {
                    this.sceneBackground.draw(this.sceneBackgroundPos.x, this.sceneBackgroundPos.y);
                } else {
                    this.sceneBackground.draw(0, 0);
                }
                this.drawEntities();
            } else {
                var mapIndex,
                    map;
                for (mapIndex = 0; mapIndex < this.backgroundMaps.length; mapIndex += 1) {
                    map = this.backgroundMaps[mapIndex];
                    if (map.foreground) {
                        // All foreground layers are drawn after the entities
                        break;
                    }
                    map.setScreenPos(this.screen.x, this.screen.y);
                    map.draw();
                }
                this.drawEntities();
                for (mapIndex; mapIndex < this.backgroundMaps.length; mapIndex += 1) {
                    map = this.backgroundMaps[mapIndex];
                    map.setScreenPos(this.screen.x, this.screen.y);
                    map.draw();
                }
            }

            ig.system.context.restore();
        }
    });
});