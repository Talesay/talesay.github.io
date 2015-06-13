/*jslint nomen: true*/
/*global ig*/
ig.module(
    'plugins.music.manager'
).requires(
    'impact.sound'
).defines(function () {
    'use strict';
    ig.Music.inject({
        _loop: true,
        add: function (music, name) {
            if (!ig.Sound.enabled) {
                return;
            }

            var path = music instanceof ig.Sound ? music.path : music,
                track = ig.soundManager.load(path, false);
            track.loop = this._loop;
            track.volume = this._volume;
            track.addEventListener('ended', this._endedCallbackBound, false);
            this.tracks.push(track);

            if (name) {
                this.namedTracks[name] = track;
            }

            if (!this.currentTrack) {
                this.currentTrack = track;
            }
        },
        play: function (name) {
            if (typeof (name) === 'undefined') {
                this.parent();
                return;
            }
            if (!this.namedTracks[name]) {
                this.add(ig.musicManager.getTrack(name), name);
            }
            this.parent(name);
        },
        stop: function () {
            if (!this.currentTrack) {
                return;
            }
            this.currentTrack.pause();
            // fix INVALID_STATE_ERR
            this.currentTrack.currentTime = 0;
        }
    });

    ig.MusicManager = ig.Class.extend({
        tracks: {},
        staticInstantiate: function (ignore) {
            this.alias('musicManager');
            return ig.MusicManager.instance || null;
        },
        alias: function (name) {
            Object.defineProperty(ig, name, {
                value: this
            });
        },
        init: function () {
            // Singleton instance assignation
            ig.MusicManager.instance = this;
        },
        addTrack: function (fileName, trackName) {
            this.tracks[trackName] = fileName + ".*";
        },
        getTrack: function (trackName) {
            return this.tracks[trackName];
        }
    });
    return new ig.MusicManager();
});