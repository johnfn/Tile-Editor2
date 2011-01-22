class Toolbox extends SelWindow
	constructor: (x, y, canvas) ->
		super x, y, 1, 2, canvas, globals.toolsSheet

	click: (x, y) ->
		super x, y

	draw: () ->
		super()

	getSelection: () -> super()

	unclick: () -> super()

window.Toolbox = Toolbox
