ig.module( 'scene.run.lvl.a04' )
.requires( 'impact.image','scene.run.ent.bat-01' )
.defines(function(){
ig.LevelA04=/*JSON[*/{
	"entities": [
		{
			"type": "EntityBat01",
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
ig.LevelA04Resources=[new ig.Image('med/bkg/tiles.png')];
});