ig.module( 'scene.run.lvl.segment-06' )
.requires( 'impact.image','scene.run.ent.skeleton-01' )
.defines(function(){
ig.LevelSegment06=/*JSON[*/{
	"entities": [
		{
			"type": "EntitySkeleton01",
			"x": 64,
			"y": 38
		},
		{
			"type": "EntitySkeleton01",
			"x": 104,
			"y": 38
		},
		{
			"type": "EntitySkeleton01",
			"x": 31,
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
				[13,13,13,13,38,13,13,13,13,13],
				[27,27,27,27,27,27,27,27,27,27],
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
				[1,1,1,1,1,1,1,1,1,1],
				[0,0,0,0,0,0,0,0,0,0]
			]
		}
	]
}/*]JSON*/;
ig.LevelSegment06Resources=[new ig.Image('med/bkg/tiles.png')];
});