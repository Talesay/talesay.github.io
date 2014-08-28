/*global ig, process, require*/
ig.module(
    'system.api.nwgui'
).requires(
    'impact.game'
).defines(function () {
    'use strict';
    ig.APINWGUI = ig.Class.extend({

        // Node-Webkit
        nwGui: null,
        nwNewWindowParams: null,

        staticInstantiate: function (i) {
            return !ig.APINWGUI.instance ? null : ig.APINWGUI.instance;
        },

        init: function () {
            ig.APINWGUI.instance = this;

            // Initialize Node-Webkit (if necessary)
            this.initializeNodeWebkit();
        },

        exit: function () {
            try {
                //console.log('Exiting app...');
                window.close();
                window.location.href = this.companySiteURL;
            } catch (e) {}
        },
        initializeNodeWebkit: function () {
            try {
                // Load native UI library
                this.nwGui = require('nw.gui');

                // Set nodeWekit's new window parameters
                this.nwNewWindowParams = {
                    toolbar: false,
                    width: 1280,
                    height: 720,
                    position: 'center',
                    min_width: 800,
                    min_height: 600,
                    max_width: 1920,
                    max_height: 1080,
                    title: 'Fathership, by Talesay',
                    as_desktop: false,
                    resizable: true,
                    fullscreen: false,
                    frame: true,
                    show: true,
                    kiosk: false
                };
            } catch (e) {}
        }

    });

});