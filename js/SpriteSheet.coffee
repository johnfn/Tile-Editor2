class SpriteSheet
	constructor: () ->
		@cache = {}
		@seenBefore = {}
		@tiles = []
		@numItems = 0

	loadImage: (file, callback) ->
		img = new Image()
		img.src = file
		thisObj = this
		img.onload = () ->
			for i in [0...img.naturalWidth/globals.tileWidth]
				for j in [0...img.naturalHeight/globals.tileWidth]
					buff = document.createElement('canvas')
					buff.width = globals.tileWidth
					buff.height = globals.tileWidth
					buff.getContext('2d').drawImage img,
													i * globals.tileWidth,
													j * globals.tileWidth,
													globals.tileWidth,
													globals.tileWidth,
													0,
													0,
													globals.tileWidth,
													globals.tileWidth
					thisObj.tiles.push(buff)
					thisObj.numItems++

			callback()
			
	len: () -> @numItems

window.SpriteSheet = SpriteSheet
