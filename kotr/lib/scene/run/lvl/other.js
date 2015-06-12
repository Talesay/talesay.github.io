ig.module( 'scene.run.lvl.other' )
.requires( 'impact.image' )
.defines(function(){
ig.LevelOther=/*JSON[*/{
	"entities": [],
	"layer": [
		{
			"name": "foreground",
			"width": 10,
			"height": 5,
			"linkWithCollision": false,
			"visible": 1,
			"tilesetName": "med/bkg/tiles.png",
			"repeat": false,
			"preRender": false,
			"distance": "1",
			"tilesize": 16,
			"foreground": false,
			"data": [
				[13,13,13,13,13,13,13,13,13,13],
				[0,0,0,0,0,0,0,21,0,0],
				[13,13,13,13,13,21,13,13,13,13],
				[25,26,26,26,26,26,26,26,26,27],
				[0,0,0,0,0,0,0,0,0,0]
			]
		},
		{
			"name": "collision",
			"width": 10,
			"height": 5,
			"linkWithCollision": false,
			"visible": 1,
			"tilesetName": "",
			"repeat": false,
			"preRender": false,
			"distance": 1,
			"tilesize": 16,
			"foreground": false,
			"data": [
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,1,0,0],
				[0,0,0,0,0,1,0,0,0,0],
				[1,1,1,1,1,1,1,1,1,1],
				[0,0,0,0,0,0,0,0,0,0]
			]
		}
	]
}/*]JSON*/;
ig.LevelOtherResources=[new ig.Image('med/bkg/tiles.png')];
});