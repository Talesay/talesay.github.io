/*global ig*/
ig.module(
    'system.entity.components.kill'
).requires(
    'system.entity.components.base'
).defines(function () {
    'use strict';
    ig.Kill = ig.BaseComponent.extend({
        name: 'kill',
        kill: function (entity) {
            if (entity.createdByWaveManager) {
                ig.game.waveManager.discountEntity();
                ig.game.unitsPerRow[entity.cellGrid.row][entity.type].erase(entity); // probar si deberia remover
            } else if (!(entity instanceof ig.BattleUnitBullets)) {
                ig.game.getEntityByName('Inventory').decreaseInvItemInStage(entity.inventoryId, 1);
            }
            if (entity.cellGrid) {
                var coords = {
                        row: entity.cellGrid.row,
                        col: entity.cellGrid.col
                    },
                    cell = ig.game.getEntityByName('Grid').getGridCell(coords);
                cell.removeEntity();
                ig.game.unitsPerRow[entity.cellGrid.row][entity.type].erase(entity);
            }
            ig.game.removeEntity(entity);

        },
        added: function (entity) {
            entity.kill = this.kill;
        }
    });
});