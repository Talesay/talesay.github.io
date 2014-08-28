/*global ig*/
ig.module(
    'system.contains'
).requires().defines(function () {
    'use strict';
    var ContainsUtils = {
            containsAll: function (obj, other) {
                return Object.keys(other).every(function (key) {
                    return other[key] === obj[key];
                });
            },
            containsSome: function (obj, other) {
                return Object.keys(other).some(function (key) {
                    return other[key] === obj[key];
                });
            }
        },
        methodName;

    function installFunction(name, fn) {
        if (ig[name]) {
            throw ("method " + name + "() already defined elsewhere.");
        }
        Object.defineProperty(ig, name, {
            value: fn,
            enumerable: false
        });
    }
    for (methodName in ContainsUtils) {
        if (ContainsUtils.hasOwnProperty(methodName)) {
            installFunction(methodName, ContainsUtils[methodName]);
        }
    }
});