#Generic window

class SelWindow
	constructor: (x, y, itemsWide, items, canvas, spritesheet) ->
		@spritesheet = spritesheet
		@canvas = canvas
		@x = x
		@y = y
		@border = globals.windowBorder
		@items = 50
		@width = itemsWide * (globals.tileWidth + @border)
		@height = Math.ceil(items / itemsWide) * (globals.tileWidth + @border)
		@selection = 0

		@itemsWide = @width / globals.tileWidth

		globals.lists.add this, types.clickable

		@buttons = []

		for i in [0...@items]
			obj        = {}
			obj.x      = @x +            i % itemsWide  * (globals.tileWidth + @border) + @border
			obj.y      = @y + Math.floor(i / itemsWide) * (globals.tileWidth + @border)
			obj.width  =	          				       globals.tileWidth
			obj.height =           	    	 		       globals.tileWidth
			obj.index  = i
			@buttons.push obj

	click: () ->
		for button in @buttons
			if util.rectIntersectPt button, mouse
				@selection = button.index

	unclick: () ->

	draw: () ->
		@items = @spritesheet.numItems
		#@canvas.strokeWidth = 0
		@canvas.strokeRect @x, @y, @width + @border, @height

		@drawItem i for i in [0...@items]

	getSelection: () -> @selection

	drawItem: (which) ->
		drawTile(@buttons[which].x, @buttons[which].y, @buttons[which].index, @canvas, @spritesheet)

		if this.getSelection() == which
			@canvas.strokeRect @buttons[which].x, @buttons[which].y, @buttons[which].width, @buttons[which].height

window.SelWindow = SelWindow
