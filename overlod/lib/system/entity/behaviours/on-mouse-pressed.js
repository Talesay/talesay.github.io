/*global ig*/
ig.module(
    'system.entity.behaviours.on-mouse-pressed'
).requires(
    'system.entity.behaviours.base'
).defines(function () {
    'use strict';
    ig.OnMousePressed = ig.BaseBehaviour.extend({
        name: 'on-mouse-pressed',
        concept: function (entity) {
            return ig.input.pressed('click') && ((entity.pos.x <= (ig.input.mouse.x + ig.game.screen.x)) &&
                ((ig.input.mouse.x + ig.game.screen.x) <= entity.pos.x + entity.size.x) &&
                (entity.pos.y <= (ig.input.mouse.y + ig.game.screen.y)) &&
                ((ig.input.mouse.y + ig.game.screen.y) <= entity.pos.y + entity.size.y));
        },
        update: function (entity) {
            entity.setState('pressed');
            entity.pressed();
        },
        pressed: function () {},

        added: function (entity) {
            entity.addComponent(new ig.MousePressingEntity());
            entity.pressed = entity.pressed || this.pressed;
        }
    });
});