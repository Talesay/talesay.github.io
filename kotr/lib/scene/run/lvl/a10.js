ig.module( 'scene.run.lvl.a10' )
.requires( 'impact.image','scene.run.ent.lizard-03' )
.defines(function(){
ig.LevelA10=/*JSON[*/{
	"entities": [
		{
			"type": "EntityLizard03",
			"x": 66,
			"y": 21
		}
	],
	"layer": [
		{
			"name": "foreground",
			"width": 9,
			"height": 4,
			"linkWithCollision": false,
			"visible": 1,
			"tilesetName": "med/bkg/tiles.png",
			"repeat": false,
			"preRender": false,
			"distance": "1",
			"tilesize": 16,
			"foreground": false,
			"data": [
				[13,13,13,13,13,13,13,13,13],
				[0,0,0,0,0,0,0,0,0],
				[13,13,13,13,38,13,13,13,13],
				[27,27,27,27,27,27,27,27,22]
			]
		},
		{
			"name": "collision",
			"width": 9,
			"height": 4,
			"linkWithCollision": false,
			"visible": 1,
			"tilesetName": "",
			"repeat": false,
			"preRender": false,
			"distance": 1,
			"tilesize": 16,
			"foreground": false,
			"data": [
				[0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0],
				[1,1,1,1,1,1,1,1,1]
			]
		}
	],
	"properties": {
		"used": 0
	}
}/*]JSON*/;
ig.LevelA10Resources=[new ig.Image('med/bkg/tiles.png')];
});