/*global ig*/
ig.module(
    'system.persistence'
).requires(
    'impact.game',
    'system.persistence.nwfilesystem',
    'system.persistence.localstorage'
).defines(function () {
    'use strict';
    ig.PersistenceError = function (message) {
        this.name = "PersistenceError";
        this.message = message;
    };
    ig.PersistenceError.prototype = Error.prototype;
    ig.Persistence = ig.Class.extend({
        currentSaveSlot: 0,
        /**
         * Create a static instance of this class
         */
        staticInstantiate: function (ignore) {
            this.alias('persistence');
            switch (ig.config.build) {
            case 'web':
                ig.Persistence.inject(ig.PersistenceLocalStorage.prototype);
                break;
            case 'NodeWebkit':
                ig.Persistence.inject(ig.PersistenceNWFileSystem.prototype);
                break;
            default:
                ig.Persistence.inject(ig.PersistenceLocalStorage.prototype);
                break;
            }
            return ig.Persistence.instance || null;
        },
        /**
         * Sets an alias that can be used to access this singleton
         */
        alias: function (name) {
            Object.defineProperty(ig, name, {
                value: this
            });
        },
        /**
         * Set current save slot
         */
        setSaveSlot: function (saveSlot) {
            this.currentSaveSlot = saveSlot;
        },
        /**
         * Get current save slot
         */
        getCurrentSaveSlot: function () {
            return this.currentSaveSlot;
        },
        /**
         * Get a key's value as a Integer
         */
        getInt: function (key, defaultValue) {
            return parseInt(this.get(key, defaultValue), null);
        },
        /**
         * Get a key's value as a Float
         */
        getFloat: function (key, defaultValue) {
            return parseFloat(this.get(key, defaultValue));
        },
        /**
         * Get a key's value as a Boleean
         */
        getBool: function (key, defaultValue) {
            var value = this.get(key, defaultValue);
            switch (value.toString()) {
            case 'true':
                return true;
            case 'false':
                return false;
            default:
                throw new ig.PersistenceError("Value set for " + "'" + key + "'" + " is not boolean.");
            }
        },
        /**
         * Set a key's value if it's value is higher than the current persisted value
         */
        setHigher: function (key, value) {
            if (value > this.getFloat(key)) {
                this.set(key, value);
            }
        },
        /**
         * Set a key's value if it's value is lower than the current persisted value
         */
        setLower: function (key, value) {
            if (value < this.getFloat(key)) {
                this.set(key, value);
            }
        }
    });
    return new ig.Persistence();
});