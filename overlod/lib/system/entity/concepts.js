/*global ig*/
ig.module(
    'system.entity.concepts'
).requires(
    'impact.entity',
    'system.entity.concepts.base',
    'system.entity.concepts.enemy-in-range',
    'system.entity.concepts.enemy-in-row',
    'system.entity.concepts.is-moving',
    'system.entity.concepts.mouse-moved',
    'system.entity.concepts.mouse-over',
    'system.entity.concepts.mouse-pressed',
    'system.entity.concepts.mouse-pressing-entity',
    'system.entity.concepts.on-screen'

).defines(function () {
    'use strict';
    // Entity tweaks
    ig.Entity.inject({
        // contains all concepts
        concepts: [],
        evaluate: function () {
            var entity = this,
                concepts = this.concepts.length;
            if (concepts > 0) {
                do {
                    concepts -= 1;
                    this.concepts[concepts].update.apply(this.concepts[concepts], [entity]);
                } while (concepts > 0);
            }
        }
    });
});