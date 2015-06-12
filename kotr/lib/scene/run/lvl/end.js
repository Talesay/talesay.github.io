ig.module( 'scene.run.lvl.end' )
.requires( 'impact.image' )
.defines(function(){
ig.LevelEnd=/*JSON[*/{
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
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[25,26,26,26,26,26,26,26,26,26],
				[35,35,35,35,35,35,35,35,35,35]
			]
		},
		{
			"name": "collision",
			"width": 10,
			"height": 5,
			"linkWithCollision": false,
			"visible": true,
			"tilesetName": "",
			"repeat": false,
			"preRender": false,
			"distance": 1,
			"tilesize": 16,
			"foreground": false,
			"data": [
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[1,1,1,1,1,1,1,1,1,1],
				[0,0,0,0,0,0,0,0,0,0]
			]
		}
	]
}/*]JSON*/;
ig.LevelEndResources=[new ig.Image('med/bkg/tiles.png')];
});