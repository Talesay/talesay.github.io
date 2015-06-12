ig.module( 'scene.run.lvl.segment-04' )
.requires( 'impact.image' )
.defines(function(){
ig.LevelSegment04=/*JSON[*/{
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
				[13,13,22,22,22,22,13,13,13,13],
				[0,0,0,0,0,0,0,0,0,0],
				[13,13,13,13,13,13,13,13,13,13],
				[25,28,0,0,0,0,25,26,26,27],
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
				[0,0,1,1,1,1,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[1,1,0,0,0,0,1,1,1,1],
				[0,0,0,0,0,0,0,0,0,0]
			]
		}
	]
}/*]JSON*/;
ig.LevelSegment04Resources=[new ig.Image('med/bkg/tiles.png')];
});