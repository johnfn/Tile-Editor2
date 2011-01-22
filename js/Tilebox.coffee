class Tilebox extends SelWindow
	constructor: (x, y, canvas) ->
		super x, y, 10, 2, canvas, globals.mainSheet #TODO: SpriteSheetName.size or something, not 2

	click: (x, y) ->
		super x, y

	draw: () ->
		super()
	
	getSelection: () -> super()

	unclick: () -> super()

window.Tilebox = Tilebox
