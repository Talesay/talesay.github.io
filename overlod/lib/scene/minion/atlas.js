/*global ig*/
ig.module(
    'scene.minion.atlas'
).requires().defines(function () {
    "use strict";
    ig.MinionAtlas = ig.Class.extend({
        staticInstantiate: function (ignore) {
            return ig.MinionAtlas.instance || null;
        },
        init: function () {
            // Singleton instance assignation
            ig.MinionAtlas.instance = this;
        },
        sprites: {"frames": [
	{
		"filename": "bkg", "rotated": false,"trimmed": true,
		"frame": {"x":0,"y":0,"w":800,"h":450},
		"spriteSourceSize": {"x":0,"y":0,"w":800,"h":450},
		"sourceSize": {"w":800,"h":450}
	},
	{
		"filename": "btn-boss-active", "rotated": false,"trimmed": true,
		"frame": {"x":0,"y":654,"w":130,"h":39},
		"spriteSourceSize": {"x":0,"y":0,"w":130,"h":41},
		"sourceSize": {"w":130,"h":41}
	},
	{
		"filename": "btn-boss-inactive", "rotated": false,"trimmed": true,
		"frame": {"x":0,"y":694,"w":130,"h":33},
		"spriteSourceSize": {"x":0,"y":0,"w":130,"h":41},
		"sourceSize": {"w":130,"h":41}
	},
	{
		"filename": "btn-boss-over", "rotated": false,"trimmed": true,
		"frame": {"x":131,"y":620,"w":130,"h":33},
		"spriteSourceSize": {"x":0,"y":0,"w":130,"h":41},
		"sourceSize": {"w":130,"h":41}
	},
	{
		"filename": "btn-lair-active", "rotated": false,"trimmed": true,
		"frame": {"x":0,"y":728,"w":130,"h":39},
		"spriteSourceSize": {"x":0,"y":0,"w":130,"h":41},
		"sourceSize": {"w":130,"h":41}
	},
	{
		"filename": "btn-lair-inactive", "rotated": false,"trimmed": true,
		"frame": {"x":131,"y":688,"w":130,"h":33},
		"spriteSourceSize": {"x":0,"y":0,"w":130,"h":41},
		"sourceSize": {"w":130,"h":41}
	},
	{
		"filename": "btn-lair-over", "rotated": false,"trimmed": true,
		"frame": {"x":131,"y":756,"w":130,"h":33},
		"spriteSourceSize": {"x":0,"y":0,"w":130,"h":41},
		"sourceSize": {"w":130,"h":41}
	},
	{
		"filename": "btn-minion-active", "rotated": false,"trimmed": true,
		"frame": {"x":222,"y":525,"w":130,"h":41},
		"spriteSourceSize": {"x":0,"y":0,"w":130,"h":41},
		"sourceSize": {"w":130,"h":41}
	},
	{
		"filename": "btn-minion-inactive", "rotated": false,"trimmed": true,
		"frame": {"x":0,"y":620,"w":130,"h":33},
		"spriteSourceSize": {"x":0,"y":0,"w":130,"h":41},
		"sourceSize": {"w":130,"h":41}
	},
	{
		"filename": "btn-minion-over", "rotated": false,"trimmed": true,
		"frame": {"x":131,"y":722,"w":130,"h":33},
		"spriteSourceSize": {"x":0,"y":0,"w":130,"h":41},
		"sourceSize": {"w":130,"h":41}
	},
	{
		"filename": "btn-new-game-active", "rotated": false,"trimmed": true,
		"frame": {"x":222,"y":451,"w":130,"h":39},
		"spriteSourceSize": {"x":0,"y":0,"w":130,"h":41},
		"sourceSize": {"w":130,"h":41}
	},
	{
		"filename": "btn-new-game-inactive", "rotated": false,"trimmed": true,
		"frame": {"x":131,"y":654,"w":130,"h":33},
		"spriteSourceSize": {"x":0,"y":0,"w":130,"h":41},
		"sourceSize": {"w":130,"h":41}
	},
	{
		"filename": "btn-new-game-over", "rotated": false,"trimmed": true,
		"frame": {"x":222,"y":491,"w":130,"h":33},
		"spriteSourceSize": {"x":0,"y":0,"w":130,"h":41},
		"sourceSize": {"w":130,"h":41}
	},
	{
		"filename": "card-achievements-bkg", "rotated": false,"trimmed": true,
		"frame": {"x":0,"y":591,"w":202,"h":28},
		"spriteSourceSize": {"x":2,"y":2,"w":205,"h":31},
		"sourceSize": {"w":205,"h":31}
	},
	{
		"filename": "card-bkg-active", "rotated": false,"trimmed": true,
		"frame": {"x":0,"y":521,"w":221,"h":69},
		"spriteSourceSize": {"x":0,"y":0,"w":221,"h":69},
		"sourceSize": {"w":221,"h":69}
	},
	{
		"filename": "card-bkg-inactive", "rotated": false,"trimmed": true,
		"frame": {"x":0,"y":451,"w":221,"h":69},
		"spriteSourceSize": {"x":0,"y":0,"w":221,"h":69},
		"sourceSize": {"w":221,"h":69}
	},
	{
		"filename": "card-cost-bkg", "rotated": false,"trimmed": true,
		"frame": {"x":262,"y":627,"w":107,"h":24},
		"spriteSourceSize": {"x":0,"y":0,"w":107,"h":24},
		"sourceSize": {"w":107,"h":24}
	},
	{
		"filename": "card-hire-active", "rotated": false,"trimmed": true,
		"frame": {"x":262,"y":597,"w":114,"h":29},
		"spriteSourceSize": {"x":0,"y":0,"w":114,"h":29},
		"sourceSize": {"w":114,"h":29}
	},
	{
		"filename": "card-hire-inactive", "rotated": false,"trimmed": true,
		"frame": {"x":222,"y":567,"w":114,"h":29},
		"spriteSourceSize": {"x":0,"y":0,"w":114,"h":29},
		"sourceSize": {"w":114,"h":29}
	},
	{
		"filename": "card-hire-over", "rotated": false,"trimmed": true,
		"frame": {"x":0,"y":768,"w":114,"h":29},
		"spriteSourceSize": {"x":0,"y":0,"w":114,"h":29},
		"sourceSize": {"w":114,"h":29}
	},
	{
		"filename": "card-portrait-bat-01", "rotated": false,"trimmed": true,
		"frame": {"x":419,"y":501,"w":28,"h":30},
		"spriteSourceSize": {"x":2,"y":2,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	{
		"filename": "card-portrait-bat-02", "rotated": false,"trimmed": true,
		"frame": {"x":394,"y":645,"w":32,"h":32},
		"spriteSourceSize": {"x":0,"y":0,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	{
		"filename": "card-portrait-bat-inactive", "rotated": false,"trimmed": true,
		"frame": {"x":419,"y":451,"w":28,"h":30},
		"spriteSourceSize": {"x":2,"y":2,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	{
		"filename": "card-portrait-demon-01", "rotated": false,"trimmed": true,
		"frame": {"x":419,"y":532,"w":28,"h":30},
		"spriteSourceSize": {"x":0,"y":0,"w":28,"h":30},
		"sourceSize": {"w":28,"h":30}
	},
	{
		"filename": "card-portrait-demon-02", "rotated": false,"trimmed": true,
		"frame": {"x":425,"y":728,"w":28,"h":28},
		"spriteSourceSize": {"x":0,"y":0,"w":28,"h":30},
		"sourceSize": {"w":28,"h":30}
	},
	{
		"filename": "card-portrait-demon-inactive", "rotated": false,"trimmed": true,
		"frame": {"x":448,"y":480,"w":28,"h":30},
		"spriteSourceSize": {"x":0,"y":0,"w":28,"h":30},
		"sourceSize": {"w":28,"h":30}
	},
	{
		"filename": "card-portrait-lizardman-01", "rotated": false,"trimmed": true,
		"frame": {"x":470,"y":594,"w":26,"h":26},
		"spriteSourceSize": {"x":2,"y":2,"w":28,"h":28},
		"sourceSize": {"w":28,"h":28}
	},
	{
		"filename": "card-portrait-lizardman-02", "rotated": false,"trimmed": true,
		"frame": {"x":441,"y":563,"w":28,"h":28},
		"spriteSourceSize": {"x":0,"y":0,"w":28,"h":28},
		"sourceSize": {"w":28,"h":28}
	},
	{
		"filename": "card-portrait-lizardman-inactive", "rotated": false,"trimmed": true,
		"frame": {"x":470,"y":567,"w":26,"h":26},
		"spriteSourceSize": {"x":2,"y":2,"w":28,"h":28},
		"sourceSize": {"w":28,"h":28}
	},
	{
		"filename": "card-portrait-mummy-01", "rotated": false,"trimmed": true,
		"frame": {"x":427,"y":631,"w":28,"h":32},
		"spriteSourceSize": {"x":0,"y":0,"w":28,"h":32},
		"sourceSize": {"w":28,"h":32}
	},
	{
		"filename": "card-portrait-mummy-02", "rotated": false,"trimmed": true,
		"frame": {"x":441,"y":592,"w":28,"h":30},
		"spriteSourceSize": {"x":0,"y":2,"w":28,"h":32},
		"sourceSize": {"w":28,"h":32}
	},
	{
		"filename": "card-portrait-mummy-inactive", "rotated": false,"trimmed": true,
		"frame": {"x":425,"y":678,"w":28,"h":30},
		"spriteSourceSize": {"x":0,"y":2,"w":28,"h":32},
		"sourceSize": {"w":28,"h":32}
	},
	{
		"filename": "card-portrait-skeleton-01", "rotated": false,"trimmed": true,
		"frame": {"x":477,"y":482,"w":26,"h":32},
		"spriteSourceSize": {"x":0,"y":0,"w":26,"h":32},
		"sourceSize": {"w":26,"h":32}
	},
	{
		"filename": "card-portrait-skeleton-02", "rotated": false,"trimmed": true,
		"frame": {"x":477,"y":451,"w":26,"h":30},
		"spriteSourceSize": {"x":0,"y":2,"w":26,"h":32},
		"sourceSize": {"w":26,"h":32}
	},
	{
		"filename": "card-portrait-skeleton-inactive", "rotated": false,"trimmed": true,
		"frame": {"x":483,"y":621,"w":26,"h":32},
		"spriteSourceSize": {"x":0,"y":0,"w":26,"h":32},
		"sourceSize": {"w":26,"h":32}
	},
	{
		"filename": "card-portrait-slime-01", "rotated": false,"trimmed": true,
		"frame": {"x":394,"y":769,"w":30,"h":24},
		"spriteSourceSize": {"x":2,"y":4,"w":32,"h":28},
		"sourceSize": {"w":32,"h":28}
	},
	{
		"filename": "card-portrait-slime-02", "rotated": false,"trimmed": true,
		"frame": {"x":361,"y":683,"w":32,"h":28},
		"spriteSourceSize": {"x":0,"y":0,"w":32,"h":28},
		"sourceSize": {"w":32,"h":28}
	},
	{
		"filename": "card-portrait-slime-inactive", "rotated": false,"trimmed": true,
		"frame": {"x":394,"y":744,"w":30,"h":24},
		"spriteSourceSize": {"x":2,"y":4,"w":32,"h":28},
		"sourceSize": {"w":32,"h":28}
	},
	{
		"filename": "card-portrait-wizard-01", "rotated": false,"trimmed": true,
		"frame": {"x":410,"y":579,"w":30,"h":32},
		"spriteSourceSize": {"x":0,"y":0,"w":30,"h":32},
		"sourceSize": {"w":30,"h":32}
	},
	{
		"filename": "card-portrait-wizard-02", "rotated": false,"trimmed": true,
		"frame": {"x":394,"y":711,"w":30,"h":32},
		"spriteSourceSize": {"x":0,"y":0,"w":30,"h":32},
		"sourceSize": {"w":30,"h":32}
	},
	{
		"filename": "card-portrait-wizard-inactive", "rotated": false,"trimmed": true,
		"frame": {"x":394,"y":678,"w":30,"h":32},
		"spriteSourceSize": {"x":0,"y":0,"w":30,"h":32},
		"sourceSize": {"w":30,"h":32}
	},
	{
		"filename": "card-portrait-zombie-01", "rotated": false,"trimmed": true,
		"frame": {"x":482,"y":724,"w":26,"h":30},
		"spriteSourceSize": {"x":0,"y":2,"w":26,"h":32},
		"sourceSize": {"w":26,"h":32}
	},
	{
		"filename": "card-portrait-zombie-02", "rotated": false,"trimmed": true,
		"frame": {"x":481,"y":766,"w":26,"h":32},
		"spriteSourceSize": {"x":0,"y":0,"w":26,"h":32},
		"sourceSize": {"w":26,"h":32}
	},
	{
		"filename": "card-portrait-zombie-inactive", "rotated": false,"trimmed": true,
		"frame": {"x":483,"y":654,"w":26,"h":30},
		"spriteSourceSize": {"x":0,"y":2,"w":26,"h":32},
		"sourceSize": {"w":26,"h":32}
	},
	{
		"filename": "money-0-16x16", "rotated": false,"trimmed": true,
		"frame": {"x":203,"y":790,"w":10,"h":9},
		"spriteSourceSize": {"x":3,"y":4,"w":16,"h":16},
		"sourceSize": {"w":16,"h":16}
	},
	{
		"filename": "money-0", "rotated": false,"trimmed": true,
		"frame": {"x":510,"y":605,"w":20,"h":18},
		"spriteSourceSize": {"x":6,"y":8,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	{
		"filename": "money-1-16x16", "rotated": false,"trimmed": true,
		"frame": {"x":544,"y":674,"w":14,"h":9},
		"spriteSourceSize": {"x":1,"y":4,"w":16,"h":16},
		"sourceSize": {"w":16,"h":16}
	},
	{
		"filename": "money-1", "rotated": false,"trimmed": true,
		"frame": {"x":419,"y":482,"w":28,"h":18},
		"spriteSourceSize": {"x":2,"y":8,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	{
		"filename": "money-10-16x16", "rotated": false,"trimmed": true,
		"frame": {"x":510,"y":651,"w":16,"h":16},
		"spriteSourceSize": {"x":0,"y":0,"w":16,"h":16},
		"sourceSize": {"w":16,"h":16}
	},
	{
		"filename": "money-10", "rotated": false,"trimmed": true,
		"frame": {"x":386,"y":451,"w":32,"h":32},
		"spriteSourceSize": {"x":0,"y":0,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	{
		"filename": "money-11-16x16", "rotated": false,"trimmed": true,
		"frame": {"x":525,"y":493,"w":16,"h":16},
		"spriteSourceSize": {"x":0,"y":0,"w":16,"h":16},
		"sourceSize": {"w":16,"h":16}
	},
	{
		"filename": "money-11", "rotated": false,"trimmed": true,
		"frame": {"x":386,"y":517,"w":32,"h":32},
		"spriteSourceSize": {"x":0,"y":0,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	{
		"filename": "money-12-16x16", "rotated": false,"trimmed": true,
		"frame": {"x":527,"y":527,"w":11,"h":10},
		"spriteSourceSize": {"x":3,"y":3,"w":16,"h":16},
		"sourceSize": {"w":16,"h":16}
	},
	{
		"filename": "money-12", "rotated": false,"trimmed": true,
		"frame": {"x":504,"y":472,"w":22,"h":20},
		"spriteSourceSize": {"x":6,"y":6,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	{
		"filename": "money-13-16x16", "rotated": false,"trimmed": true,
		"frame": {"x":115,"y":790,"w":16,"h":10},
		"spriteSourceSize": {"x":0,"y":3,"w":16,"h":16},
		"sourceSize": {"w":16,"h":16}
	},
	{
		"filename": "money-13", "rotated": false,"trimmed": true,
		"frame": {"x":328,"y":778,"w":32,"h":20},
		"spriteSourceSize": {"x":0,"y":6,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	{
		"filename": "money-14-16x16", "rotated": false,"trimmed": true,
		"frame": {"x":529,"y":700,"w":16,"h":15},
		"spriteSourceSize": {"x":0,"y":1,"w":16,"h":16},
		"sourceSize": {"w":16,"h":16}
	},
	{
		"filename": "money-14", "rotated": false,"trimmed": true,
		"frame": {"x":377,"y":614,"w":32,"h":30},
		"spriteSourceSize": {"x":0,"y":2,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	{
		"filename": "money-15-16x16", "rotated": false,"trimmed": true,
		"frame": {"x":214,"y":790,"w":10,"h":9},
		"spriteSourceSize": {"x":3,"y":4,"w":16,"h":16},
		"sourceSize": {"w":16,"h":16}
	},
	{
		"filename": "money-15", "rotated": false,"trimmed": true,
		"frame": {"x":504,"y":493,"w":20,"h":18},
		"spriteSourceSize": {"x":6,"y":8,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	{
		"filename": "money-16-16x16", "rotated": false,"trimmed": true,
		"frame": {"x":149,"y":790,"w":14,"h":9},
		"spriteSourceSize": {"x":1,"y":4,"w":16,"h":16},
		"sourceSize": {"w":16,"h":16}
	},
	{
		"filename": "money-16", "rotated": false,"trimmed": true,
		"frame": {"x":425,"y":709,"w":28,"h":18},
		"spriteSourceSize": {"x":2,"y":8,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	{
		"filename": "money-17-16x16", "rotated": false,"trimmed": true,
		"frame": {"x":542,"y":485,"w":14,"h":14},
		"spriteSourceSize": {"x":1,"y":1,"w":16,"h":16},
		"sourceSize": {"w":16,"h":16}
	},
	{
		"filename": "money-17", "rotated": false,"trimmed": true,
		"frame": {"x":448,"y":451,"w":28,"h":28},
		"spriteSourceSize": {"x":2,"y":2,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	{
		"filename": "money-18-16x16", "rotated": false,"trimmed": true,
		"frame": {"x":473,"y":648,"w":8,"h":14},
		"spriteSourceSize": {"x":4,"y":1,"w":16,"h":16},
		"sourceSize": {"w":16,"h":16}
	},
	{
		"filename": "money-18", "rotated": false,"trimmed": true,
		"frame": {"x":544,"y":645,"w":16,"h":28},
		"spriteSourceSize": {"x":8,"y":2,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	{
		"filename": "money-19-16x16", "rotated": false,"trimmed": true,
		"frame": {"x":508,"y":786,"w":16,"h":14},
		"spriteSourceSize": {"x":0,"y":1,"w":16,"h":16},
		"sourceSize": {"w":16,"h":16}
	},
	{
		"filename": "money-19", "rotated": false,"trimmed": true,
		"frame": {"x":295,"y":708,"w":32,"h":28},
		"spriteSourceSize": {"x":0,"y":2,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	{
		"filename": "money-2-16x16", "rotated": false,"trimmed": true,
		"frame": {"x":115,"y":768,"w":14,"h":14},
		"spriteSourceSize": {"x":1,"y":1,"w":16,"h":16},
		"sourceSize": {"w":16,"h":16}
	},
	{
		"filename": "money-2", "rotated": false,"trimmed": true,
		"frame": {"x":454,"y":664,"w":28,"h":28},
		"spriteSourceSize": {"x":2,"y":2,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	{
		"filename": "money-20-16x16", "rotated": false,"trimmed": true,
		"frame": {"x":538,"y":557,"w":16,"h":16},
		"spriteSourceSize": {"x":0,"y":0,"w":16,"h":16},
		"sourceSize": {"w":16,"h":16}
	},
	{
		"filename": "money-20", "rotated": false,"trimmed": true,
		"frame": {"x":353,"y":550,"w":32,"h":32},
		"spriteSourceSize": {"x":0,"y":0,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	{
		"filename": "money-21-16x16", "rotated": false,"trimmed": true,
		"frame": {"x":546,"y":761,"w":10,"h":15},
		"spriteSourceSize": {"x":3,"y":1,"w":16,"h":16},
		"sourceSize": {"w":16,"h":16}
	},
	{
		"filename": "money-21", "rotated": false,"trimmed": true,
		"frame": {"x":508,"y":685,"w":20,"h":30},
		"spriteSourceSize": {"x":6,"y":2,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	{
		"filename": "money-22-16x16", "rotated": false,"trimmed": true,
		"frame": {"x":531,"y":629,"w":16,"h":15},
		"spriteSourceSize": {"x":0,"y":1,"w":16,"h":16},
		"sourceSize": {"w":16,"h":16}
	},
	{
		"filename": "money-22", "rotated": false,"trimmed": true,
		"frame": {"x":295,"y":737,"w":32,"h":30},
		"spriteSourceSize": {"x":0,"y":2,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	{
		"filename": "money-23-16x16", "rotated": false,"trimmed": true,
		"frame": {"x":531,"y":613,"w":16,"h":15},
		"spriteSourceSize": {"x":0,"y":1,"w":16,"h":16},
		"sourceSize": {"w":16,"h":16}
	},
	{
		"filename": "money-23", "rotated": false,"trimmed": true,
		"frame": {"x":328,"y":652,"w":32,"h":30},
		"spriteSourceSize": {"x":0,"y":2,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	{
		"filename": "money-24-16x16", "rotated": false,"trimmed": true,
		"frame": {"x":441,"y":664,"w":12,"h":12},
		"spriteSourceSize": {"x":2,"y":2,"w":16,"h":16},
		"sourceSize": {"w":16,"h":16}
	},
	{
		"filename": "money-24", "rotated": false,"trimmed": true,
		"frame": {"x":497,"y":540,"w":24,"h":24},
		"spriteSourceSize": {"x":4,"y":4,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	{
		"filename": "money-25-16x16", "rotated": false,"trimmed": true,
		"frame": {"x":538,"y":574,"w":16,"h":16},
		"spriteSourceSize": {"x":0,"y":0,"w":16,"h":16},
		"sourceSize": {"w":16,"h":16}
	},
	{
		"filename": "money-25", "rotated": false,"trimmed": true,
		"frame": {"x":328,"y":683,"w":32,"h":32},
		"spriteSourceSize": {"x":0,"y":0,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	{
		"filename": "money-26-16x16", "rotated": false,"trimmed": true,
		"frame": {"x":531,"y":596,"w":16,"h":16},
		"spriteSourceSize": {"x":0,"y":0,"w":16,"h":16},
		"sourceSize": {"w":16,"h":16}
	},
	{
		"filename": "money-26", "rotated": false,"trimmed": true,
		"frame": {"x":328,"y":716,"w":32,"h":32},
		"spriteSourceSize": {"x":0,"y":0,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	{
		"filename": "money-27-16x16", "rotated": false,"trimmed": true,
		"frame": {"x":179,"y":790,"w":11,"h":10},
		"spriteSourceSize": {"x":3,"y":3,"w":16,"h":16},
		"sourceSize": {"w":16,"h":16}
	},
	{
		"filename": "money-27", "rotated": false,"trimmed": true,
		"frame": {"x":504,"y":451,"w":22,"h":20},
		"spriteSourceSize": {"x":6,"y":6,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	{
		"filename": "money-28-16x16", "rotated": false,"trimmed": true,
		"frame": {"x":132,"y":790,"w":16,"h":10},
		"spriteSourceSize": {"x":0,"y":3,"w":16,"h":16},
		"sourceSize": {"w":16,"h":16}
	},
	{
		"filename": "money-28", "rotated": false,"trimmed": true,
		"frame": {"x":361,"y":774,"w":32,"h":20},
		"spriteSourceSize": {"x":0,"y":6,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	{
		"filename": "money-29-16x16", "rotated": false,"trimmed": true,
		"frame": {"x":529,"y":684,"w":16,"h":15},
		"spriteSourceSize": {"x":0,"y":1,"w":16,"h":16},
		"sourceSize": {"w":16,"h":16}
	},
	{
		"filename": "money-29", "rotated": false,"trimmed": true,
		"frame": {"x":377,"y":583,"w":32,"h":30},
		"spriteSourceSize": {"x":0,"y":2,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	{
		"filename": "money-3-16x16", "rotated": false,"trimmed": true,
		"frame": {"x":547,"y":713,"w":8,"h":14},
		"spriteSourceSize": {"x":4,"y":1,"w":16,"h":16},
		"sourceSize": {"w":16,"h":16}
	},
	{
		"filename": "money-3", "rotated": false,"trimmed": true,
		"frame": {"x":530,"y":716,"w":16,"h":28},
		"spriteSourceSize": {"x":8,"y":2,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	{
		"filename": "money-30-16x16", "rotated": false,"trimmed": true,
		"frame": {"x":445,"y":791,"w":10,"h":9},
		"spriteSourceSize": {"x":3,"y":4,"w":16,"h":16},
		"sourceSize": {"w":16,"h":16}
	},
	{
		"filename": "money-30", "rotated": false,"trimmed": true,
		"frame": {"x":448,"y":542,"w":20,"h":18},
		"spriteSourceSize": {"x":6,"y":8,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	{
		"filename": "money-31-16x16", "rotated": false,"trimmed": true,
		"frame": {"x":164,"y":790,"w":14,"h":9},
		"spriteSourceSize": {"x":1,"y":4,"w":16,"h":16},
		"sourceSize": {"w":16,"h":16}
	},
	{
		"filename": "money-31", "rotated": false,"trimmed": true,
		"frame": {"x":410,"y":612,"w":28,"h":18},
		"spriteSourceSize": {"x":2,"y":8,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	{
		"filename": "money-32-16x16", "rotated": false,"trimmed": true,
		"frame": {"x":544,"y":500,"w":14,"h":14},
		"spriteSourceSize": {"x":1,"y":1,"w":16,"h":16},
		"sourceSize": {"w":16,"h":16}
	},
	{
		"filename": "money-32", "rotated": false,"trimmed": true,
		"frame": {"x":425,"y":757,"w":28,"h":28},
		"spriteSourceSize": {"x":2,"y":2,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	{
		"filename": "money-33-16x16", "rotated": false,"trimmed": true,
		"frame": {"x":547,"y":728,"w":8,"h":14},
		"spriteSourceSize": {"x":4,"y":1,"w":16,"h":16},
		"sourceSize": {"w":16,"h":16}
	},
	{
		"filename": "money-33", "rotated": false,"trimmed": true,
		"frame": {"x":539,"y":527,"w":16,"h":28},
		"spriteSourceSize": {"x":8,"y":2,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	{
		"filename": "money-34-16x16", "rotated": false,"trimmed": true,
		"frame": {"x":525,"y":786,"w":16,"h":14},
		"spriteSourceSize": {"x":0,"y":1,"w":16,"h":16},
		"sourceSize": {"w":16,"h":16}
	},
	{
		"filename": "money-34", "rotated": false,"trimmed": true,
		"frame": {"x":386,"y":550,"w":32,"h":28},
		"spriteSourceSize": {"x":0,"y":2,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	{
		"filename": "money-35-16x16", "rotated": false,"trimmed": true,
		"frame": {"x":527,"y":510,"w":16,"h":16},
		"spriteSourceSize": {"x":0,"y":0,"w":16,"h":16},
		"sourceSize": {"w":16,"h":16}
	},
	{
		"filename": "money-35", "rotated": false,"trimmed": true,
		"frame": {"x":386,"y":484,"w":32,"h":32},
		"spriteSourceSize": {"x":0,"y":0,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	{
		"filename": "money-36-16x16", "rotated": false,"trimmed": true,
		"frame": {"x":546,"y":745,"w":10,"h":15},
		"spriteSourceSize": {"x":3,"y":1,"w":16,"h":16},
		"sourceSize": {"w":16,"h":16}
	},
	{
		"filename": "money-36", "rotated": false,"trimmed": true,
		"frame": {"x":509,"y":716,"w":20,"h":30},
		"spriteSourceSize": {"x":6,"y":2,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	{
		"filename": "money-37-16x16", "rotated": false,"trimmed": true,
		"frame": {"x":419,"y":563,"w":16,"h":15},
		"spriteSourceSize": {"x":0,"y":1,"w":16,"h":16},
		"sourceSize": {"w":16,"h":16}
	},
	{
		"filename": "money-37", "rotated": false,"trimmed": true,
		"frame": {"x":361,"y":743,"w":32,"h":30},
		"spriteSourceSize": {"x":0,"y":2,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	{
		"filename": "money-38-16x16", "rotated": false,"trimmed": true,
		"frame": {"x":510,"y":668,"w":16,"h":15},
		"spriteSourceSize": {"x":0,"y":1,"w":16,"h":16},
		"sourceSize": {"w":16,"h":16}
	},
	{
		"filename": "money-38", "rotated": false,"trimmed": true,
		"frame": {"x":295,"y":677,"w":32,"h":30},
		"spriteSourceSize": {"x":0,"y":2,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	{
		"filename": "money-39-16x16", "rotated": false,"trimmed": true,
		"frame": {"x":546,"y":684,"w":12,"h":12},
		"spriteSourceSize": {"x":2,"y":2,"w":16,"h":16},
		"sourceSize": {"w":16,"h":16}
	},
	{
		"filename": "money-39", "rotated": false,"trimmed": true,
		"frame": {"x":477,"y":515,"w":24,"h":24},
		"spriteSourceSize": {"x":4,"y":4,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	{
		"filename": "money-4-16x16", "rotated": false,"trimmed": true,
		"frame": {"x":521,"y":581,"w":16,"h":14},
		"spriteSourceSize": {"x":0,"y":1,"w":16,"h":16},
		"sourceSize": {"w":16,"h":16}
	},
	{
		"filename": "money-4", "rotated": false,"trimmed": true,
		"frame": {"x":328,"y":749,"w":32,"h":28},
		"spriteSourceSize": {"x":0,"y":2,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	{
		"filename": "money-40-16x16", "rotated": false,"trimmed": true,
		"frame": {"x":527,"y":468,"w":16,"h":16},
		"spriteSourceSize": {"x":0,"y":0,"w":16,"h":16},
		"sourceSize": {"w":16,"h":16}
	},
	{
		"filename": "money-40", "rotated": false,"trimmed": true,
		"frame": {"x":353,"y":517,"w":32,"h":32},
		"spriteSourceSize": {"x":0,"y":0,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	{
		"filename": "money-41-16x16", "rotated": false,"trimmed": true,
		"frame": {"x":522,"y":540,"w":16,"h":16},
		"spriteSourceSize": {"x":0,"y":0,"w":16,"h":16},
		"sourceSize": {"w":16,"h":16}
	},
	{
		"filename": "money-41", "rotated": false,"trimmed": true,
		"frame": {"x":353,"y":451,"w":32,"h":32},
		"spriteSourceSize": {"x":0,"y":0,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	{
		"filename": "money-42-16x16", "rotated": false,"trimmed": true,
		"frame": {"x":191,"y":790,"w":11,"h":10},
		"spriteSourceSize": {"x":3,"y":3,"w":16,"h":16},
		"sourceSize": {"w":16,"h":16}
	},
	{
		"filename": "money-42", "rotated": false,"trimmed": true,
		"frame": {"x":236,"y":597,"w":22,"h":20},
		"spriteSourceSize": {"x":6,"y":6,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	{
		"filename": "money-43-16x16", "rotated": false,"trimmed": true,
		"frame": {"x":482,"y":755,"w":16,"h":10},
		"spriteSourceSize": {"x":0,"y":3,"w":16,"h":16},
		"sourceSize": {"w":16,"h":16}
	},
	{
		"filename": "money-43", "rotated": false,"trimmed": true,
		"frame": {"x":203,"y":597,"w":32,"h":20},
		"spriteSourceSize": {"x":0,"y":6,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	{
		"filename": "money-44-16x16", "rotated": false,"trimmed": true,
		"frame": {"x":527,"y":651,"w":16,"h":15},
		"spriteSourceSize": {"x":0,"y":1,"w":16,"h":16},
		"sourceSize": {"w":16,"h":16}
	},
	{
		"filename": "money-44", "rotated": false,"trimmed": true,
		"frame": {"x":295,"y":768,"w":32,"h":30},
		"spriteSourceSize": {"x":0,"y":2,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	{
		"filename": "money-45-16x16", "rotated": false,"trimmed": true,
		"frame": {"x":544,"y":464,"w":13,"h":12},
		"spriteSourceSize": {"x":1,"y":2,"w":16,"h":16},
		"sourceSize": {"w":16,"h":16}
	},
	{
		"filename": "money-45", "rotated": false,"trimmed": true,
		"frame": {"x":456,"y":623,"w":26,"h":24},
		"spriteSourceSize": {"x":2,"y":4,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	{
		"filename": "money-46-16x16", "rotated": false,"trimmed": true,
		"frame": {"x":410,"y":631,"w":16,"h":12},
		"spriteSourceSize": {"x":0,"y":2,"w":16,"h":16},
		"sourceSize": {"w":16,"h":16}
	},
	{
		"filename": "money-46", "rotated": false,"trimmed": true,
		"frame": {"x":295,"y":652,"w":32,"h":24},
		"spriteSourceSize": {"x":0,"y":4,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	{
		"filename": "money-47-16x16", "rotated": false,"trimmed": true,
		"frame": {"x":527,"y":451,"w":16,"h":16},
		"spriteSourceSize": {"x":0,"y":0,"w":16,"h":16},
		"sourceSize": {"w":16,"h":16}
	},
	{
		"filename": "money-47", "rotated": false,"trimmed": true,
		"frame": {"x":262,"y":735,"w":32,"h":32},
		"spriteSourceSize": {"x":0,"y":0,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	{
		"filename": "money-48-16x16", "rotated": false,"trimmed": true,
		"frame": {"x":427,"y":664,"w":13,"h":12},
		"spriteSourceSize": {"x":1,"y":2,"w":16,"h":16},
		"sourceSize": {"w":16,"h":16}
	},
	{
		"filename": "money-48", "rotated": false,"trimmed": true,
		"frame": {"x":454,"y":766,"w":26,"h":24},
		"spriteSourceSize": {"x":2,"y":4,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	{
		"filename": "money-49-16x16", "rotated": false,"trimmed": true,
		"frame": {"x":337,"y":583,"w":16,"h":12},
		"spriteSourceSize": {"x":0,"y":2,"w":16,"h":16},
		"sourceSize": {"w":16,"h":16}
	},
	{
		"filename": "money-49", "rotated": false,"trimmed": true,
		"frame": {"x":262,"y":652,"w":32,"h":24},
		"spriteSourceSize": {"x":0,"y":4,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	{
		"filename": "money-5-16x16", "rotated": false,"trimmed": true,
		"frame": {"x":527,"y":667,"w":16,"h":16},
		"spriteSourceSize": {"x":0,"y":0,"w":16,"h":16},
		"sourceSize": {"w":16,"h":16}
	},
	{
		"filename": "money-5", "rotated": false,"trimmed": true,
		"frame": {"x":353,"y":484,"w":32,"h":32},
		"spriteSourceSize": {"x":0,"y":0,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	{
		"filename": "money-50-16x16", "rotated": false,"trimmed": true,
		"frame": {"x":529,"y":747,"w":16,"h":16},
		"spriteSourceSize": {"x":0,"y":0,"w":16,"h":16},
		"sourceSize": {"w":16,"h":16}
	},
	{
		"filename": "money-50", "rotated": false,"trimmed": true,
		"frame": {"x":262,"y":768,"w":32,"h":32},
		"spriteSourceSize": {"x":0,"y":0,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	{
		"filename": "money-51-16x16", "rotated": false,"trimmed": true,
		"frame": {"x":544,"y":451,"w":13,"h":12},
		"spriteSourceSize": {"x":1,"y":2,"w":16,"h":16},
		"sourceSize": {"w":16,"h":16}
	},
	{
		"filename": "money-51", "rotated": false,"trimmed": true,
		"frame": {"x":470,"y":542,"w":26,"h":24},
		"spriteSourceSize": {"x":2,"y":4,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	{
		"filename": "money-52-16x16", "rotated": false,"trimmed": true,
		"frame": {"x":354,"y":583,"w":16,"h":12},
		"spriteSourceSize": {"x":0,"y":2,"w":16,"h":16},
		"sourceSize": {"w":16,"h":16}
	},
	{
		"filename": "money-52", "rotated": false,"trimmed": true,
		"frame": {"x":262,"y":710,"w":32,"h":24},
		"spriteSourceSize": {"x":0,"y":4,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	{
		"filename": "money-53-16x16", "rotated": false,"trimmed": true,
		"frame": {"x":529,"y":764,"w":16,"h":16},
		"spriteSourceSize": {"x":0,"y":0,"w":16,"h":16},
		"sourceSize": {"w":16,"h":16}
	},
	{
		"filename": "money-53", "rotated": false,"trimmed": true,
		"frame": {"x":262,"y":677,"w":32,"h":32},
		"spriteSourceSize": {"x":0,"y":0,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	{
		"filename": "money-54-16x16", "rotated": false,"trimmed": true,
		"frame": {"x":542,"y":781,"w":14,"h":15},
		"spriteSourceSize": {"x":1,"y":0,"w":16,"h":16},
		"sourceSize": {"w":16,"h":16}
	},
	{
		"filename": "money-54", "rotated": false,"trimmed": true,
		"frame": {"x":448,"y":511,"w":28,"h":30},
		"spriteSourceSize": {"x":2,"y":0,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	{
		"filename": "money-55-16x16", "rotated": false,"trimmed": true,
		"frame": {"x":337,"y":567,"w":14,"h":15},
		"spriteSourceSize": {"x":1,"y":0,"w":16,"h":16},
		"sourceSize": {"w":16,"h":16}
	},
	{
		"filename": "money-55", "rotated": false,"trimmed": true,
		"frame": {"x":454,"y":693,"w":28,"h":30},
		"spriteSourceSize": {"x":2,"y":0,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	{
		"filename": "money-6-16x16", "rotated": false,"trimmed": true,
		"frame": {"x":546,"y":697,"w":10,"h":15},
		"spriteSourceSize": {"x":3,"y":1,"w":16,"h":16},
		"sourceSize": {"w":16,"h":16}
	},
	{
		"filename": "money-6", "rotated": false,"trimmed": true,
		"frame": {"x":508,"y":755,"w":20,"h":30},
		"spriteSourceSize": {"x":6,"y":2,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	{
		"filename": "money-7-16x16", "rotated": false,"trimmed": true,
		"frame": {"x":521,"y":565,"w":16,"h":15},
		"spriteSourceSize": {"x":0,"y":1,"w":16,"h":16},
		"sourceSize": {"w":16,"h":16}
	},
	{
		"filename": "money-7", "rotated": false,"trimmed": true,
		"frame": {"x":361,"y":652,"w":32,"h":30},
		"spriteSourceSize": {"x":0,"y":2,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	{
		"filename": "money-8-16x16", "rotated": false,"trimmed": true,
		"frame": {"x":456,"y":648,"w":16,"h":15},
		"spriteSourceSize": {"x":0,"y":1,"w":16,"h":16},
		"sourceSize": {"w":16,"h":16}
	},
	{
		"filename": "money-8", "rotated": false,"trimmed": true,
		"frame": {"x":361,"y":712,"w":32,"h":30},
		"spriteSourceSize": {"x":0,"y":2,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	{
		"filename": "money-9-16x16", "rotated": false,"trimmed": true,
		"frame": {"x":497,"y":605,"w":12,"h":12},
		"spriteSourceSize": {"x":2,"y":2,"w":16,"h":16},
		"sourceSize": {"w":16,"h":16}
	},
	{
		"filename": "money-9", "rotated": false,"trimmed": true,
		"frame": {"x":502,"y":515,"w":24,"h":24},
		"spriteSourceSize": {"x":4,"y":4,"w":32,"h":32},
		"sourceSize": {"w":32,"h":32}
	},
	{
		"filename": "progress-end", "rotated": false,"trimmed": true,
		"frame": {"x":436,"y":563,"w":3,"h":15},
		"spriteSourceSize": {"x":0,"y":0,"w":3,"h":15},
		"sourceSize": {"w":3,"h":15}
	},
	{
		"filename": "progress-init", "rotated": false,"trimmed": true,
		"frame": {"x":370,"y":627,"w":3,"h":15},
		"spriteSourceSize": {"x":0,"y":0,"w":3,"h":15},
		"sourceSize": {"w":3,"h":15}
	},
	{
		"filename": "whip-01", "rotated": false,"trimmed": true,
		"frame": {"x":425,"y":786,"w":19,"h":14},
		"spriteSourceSize": {"x":0,"y":0,"w":19,"h":14},
		"sourceSize": {"w":19,"h":14}
	},
	{
		"filename": "whip-02", "rotated": false,"trimmed": true,
		"frame": {"x":497,"y":565,"w":23,"h":39},
		"spriteSourceSize": {"x":0,"y":0,"w":23,"h":39},
		"sourceSize": {"w":23,"h":39}
	},
	{
		"filename": "whip-03", "rotated": false,"trimmed": true,
		"frame": {"x":483,"y":685,"w":24,"h":36},
		"spriteSourceSize": {"x":0,"y":0,"w":24,"h":36},
		"sourceSize": {"w":24,"h":36}
	},
	{
		"filename": "whip-04", "rotated": false,"trimmed": true,
		"frame": {"x":510,"y":624,"w":20,"h":26},
		"spriteSourceSize": {"x":0,"y":0,"w":20,"h":26},
		"sourceSize": {"w":20,"h":26}
	},
	{
		"filename": "whip-05", "rotated": false,"trimmed": true,
		"frame": {"x":454,"y":724,"w":27,"h":41},
		"spriteSourceSize": {"x":0,"y":0,"w":27,"h":41},
		"sourceSize": {"w":27,"h":41}
	}
]
,"meta":{"size": {"w":801,"h":801}}
}
    });
});