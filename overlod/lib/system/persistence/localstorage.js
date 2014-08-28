/*global ig*/
ig.module(
    'system.persistence.localstorage'
).requires(
    'impact.game'
).defines(function () {
    'use strict';
    ig.PersistenceLocalStorage = ig.Class.extend({
        /**
         * Initialize Persistence as localStorage
         */
        init: function () {
            try {
                if (window.localStorage) {
                    ig.Persistence.instance = this;
                }
            } catch (e) {
                throw new ig.PersistenceError("Enviroment is not capable of localStorage.");
            }
        },
        /**
         * Returns true if key is set, false otherwise
         */
        isSet: function (key) {
            return (this.get(this.currentSaveSlot + key) !== 'undefined');
        },
        /**
         * Get a key's value
         */
        get: function (key, defaultValue) {
            var value = localStorage.getItem(this.currentSaveSlot + key);
            if (value !== null) {
                if (value !== 'undefined') {
                    value = JSON.parse(value);
                    return value;
                } else {
                    throw new ig.PersistenceError("The value stored for " + "'" + key + "'" + " is undefined.");
                }
            } else if (typeof defaultValue !== 'undefined') {
                this.set(key, defaultValue);
                return defaultValue;
            } else {
                throw new ig.PersistenceError("No value stored for " + "'" + key + "'" + ", nor default value provided.");
            }
        },
        /**
         * Set a key's value, if it doesn't exist, it also creates the key
         */
        set: function (key, value) {
            try {
                window.localStorage.setItem(this.currentSaveSlot + key, JSON.stringify(value));
            } catch (e) {
                throw new ig.PersistenceError(e.message);
            }
        },
        /**
         * Remove a key and it's value from local storage
         */
        remove: function (key) {
            if (this.isSet(this.currentSaveSlot + key)) {
                window.localStorage.removeItem(this.currentSaveSlot + key);
            } else {
                throw new ig.PersistenceError("'" + key + "'" + " is not stored as a key.");
            }
        }
    });
});