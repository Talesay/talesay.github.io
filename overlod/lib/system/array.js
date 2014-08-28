/*global ig*/
ig.module(
    'system.array'
).requires().defines(function () {
    'use strict';
    var ArrayUtils = {
            /**
             * Returns a shallow copy of this array
             *
             */
            copy: function () {
                return this.slice(0);
            },
            /**
             * Returns true if this array contains 'element', returns false otherwise
             *
             */
            contains: function (element) {
                return this.indexOf(element) >= 0;
            },
            /**
             * Returns a copy of this array, removing the elements 'from' index 'to' index within it
             */
            remove: function (from, to) {
                var copy = [],
                    i = 0,
                    j = 0;
                for (i = 0; i < from; i += 1) {
                    copy[i] = this[i];
                }
                j = i;
                for (i = to + 1; i < this.length; i += 1) {
                    copy[j] = this[i];
                    j += 1;
                }
                return copy;
            },
            /**
             * Returns a copy of this array, rotated 'n' places, counterclockwise if 'n' is positive, clockwise otherwise
             */
            rotate: function (n) {
                if (!n) {
                    return this.slice(0);
                }
                var length = this.length,
                    thisIndex = (n > 0) ? n : length + n,
                    i = 0,
                    j = 0,
                    copy = [];
                for (i = thisIndex; i < length; i += 1) {
                    copy[j] = this[i];
                    j += 1;
                }
                for (i = 0; i < thisIndex; i += 1) {
                    copy[j] = this[i];
                    j += 1;
                }
                return copy;
            },
            /**
             * Returns a copy of this array, removing but the first 'n' elements from it
             */
            copyFirst: function (n) {
                var copy = this.slice(0);
                if (typeof n === 'undefined') {
                    copy.length = 1;
                    return copy;
                } else if (n >= copy.length) {
                    return copy;
                } else {
                    copy.length = n;
                    return copy;
                }
            },
            /**
             * Returns the first element of this array
             */
            getFirst: function () {
                return this[0];
            },
            /**
             * Returns a copy of this array, removing but the last 'n' elements from it
             */
            copyLast: function (n) {
                var copy = this.slice(0);
                if (typeof n === 'undefined') {
                    copy.remove(0, copy.length - 2);
                    return copy;
                } else if (n >= copy.length) {
                    return copy;
                } else {
                    copy.remove(0, copy.length - n - 1);
                    return copy;
                }
            },
            /**
             * Returns the last element of this array
             */
            getLast: function () {
                return this[this.length - 1];
            },
            /**
             * Returns a copy of this array, sorting it's elements randomly
             */
            shuffle: function () {
                var copy = this.slice(0);
                return copy.sort(function () {
                    return Math.random() - 0.5;
                });
            },
            /**
             * Returns this associative array length
             */
            getAssociativeArrayLength: function () {
                var length,
                    key;
                for (key in this) {
                    if (this.hasOwnProperty(key)) {
                        length = length + 1;
                    }
                }
                return length;
            },
            /**
             * Returns a copy of this array that contains the difference between source array with 'array'
             */
            difference: function (array) {
                return this.filter(function (i) {
                    return (array.indexOf(i) < 0);
                });
            },
            /**
             * Returns a copy of this array that contains the intersection between source array with 'array'
             */
            intersection: function (array) {
                return this.filter(function (i) {
                    return (array.indexOf(i) !== -1);
                });
            },
            /**
             * Returns a copy of this array that contains the union between source array with 'array', removing duplicates
             */
            union: function (array) {
                var obj = {},
                    result = [],
                    i,
                    key;
                for (i = this.length - 1; i >= 0; i = i - 1) {
                    obj[this[i]] = this[i];
                }
                for (i = array.length - 1; i >= 0; i = i - 1) {
                    obj[array[i]] = array[i];
                }
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        result.push(obj[key]);
                    }
                }
                return result;
            }
        },
        methodName;

    function installFunction(name, fn) {
        if (Array.prototype[name]) {
            throw ("Array method " + name + "() already defined elsewhere.");
        }
        Object.defineProperty(Array.prototype, name, {
            value: fn,
            enumerable: false
        });
    }
    for (methodName in ArrayUtils) {
        if (ArrayUtils.hasOwnProperty(methodName)) {
            installFunction(methodName, ArrayUtils[methodName]);
        }
    }

});