/*global ig*/
ig.module(
    'system.entity.params'
).requires(
    'impact.entity'
).defines(function () {
    'use strict';
    // Entity tweaks
    ig.Entity.inject({
        gravityFactor: 0
    });
});