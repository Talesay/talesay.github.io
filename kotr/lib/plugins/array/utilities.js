/*global ig*/
ig.module(
	'plugins.array.utilities'
).requires().defines(function () {
	'use strict';
	var ArrayUtilities = {
			copy: function () {
				return this.slice(0);
			},
			contains: function (element) {
				return this.indexOf(element) >= 0;
			},
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
			getFirst: function () {
				return this[0];
			},
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
			getLast: function () {
				return this[this.length - 1];
			},
			shuffle: function () {
				var copy = this.splice(0),
					m = copy.length,
					t,
					i;
				while (m) {
					i = Math.floor(Math.random() * m);
					m -= 1;
					t = copy[m];
					copy[m] = copy[i];
					copy[i] = t;
				}
				return copy;
			},
			difference: function (array) {
				return this.filter(function (i) {
					return (array.indexOf(i) < 0);
				});
			},
			intersection: function (array) {
				return this.filter(function (i) {
					return (array.indexOf(i) !== -1);
				});
			},
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
			throw ("Array Utilities method " + name + "() already defined elsewhere.");
		}
		Object.defineProperty(Array.prototype, name, {
			value: fn,
			enumerable: false
		});
	}
	for (methodName in ArrayUtilities) {
		if (ArrayUtilities.hasOwnProperty(methodName)) {
			installFunction(methodName, ArrayUtilities[methodName]);
		}
	}
});