/*global ig*/
ig.module(
    'system.entity.components.unit-warp-in'
).requires(
    'system.entity.components.base'
).defines(function () {
    'use strict';
    ig.UnitWarpIn = ig.BaseComponent.extend({
        name: 'unit-warp-in',
        update: function (entity) {
            if (!entity.interpolatePosX.done) {
                var warpVel = entity.interpolatePosX;
                entity.vel.x = Number(warpVel);
            } else {
                entity.vel.x = entity.speed;
                entity.setState('accelerating');
                entity.removeComponent(new ig.UnitWarpIn());
            }
        },
        initInterpolation: function (entity) {
            var start = entity.speed * 3,
                end = entity.speed,
                duration = 0.2,
                ease = ig.Interpolation.ease.exponentialOut;
            entity.interpolatePosX = new ig.Interpolation(start, end, duration, ease);
        },
        added: function (entity) {
            entity.addComponent(new ig.SetState());
            entity.initInterpolation = this.initInterpolation;
            entity.initInterpolation(entity);
            entity.setState('spawning');
        }
    });
});