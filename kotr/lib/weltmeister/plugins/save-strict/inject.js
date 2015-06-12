/*global ig, wm*/
ig.module(
    'weltmeister.plugins.save-strict.inject'
).requires(
    'weltmeister.weltmeister'
).defines(function () {
    'use strict';
    wm.Weltmeister.inject({

        save: function (dialog, path) {
            if (!path.match(/\.js$/)) {
                path += '.js';
            }

            this.filePath = path;
            this.fileName = path.replace(/^.*\//, '');
            var data = this.levelData;
            data.entities = this.entities.getSaveData();
            data.layer = [];

            var resources = [],
                i;
            for (i = 0; i < this.layers.length; i++) {
                var layer = this.layers[i];
                data.layer.push(layer.getSaveData());
                if (layer.name != 'collision') {
                    resources.push(layer.tiles.path);
                }
            }


            var dataString = JSON.stringify(data);
            if (wm.config.project.prettyPrint) {
                dataString = JSONFormat(dataString);
            }

            // Make it an ig.module instead of plain JSON?
            if (wm.config.project.outputFormat == 'module') {
                var levelModule = path
                    .replace(wm.config.project.modulePath, '')
                    .replace(/\.js$/, '')
                    .replace(/\//g, '.');

                var levelName = levelModule.replace(/(^.*\.|-)(\w)/g, function (m, s, a) {
                    return a.toUpperCase();
                });


                var resourcesString = '';
                if (resources.length) {
                    resourcesString = "ig.Level" + levelName + "Resources=[new ig.Image('" +
                        resources.join("'), new ig.Image('") +
                        "')];\n";
                }

                // Collect all Entity Modules
                var requires = ['impact.image'];
                var requiresHash = {};
                for (var i = 0; i < data.entities.length; i++) {
                    var ec = this.entities.entityClasses[data.entities[i].type];
                    if (!requiresHash[ec]) {
                        requiresHash[ec] = true;
                        requires.push(ec);
                    }
                }

                // include /*JSON[*/ ... /*]JSON*/ markers, so we can easily load
                // this level as JSON again
                dataString =
                    "ig.module( '" + levelModule + "' )\n" +
                    ".requires( '" + requires.join("','") + "' )\n" +
                    ".defines(function(){\n" +
                    "ig.Level" + levelName + "=" +
                    "/*JSON[*/" + dataString + "/*]JSON*/" +
                    ";\n" +
                    resourcesString +
                    "});";
            }

            var postString =
                'path=' + encodeURIComponent(path) +
                '&data=' + encodeURIComponent(dataString);

            var req = $.ajax({
                url: wm.config.api.save,
                type: 'POST',
                dataType: 'json',
                async: false,
                data: postString,
                success: this.saveResponse.bind(this)
            });
        }

    });

});