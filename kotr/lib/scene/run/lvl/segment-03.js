ig.module( 'scene.run.lvl.segment-03' )
.requires( 'impact.image','scene.run.ent.skeleton-02' )
.defines(function(){
ig.LevelSegment03=/*JSON[*/{
	"entities": [
		{
			"type": "EntitySkeleton02",
			"x": 148,
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
				[13,13,13,13,13,13,13,13,13,13],
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
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[1,1,0,0,0,0,1,1,1,1],
				[0,0,0,0,0,0,0,0,0,0]
			]
		}
	]
}/*]JSON*/;
ig.LevelSegment03Resources=[new ig.Image('med/bkg/tiles.png')];
});