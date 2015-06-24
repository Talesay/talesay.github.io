ig.module( 'scene.run.lvl.end' )
.requires( 'impact.image' )
.defines(function(){
ig.LevelEnd=/*JSON[*/{
	"entities": [],
	"layer": [
		{
			"name": "foreground",
			"width": 8,
			"height": 4,
			"linkWithCollision": false,
			"visible": 1,
			"tilesetName": "med/bkg/tiles.png",
			"repeat": false,
			"preRender": true,
			"distance": "1",
			"tilesize": 16,
			"foreground": false,
			"data": [
				[0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0],
				[25,26,26,26,26,26,26,26]
			]
		},
		{
			"name": "collision",
			"width": 8,
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
				[0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0],
				[1,1,1,1,1,1,1,1]
			]
		}
	],
	"properties": {
		
	}
}/*]JSON*/;
ig.LevelEndResources=[new ig.Image('med/bkg/tiles.png')];
});