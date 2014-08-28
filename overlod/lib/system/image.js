/*global ig*/
ig.module(
    'system.image'
).requires(
    'impact.image'
).defines(function () {
    'use strict';
    ig.Image.inject({
        extension: null,
        init: function (path) {
            this.testWebP();
            this.path = ig.config.prefix.image + path + this.extension();
            this.load();
        },
        testWebP: function (callback) {
            var webP = new Image();
            webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
            this.extension = webP.onload = webP.onerror = function () {
                //var ext = ((webP.height === 2) ? ".webp" : ".png");
                var ext = ((webP.height === 2) ? ".png" : ".png");
                return ext;
            };
        }
    });
});