/*global ig*/
ig.module(
    'system.sound.is-playing'
).requires(
    'impact.sound'
).defines(function () {
    'use strict';
    // Sound tweaks
    ig.Sound.inject({
        isPlaying: function () {
            return (this.currentClip !== null && this.currentClip.ended === false);
        }
    });
});