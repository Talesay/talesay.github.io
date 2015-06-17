/*global ig*/
ig.module(
    'plugins.require'
).requires(
    'plugins.array.utilities',
    'plugins.rescale.image',
    'plugins.infinite-level.manager',
    'plugins.clickable.mixin',
    'plugins.domain.utilities',
    'plugins.interpolation.object',
    'plugins.music.manager',
    'plugins.loader.inject',
    'plugins.scene.manager'
).defines(function () {
    'use strict';
});