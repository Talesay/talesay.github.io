(function () {
	// Convert array to object
	'use strict';
	var convArrToObj = function (array) {
			var thisEleObj = {},
				i,
				thisEle;
			if (typeof array === "object") {
				for (i in array) {
					if (array.hasOwnProperty(i)) {
						thisEle = convArrToObj(array[i]);
						thisEleObj[i] = thisEle;
					}
				}
			} else {
				thisEleObj = array;
			}
			return thisEleObj;
		},
		oldJSONStringify = JSON.stringify;
	JSON.stringify = function (input) {
		if (oldJSONStringify(input) === '[]') {
			return oldJSONStringify(convArrToObj(input));
		} else {
			return oldJSONStringify(input);
		}
	};
}());