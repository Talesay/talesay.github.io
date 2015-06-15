/*global ig*/
ig.module(
	'plugins.infinite-level.manager'
).requires(
	'impact.system',
	'impact.game'
).defines(function () {
	'use strict';
	ig.InfiniteLevelManager = ig.Class.extend({
		options: {
			start: undefined,
			end: undefined,
            pieces: [],
			length: 0,
			checkX: true,
			checkY: true,
			nextLevelFunc: function (numLevels) {
				return Math.floor(Math.random() * numLevels);
			}
		},
		init: function (options) {
			ig.merge(this.options, options);
			ig.game.loadLevel(this.options.start);
			ig.game.collisionMap.name = 'collision';
			this.pushBackgroundMaps(this.getLayerNames());
			this.generateCompleteLevel(this.options.length);
		},
		getLayerNames: function () {
			var layerNames = [],
                levels = this.options.pieces,
				i,
				j,
				layer;
			for (i = 0; i < levels; i += 1) {
				for (j = 0; j < levels[i].layer.length; j += 1) {
					layer = levels[i].layer[j];
					if (layerNames.indexOf(levels[i].layer[j].name) === -1) {
						layerNames.push(levels[i].layer[j].name);
					}
				}
			}
			return layerNames;
		},
		pushBackgroundMaps: function (layerNames) {
			var i,
				map;
			for (i = 0; i < layerNames.length; i += 1) {
				map = this.getMap(layerNames[i]);
			}
		},
		getMap: function (layerName) {
			var i;
			for (i = 0; i < ig.game.backgroundMaps.length; i += 1) {
				if (layerName === ig.game.backgroundMaps[i].name) {
					return ig.game.backgroundMaps[i];
				} else if (layerName === 'collision') {
					return ig.game.collisionMap;
				}
			}
			return false;
		},
		loadLevel: function (level) {
			var nextLevel = level,
				i,
				entity;
			for (i = 0; i < nextLevel.entities.length; i += 1) {
				entity = nextLevel.entities[i];
				ig.game.spawnEntity(
					entity.type,
					entity.x + (ig.game.backgroundMaps[0].width * ig.game.backgroundMaps[0].tilesize),
					entity.y,
					entity.settings
				);
			}
			for (i = 0; i < ig.game.backgroundMaps.length; i += 1) {
				this.extendMap(ig.game.backgroundMaps[i], nextLevel);
			}
			if (ig.game.collisionMap.data) {
				this.extendMap(ig.game.collisionMap, nextLevel);
			}
		},
		update: function () {
			//this.removeOutOfBoundsEntities();
		},
		removeOutOfBoundsEntities: function () {
			var i = 0,
				entity;
			for (i; i < ig.game.entities.length; i += 1) {
				entity = ig.game.entities[i];
				if ((this.options.checkX && (entity.pos.x + entity.size.x) - ig.game.screen.x < 0) || (this.options.checkY && (entity.pos.y > ig.game.screen.y + ig.system.height))) {
					entity.kill();
				}
			}
		},
		getNextLevel: function () {
			return this.options.pieces[this.options.nextLevelFunc(this.options.pieces.length)];
		},
		extendMap: function (map, level) {
			var layer = this.getLayer(map.name, level),
				j,
				data = map.data;
			for (j = 0; j < data.length; j += 1) {
				data[j].push.apply(data[j], layer.data[j]);
			}
			map.width += layer.width;
		},
		getLayer: function (layerName, level) {
			var i;
			for (i = 0; i < level.layer.length; i += 1) {
				if (layerName === level.layer[i].name) {
					return level.layer[i];
				}
			}
			return false;
		},
		generateCompleteLevel: function (size) {
			var i = 0;
			for (i; i < size; i += 1) {
				this.loadLevel(this.getNextLevel());
			}
			this.loadLevel(JSON.parse(JSON.stringify(this.options.end)));
		}
	});
});