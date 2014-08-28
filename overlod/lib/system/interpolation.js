/*global ig*/
ig.module(
    'system.interpolation'
).defines(function () {
    'use strict';
    ig.Interpolation = function (start, end, duration, easeFunction) {
        this.start = start || 0;
        this.end = end || 0;
        this.duration = duration || 0;
        this.easeFunction = easeFunction;
        this.startTime = ig.Timer.time;
        return this;
    };

    ig.Interpolation.prototype.valueOf = function () {
        if (this.done) {
            return this.end;
        }
        var elapsed = ig.Timer.time - this.startTime,
            v = (this.duration - elapsed) / this.duration;
        if (this.easeFunction) {
            v = this.easeFunction(v);
        }
        return (this.start * v) + (this.end * (1 - v));
    };

    Object.defineProperty(ig.Interpolation.prototype, 'value', {
        get: ig.Interpolation.prototype.valueOf
    });

    Object.defineProperty(ig.Interpolation.prototype, 'done', {
        get: function () {
            var elapsed = ig.Timer.time - this.startTime;
            return (elapsed >= this.duration);
        }
    });

    ig.Interpolation.ease = {
        linear: function (v) {
            return v;
        },
        quadraticEaseIn: function (v) {
            return v * v;
        },
        quadraticEaseOut: function (v) {
            return v * (2 - v);
        },
        quadraticInOut: function (v) {
            return v < 0.5 ? 2 * v * v : -1 + (4 - 2 * v) * v;
        },
        cubicIn: function (v) {
            return v * v * v;
        },
        cubicOut: function (v) {
            return (v -= 1) * v * v + 1;
        },
        cubicInOut: function (v) {
            return v < 0.5 ? 4 * v * v * v : (v - 1) * (2 * v - 2) * (2 * v - 2) + 1;
        },
        quarticIn: function (v) {
            return v * v * v * v;
        },
        quarticOut: function (v) {
            return 1 - (v -= 1) * v * v * v;
        },
        quarticInOut: function (v) {
            return v < 0.5 ? 8 * v * v * v * v : 1 - 8 * (v -= 1) * v * v * v;
        },
        quinticIn: function (v) {
            return v * v * v * v * v;
        },
        quinticOut: function (v) {
            return 1 + (v -= 1) * v * v * v * v;
        },
        quinticInOut: function (v) {
            return v < 0.5 ? 16 * v * v * v * v * v : 1 + 16 * (v -= 1) * v * v * v * v;
        },
        sinusoidalIn: function (v) {
            return -Math.cos(v * Math.PI / 2) + 1;
        },
        sinusoidalOut: function (v) {
            return Math.sin(v * Math.PI / 2);
        },
        sinusoidalInOut: function (v) {
            return -0.5 * (Math.cos(Math.PI * v) - 1);
        },
        exponentialIn: function (v) {
            return v === 0 ? 0 : Math.pow(2, 10 * (v - 1));
        },
        exponentialOut: function (v) {
            return v === 1 ? 1 : -Math.pow(2, -10 * v) + 1;
        },
        exponentialInOut: function (v) {
            if (v === 0) {
                return 0;
            }
            if (v === 1) {
                return 1;
            }
            if ((v *= 2) < 1) {
                return 0.5 * Math.pow(2, 10 * (v - 1));
            }
            return 0.5 * (-Math.pow(2, -10 * (v - 1)) + 2);
        },
        circularIn: function (v) {
            return -(Math.sqrt(1 - v * v) - 1);
        },
        circularOut: function (v) {
            return Math.sqrt(1 - ((v -= 1) * v));
        },
        circularInOut: function (v) {
            if ((v *= 2) < 1) {
                return -0.5 * (Math.sqrt(1 - v * v) - 1);
            }
            return 0.5 * (Math.sqrt(1 - (v -= 2) * v) + 1);
        },
        elasticIn: function (v) {
            var a = 1,
                s = 0.1,
                p = 2.5;
            if (v === 0) {
                return 0;
            }
            if (v === 1) {
                return 1;
            }
            return -(a * Math.pow(2, 10 * (v -= 1)) * Math.sin((v - s) * (2 * Math.PI) * p));
        },
        elasticOut: function (v) {
            var a = 1,
                s = 0.1,
                p = 2.5;
            if (v === 0) {
                return 0;
            }
            if (v === 1) {
                return 1;
            }
            return (a * Math.pow(2, -10 * v) * Math.sin((v - s) * (2 * Math.PI) * p) + 1);
        },
        elasticInOut: function (v) {
            var a = 1,
                s = 0.1,
                p = 2.5;
            if (v === 0) {
                return 0;
            }
            if (v === 1) {
                return 1;
            }
            if ((v *= 2) < 1) {
                return -0.5 * (a * Math.pow(2, 10 * (v -= 1)) * Math.sin((v - s) * (2 * Math.PI) * p));
            }
            return a * Math.pow(2, -10 * (v -= 1)) * Math.sin((v - s) * (2 * Math.PI) * p) * 0.5 + 1;
        },
        backIn: function (v) {
            var s = 1.70158;
            return v * v * ((s + 1) * v - s);
        },
        backOut: function (v) {
            var s = 1.70158;
            return (v = v - 1) * v * ((s + 1) * v + s) + 1;
        },
        backInOut: function (v) {
            var s = 2.5949095;
            if ((v *= 2) < 1) {
                return 0.5 * (v * v * ((s + 1) * v - s));
            }
            return 0.5 * ((v -= 2) * v * ((s + 1) * v + s) + 2);
        },
        bounceIn: function (v) {
            return 1 - ig.Interpolation.ease.bounceOut(1 - v);
        },
        bounceOut: function (v) {
            if (v < 0.3636) {
                return 7.5625 * v * v;
            } else if (v < 0.7272) {
                return 7.5625 * (v -= 0.5454) * v + 0.75;
            } else if (v < 0.909) {
                return 7.5625 * (v -= 0.8181) * v + 0.9375;
            } else {
                return 7.5625 * (v -= 0.9545) * v + 0.984375;
            }
        },
        bounceInOut: function (v) {
            if (v < 0.5) {
                return ig.Interpolation.ease.bounceIn(v * 2) * 0.5;
            }
            return ig.Interpolation.ease.bounceOut(v * 2 - 1) * 0.5 + 0.5;
        }
    };

});