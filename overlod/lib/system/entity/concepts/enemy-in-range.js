/*global ig*/
ig.module(
    'system.entity.concepts.enemy-in-range'
).requires(
    'system.entity.concepts.base'
).defines(function () {
    'use strict';
    ig.EnemyInRange = ig.BaseConcept.extend({
        name: 'enemy-in-range',
        update: function (entity) {
            entity.enemyInRange = this.debounce(this.enemyInRange, [entity], entity.reflexes);
        },
        enemyInRange: function (entity) {
            var enemies = ig.game.unitsPerRow[entity.cellGrid.row][entity.checkAgainst];

            if (typeof enemies === 'undefined' || enemies.length < 1) {
                return false;
            }
            if (entity.type === 2) {
                enemies = enemies.filter(function (e) {
                    return e.pos.x < this.pos.x;
                }, entity).sort(function (a, b) {
                    return b.pos.x - a.pos.x;
                });
            } else {
                enemies = enemies.filter(function (e) {
                    return e.pos.x > this.pos.x;
                }, entity).sort(function (a, b) {
                    return a.pos.x - b.pos.x;
                });
            }
            if (typeof enemies === 'undefined' || enemies.length < 1) {
                return false;
            }

            return entity.distanceTo(enemies[0]) < entity.range;

        },
        added: function (entity) {
            entity.enemyInRange = this.debounce(this.enemyInRange, [entity], entity.reflexes);
        },
        removed: function (entity) {
            entity.enemyInRange = null;
        }
    });
});