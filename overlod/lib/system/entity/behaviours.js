/*global ig*/
ig.module(
    'system.entity.behaviours'
).requires(
    'impact.entity',
    'system.entity.behaviours.base',
    'system.entity.behaviours.anim-states',
    'system.entity.behaviours.on-cadence-shoot',
    'system.entity.behaviours.on-enemy-in-range-original-accel',
    'system.entity.behaviours.on-enemy-not-range-original-accel',
    'system.entity.behaviours.on-entity-dying',
    'system.entity.behaviours.on-entity-paused',
    'system.entity.behaviours.on-entity-unpaused',
    'system.entity.behaviours.on-hp-zero',
    'system.entity.behaviours.on-out-of-bounds',
    'system.entity.behaviours.on-mouse-out',
    'system.entity.behaviours.on-mouse-over',
    'system.entity.behaviours.on-mouse-pressed',
    'system.entity.behaviours.on-time-scale-zero'

).defines(function () {
    'use strict';
    // Entity tweaks
    ig.Entity.inject({
        // contains all behaviours
        behaviours: [],
        behave: function (methodName) {
            if (this.behaviours.length < 1) {
                return;
            }
            var entity = this,
                filteredBehaviours = this.behaviours.filter(function (b) {
                    //b.relevance = 0;
                    return b.concept(this);
                }, this);
            //behaviour = filteredBehaviours.length;
            if (filteredBehaviours.length < 1) {
                return;
            }
            /*filteredBehaviours.forEach(function (b, index, array) {
                b.criteria.forEach(function (element, index, array) {
                    b.relevance += 1;
                    return element(this);
                }, b);
            });
            filteredBehaviours.sort(function (a, b) {
                return b.relevance - a.relevance;
            });*/
            filteredBehaviours[0].update.apply(filteredBehaviours[0], [entity]);
        }
    });
});