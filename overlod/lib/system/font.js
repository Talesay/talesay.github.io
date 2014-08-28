/*global ig*/
ig.module(
    'system.font'
).requires(
    'impact.font'
).defines(function () {
    'use strict';
    ig.Font.inject({
        draw: function (text, x, y, align, alpha) {
            ig.system.context.globalAlpha = alpha ? alpha : 1;
            this.parent(text, x, y, align);
            ig.system.context.globalAlpha = 1;
        }
    });
});