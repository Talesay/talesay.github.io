ig.module( 'scene.run.lvl.start' )
.requires( 'impact.image','scene.run.ent.player' )
.defines(function(){
ig.LevelStart=/*JSON[*/{
	"entities": [
		{
			"type": "EntityPlayer",
			"x": 32,
			"y": 34
		}
	],
	"layer": [
		{
			"name": "foreground",
			"width": 8,
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
				[0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0],
				[25,26,26,26,26,26,26,26]
			]
		},
		{
			"name": "collision",
			"width": 8,
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
				[0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0],
				[1,1,1,1,1,1,1,1],
				[0,0,0,0,0,0,0,0]
			]
		}
	],
	"properties": {
		
	}
}/*]JSON*/;
ig.LevelStartResources=[new ig.Image('med/bkg/tiles.png')];
});