/*global ig*/
ig.module(
    'system.entity.behaviours.on-out-of-bounds'
).requires(
    'system.entity.behaviours.base'
).defines(function () {
    'use strict';
    ig.OnOutOfBounds = ig.BaseBehaviour.extend({
        name: 'on-out-of-bounds',
        concept: function (entity) {
            return !entity.onScreen && entity.state !== 'dying';
        },
        update: function (entity) {
            if (entity instanceof ig.BattleUnitBullets) {
                entity.kill(entity);
                entity.removeComponent(new ig.OnOutOfBounds());
                return;
            }
            if (!entity.createdByWaveManager) {
                //console.log('jugador');
                ig.game.getEntityByName('Inventory').increaseInvItemStock(entity.inventoryId, 1);
                ig.game.getEntityByName('Grid').updateTerritory(ig.Entity.TYPE.A);
            } else {
                //console.log('enemigo');
                ig.game.waveManager.pushWave(entity.inventoryId);
                ig.game.getEntityByName('Grid').updateTerritory(ig.Entity.TYPE.B);
            }
            entity.kill(entity);
            entity.removeComponent(new ig.OnOutOfBounds());

        },
        added: function (entity) {
            entity.addComponent(new ig.OnScreen());
        },
        removed: function (entity) {}
    });
});