/*global ig*/
ig.module(
    'system.entity.components'
).requires(
    'impact.entity',
    'system.entity.components.base',
    'system.entity.components.draw-text',
    'system.entity.components.dying',
    'system.entity.components.dying-sound',
    'system.entity.components.dying-particles',
    'system.entity.components.fade-out-kill',
    'system.entity.components.flip-animations-x',
    'system.entity.components.is-enemy',
    'system.entity.components.kill',
    'system.entity.components.oscillate-y',
    'system.entity.components.pause-entity',
    'system.entity.components.pause-animations',
    'system.entity.components.pause-movement',
    'system.entity.components.set-state',
    'system.entity.components.shoot',
    'system.entity.components.spawning',
    'system.entity.components.spawning-sound',
    'system.entity.components.spawning-particles',
    'system.entity.components.unit-warp-in'
).defines(function () {
    'use strict';
    // Entity tweaks
    ig.Entity.inject({
        // contains all components
        components: [],
        addComponent: function (component) {
            var elementPos = this[component.family].map(function (x) {
                return x.name;
            }).indexOf(component.name);
            if (elementPos === -1) {
                this[component.family].push(component);
                component.added(this);
            }
            return;
        },
        removeComponent: function (component) {
            var elementPos = this[component.family].map(function (x) {
                return x.name;
            }).indexOf(component.name);
            if (elementPos === -1) {
                return;
            }
            this[component.family][elementPos].removed(this);
            this[component.family] = this[component.family].remove(elementPos);
        },
        execute: function (methodName) {
            if (this.components.length < 1) {
                return;
            }
            var entity = this,
                component = this.components.length;
            if (component > 0) {
                do {
                    component -= 1;
                    if (this.components[component][methodName]) {
                        this.components[component][methodName].apply(this.components[component], [entity]);
                    }
                } while (component > 0);
            }
        }
    });
});