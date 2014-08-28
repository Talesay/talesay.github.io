/*global ig, Audio*/
/*jslint regexp: true*/
ig.module(
    'system.sound.manager'
).requires(
    'impact.sound'
).defines(function () {
    'use strict';
    // SoundManager tweaks
    ig.SoundManager.inject({
        pauseExcludedSoundsPath: {},
        loadedMetadata: {},
        load: function (path, multiChannel, loadCallback) {

            // Path to the soundfile with the right extension (.ogg or .mp3)
            var realPath = ig.prefix + path.replace(/[^\.]+$/, this.format.ext) + ig.nocache,
                i,
                a,
                clip;

            // Sound file already loaded?
            if (this.clips[path]) {

                // Only loaded as single channel and now requested as multichannel?
                if (multiChannel && this.clips[path].length < ig.Sound.channels) {
                    for (i = this.clips[path].length; i < ig.Sound.channels; i += 1) {
                        a = new Audio(realPath);
                        a.load();
                        this.clips[path].push(a);
                    }
                }
                return this.clips[path][0];
            }

            clip = new Audio(realPath);
            if (loadCallback) {

                // The canplaythrough event is dispatched when the browser determines
                // that the sound can be played without interuption, provided the
                // download rate doesn't change.
                // FIXME: Mobile Safari doesn't seem to dispatch this event at all?
                clip.addEventListener('canplaythrough', function cb(ev) {
                    clip.removeEventListener('canplaythrough', cb, false);
                    loadCallback(path, true, ev);
                }, false);

                clip.addEventListener('error', function (ev) {
                    loadCallback(path, false, ev);
                }, false);

                clip.addEventListener('loadedmetadata', function () {
                    ig.soundManager.addLoadedMetadata(path);
                    // fix para INVALID_STATE_ERR
                    clip.currentTime = 0;
                }, false);
            }
            clip.preload = 'auto';
            clip.load();


            this.clips[path] = [clip];
            if (multiChannel) {
                for (i = 1; i < ig.Sound.channels; i += 1) {
                    a = new Audio(realPath);
                    a.load();
                    this.clips[path].push(a);
                }
            }

            return clip;
        },
        setVolume: function (volume) {
            this.volume = volume.limit(0, 1);
        },
        addLoadedMetadata: function (path) {
            this.loadedMetadata[path] = true;
        },
        isLoadedMetadata: function (path) {
            return (this.loadedMetadata[path] === true);
        },
        addPauseExcludedSound: function (path) {
            this.pauseExcludedSoundsPath[path] = true;
        },
        isSoundPauseExcluded: function (path) {
            return (this.pauseExcludedSoundsPath[path] === true);
        },
        pauseSounds: function () {
            if (!ig.Sound.enabled) {
                return;
            }
            var clips = ig.soundManager.clips,
                path,
                audioMultichannel,
                i,
                audio,
                l;
            for (path in clips) {
                if (clips.hasOwnProperty(path)) {
                    if (!ig.soundManager.isSoundPauseExcluded(path)) {
                        audioMultichannel = clips[path];
                        for (i = 0, l = audioMultichannel.length; i < l; i += 1) {
                            audio = audioMultichannel[i];
                            if (audio.paused === false) {
                                audio.isPaused = true;
                                audio.pause();
                            }
                        }
                    }
                }
            }
        },
        unPauseSounds: function () {
            if (!ig.Sound.enabled) {
                return;
            }
            var clips = ig.soundManager.clips,
                path,
                audioMultichannel,
                i,
                l,
                audio;
            for (path in clips) {
                if (clips.hasOwnProperty(path)) {
                    if (!ig.soundManager.isSoundPauseExcluded(path)) {
                        audioMultichannel = clips[path];
                        for (i = 0, l = audioMultichannel.length; i < l; i += 1) {
                            audio = audioMultichannel[i];
                            if (audio.isPaused === true) {
                                delete audio.isPaused;
                                audio.play();
                            }
                        }
                    }
                }
            }
        },
        stopSounds: function () {
            if (!ig.Sound.enabled) {
                return;
            }
            var clips = ig.soundManager.clips,
                audioMultichannel,
                path,
                i,
                l,
                audio;
            for (path in clips) {
                if (clips.hasOwnProperty(path)) {
                    if (!ig.soundManager.isSoundPauseExcluded(path)) {
                        audioMultichannel = clips[path];
                        for (i = 0, l = audioMultichannel.length; i < l; i += 1) {
                            audio = audioMultichannel[i];
                            if (audio.paused === false || audio.isPaused === true) {
                                delete audio.isPaused;
                                audio.pause();
                                if (this.isLoadedMetadata(path)) {
                                    audio.currentTime = 999999;
                                }
                            }
                        }
                    }
                }
            }
        }
    });
});