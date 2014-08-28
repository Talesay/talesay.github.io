/*global ig*/
ig.module(
    'system.entity.components.pause-movement'
).requires(
    'system.entity.components.base'
).defines(function () {
    'use strict';
    ig.PauseMovement = ig.BaseComponent.extend({
        name: 'pause-movement',
        originalMaxVel: {
            x: 0,
            y: 0
        },
        pauseMovement: function (entity) {

            entity.maxVel.x = 0;
            entity.maxVel.y = 0;

        },
        unpauseMovement: function (entity) {

            entity.maxVel.x = entity.originalMaxVel.x;
            entity.maxVel.y = entity.originalMaxVel.y;

        },
        added: function (entity) {
            entity.pauseMovement = this.pauseMovement;
            entity.unpauseMovement = this.unpauseMovement;
            entity.originalMaxVel = this.originalMaxVel;
            entity.originalMaxVel.x = entity.maxVel.x;
            entity.originalMaxVel.y = entity.maxVel.y;
        }
    });
});