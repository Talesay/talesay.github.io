/*global ig*/
ig.module(
    'system.domain'
).requires().defines(function () {
    'use strict';
    var DomainUtils = {
            allowedDomains: [
                '127.0.0.1',
                'gamejolt.net',
                'gamejolt.com'
            ],
            getReferrerHostname: function () {
                var a = document.createElement('a');
                a.href = document.referrer;
                return a.hostname;
            },
            inIframe: function () {
                try {
                    return window.self !== window.top;
                } catch (e) {
                    return true;
                }
            },
            isCurrentDomainAllowed: function () {
                var isAllowed = false,
                    i;
                if (ig.inIframe()) {
                    for (i = 0; i < ig.allowedDomains.length; i += 1) {
                        if (ig.getReferrerHostname().match(new RegExp('([^\/]+.)?' + ig.allowedDomains[i] + '(\/|$)', 'i'))) {
                            isAllowed = true;
                        }
                    }
                } else {
                    for (i = 0; i < ig.allowedDomains.length; i += 1) {
                        if (window.location.hostname.match(new RegExp('([^\/]+.)?' + ig.allowedDomains[i] + '(\/|$)', 'i'))) {
                            isAllowed = true;
                        }
                    }
                }
                return isAllowed;
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
    for (methodName in DomainUtils) {
        if (DomainUtils.hasOwnProperty(methodName)) {
            installFunction(methodName, DomainUtils[methodName]);
        }
    }
});