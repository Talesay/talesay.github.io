/*global ig, process, require*/
ig.module(
    'system.persistence.nwfilesystem'
).requires(
    'impact.game'
).defines(function () {
    'use strict';
    ig.PersistenceNWFileSystem = ig.Class.extend({
        /**
         * Initialize Persistence as Node-Webkit file system
         */
        init: function () {
            try {
                if (process.versions['node-webkit']) {
                    ig.Persistence.instance = this;
                    this.fs = require('fs');
                }
            } catch (e) {
                throw new ig.PersistenceError("Enviroment is not capable of accessing File System via NodeJs.");
            }
        },
        /**
         * Returns true if key is set, false otherwise
         */
        isSet: function (key) {
            var saveSlot = 'saves/save_' + this.currentSaveSlot + '.json',
                data = {};
            try {
                data = JSON.parse(this.fs.readFileSync(saveSlot, 'utf8'));
                if (data.hasOwnProperty(key)) {
                    return true;
                } else {
                    return false;
                }
            } catch (e) {
                if (e.code === 'ENOENT') {
                    return false;
                } else {
                    throw new ig.PersistenceError(e);
                }
            }
        },
        /**
         * Get a key's value
         */
        get: function (key, defaultValue) {
            var saveSlot = 'saves/save_' + this.currentSaveSlot + '.json',
                data = {};
            try {
                data = JSON.parse(this.fs.readFileSync(saveSlot, 'utf8'));
                if (data.hasOwnProperty(key)) {
                    return data[key];
                } else if (typeof defaultValue !== 'undefined') {
                    this.set(key, defaultValue);
                    return defaultValue;
                } else {
                    throw new ig.PersistenceError("No value stored for " + "'" + key + "'" + ", nor default value provided.");
                }
            } catch (e) {
                if (e.code === 'ENOENT') {
                    this.set(key, defaultValue);
                    return defaultValue;
                } else {
                    throw new ig.PersistenceError(e);
                }
            }
        },
        /**
         * Set a key's value, if it doesn't exist, it also creates the key
         */
        set: function (key, value) {
            var saveSlot = 'saves/save_' + this.currentSaveSlot + '.json',
                data = {};
            try {
                data = JSON.parse(this.fs.readFileSync(saveSlot, 'utf8'));
                data[key] = value;
                data = JSON.stringify(data, null, 4);
                this.fs.writeFileSync(saveSlot, data);
            } catch (e) {
                if (e.code === 'ENOENT') {
                    data[key] = value;
                    data = JSON.stringify(data, null, 4);
                    this.fs.writeFileSync(saveSlot, data);
                } else {
                    throw new ig.PersistenceError(e);
                }
            }
        },
        /**
         * Remove a key and it's value
         */
        remove: function (key) {
            if (this.isSet(key)) {
                var saveSlot = 'saves/save_' + this.currentSaveSlot + '.json',
                    data = {};
                try {
                    data = JSON.parse(this.fs.readFileSync(saveSlot, 'utf8'));
                    delete data[key];
                    data = JSON.stringify(data, null, 4);
                    this.fs.writeFileSync(saveSlot, data);
                } catch (e) {
                    if (e.code === 'ENOENT') {
                        delete data[key];
                        data = JSON.stringify(data, null, 4);
                        this.fs.writeFileSync(saveSlot, data);
                    } else {
                        throw new ig.PersistenceError(e);
                    }
                }
            } else {
                throw new ig.PersistenceError("'" + key + "'" + " is not stored as a key.");
            }
        }
    });
});