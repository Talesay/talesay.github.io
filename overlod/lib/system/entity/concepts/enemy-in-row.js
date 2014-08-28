/*global ig*/
ig.module(
    'system.entity.concepts.enemy-in-row'
).requires(
    'system.entity.concepts.base'
).defines(function () {
    'use strict';
    ig.EnemyInRow = ig.BaseConcept.extend({
        name: 'enemy-in-row',
        update: function (entity) {
            entity.enemyInRow = this.debounce(this.enemyInRow, [entity], entity.reflexes);
        },
        enemyInRow: function (entity) {
            return (ig.game.unitsPerRow[entity.cellGrid.row][entity.checkAgainst].length > 0);
        },
        added: function (entity) {
            entity.enemyInRow = this.debounce(this.enemyInRow, [entity], entity.reflexes);
        },
        removed: function (entity) {
            entity.enemyInRow = null;
        }
    });
});