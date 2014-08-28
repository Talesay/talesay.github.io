/*global ig*/
ig.module(
    'scene.minion.top-button.base'
).requires(
    'impact.entity',
    'system.atlas'
).defines(function () {
    'use strict';
    ig.MinionSceneTopButton = ig.Entity.extend({
        size: {
            x: 130,
            y: 41
        },
        offset: {
            x: 0,
            y: 0
        },
        overSound: new ig.Sound('button-over.*', true),
        pressedSound: new ig.Sound('button-pressed.*', true),
        init: function (x, y, settings) {

            this.addTextureAtlasAnim(ig.game.sceneAtlas, 'active', 1, ['btn-new-game-active'], false);
            this.addTextureAtlasAnim(ig.game.sceneAtlas, 'over', 1, ['btn-new-game-over'], false);
            this.addTextureAtlasAnim(ig.game.sceneAtlas, 'pressed', 1, ['btn-new-game-over'], false);
            this.addTextureAtlasAnim(ig.game.sceneAtlas, 'inactive', 1, ['btn-new-game-inactive'], false);

            this.addComponent(new ig.AnimStates());
            this.addComponent(new ig.OnMouseOver());
            this.addComponent(new ig.OnMouseOut());
            this.addComponent(new ig.OnMousePressed());

            this.added();
            this.parent(x, y, settings);
            this.setState('inactive');
        },
        update: function () {
            if (this.state !== 'active') {
                this.evaluate();
                this.behave();
                this.execute('update');
            }

        },
        draw: function () {
            if (this.state !== 'hidden' && this.onScreen) {
                this.parent();
                this.execute('draw');
            }
        },
        added: function () {},
        over: function () {
            this.overSound.play();
            //this.addComponent(new ig.OnMouseOverOscillateY());
        },
        out: function () {
            //this.removeComponent(new ig.OnMouseOverOscillateY());
            this.setState('inactive');
        },
        pressed: function () {
            this.pressedSound.play();
            this.setAsActive();
        },
        setAsActive: function () {
            this.setState('active');
            this.currentAnim = this.anims.active;
        },
        setAsInactive: function () {
            this.setState('inactive');
            this.currentAnim = this.anims.inactive;
        }
    });
});