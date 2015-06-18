ig.module( 'scene.run.lvl.segment-01' )
.requires( 'impact.image','scene.run.ent.skeleton-04' )
.defines(function(){
ig.LevelSegment01=/*JSON[*/{
	"entities": [
		{
			"type": "EntitySkeleton04",
			"x": 57,
			"y": 38
		},
		{
			"type": "EntitySkeleton04",
			"x": 108,
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
				[25,28,0,25,28,0,25,28,0,25],
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
				[1,1,0,1,1,0,1,1,0,1],
				[0,0,0,0,0,0,0,0,0,0]
			]
		}
	]
}/*]JSON*/;
ig.LevelSegment01Resources=[new ig.Image('med/bkg/tiles.png')];
});