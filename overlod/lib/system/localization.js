/*global ig*/
ig.module(
    'system.localization'
).requires(
    'impact.impact',
    'system.localization.en',
    'system.localization.es',
    'system.persistence'
).defines(function () {
    'use strict';
    ig.LocalizationError = function (message) {
        this.name = "LocalizationError";
        this.message = message;
    };
    ig.LocalizationError.prototype = Error.prototype;
    ig.Localization = ig.Class.extend({
        i18n: null,
        staticInstantiate: function (ignore) {
            this.alias('locale');
            return ig.Localization.instance || null;
        },
        alias: function (name) {
            Object.defineProperty(ig, name, {
                value: this
            });
        },
        init: function () {
            this.set(ig.persistence.get("language", ig.config.language));
        },
        set: function (locale) {
            switch (locale) {
            case 'en':
                this.i18n = ig.LocalizationEnglish;
                break;
            case 'es':
                this.i18n = ig.LocalizationSpanish;
                break;
            default:
                throw new ig.LocalizationError("No language setting defined.");
            }
        },
        string: function (section, key) {
            return this.i18n[section][key];
        }
    });
    return new ig.Localization();
});