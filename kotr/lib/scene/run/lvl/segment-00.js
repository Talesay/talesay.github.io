ig.module( 'scene.run.lvl.segment-00' )
.requires( 'impact.image','scene.run.ent.skeleton-02' )
.defines(function(){
ig.LevelSegment00=/*JSON[*/{
	"entities": [
		{
			"type": "EntitySkeleton02",
			"x": 121,
			"y": 38
		}
	],
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
				[13,13,13,13,13,21,13,13,13,13],
				[0,0,0,21,0,0,0,0,0,0],
				[13,21,13,13,13,13,13,13,13,13],
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
				[0,0,0,0,0,1,0,0,0,0],
				[0,0,0,1,0,0,0,0,0,0],
				[0,1,0,0,0,0,0,0,0,0],
				[1,1,1,1,1,1,1,1,1,1],
				[0,0,0,0,0,0,0,0,0,0]
			]
		}
	]
}/*]JSON*/;
ig.LevelSegment00Resources=[new ig.Image('med/bkg/tiles.png')];
});