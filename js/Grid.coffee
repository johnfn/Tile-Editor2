class Grid
	constructor: (x, y, canvas, tilebox, toolbox) ->
		@canvas = canvas
		@x = x
		@y = y
		@itemwidth = 15
		@itemheight = 15
		@width = @itemwidth * globals.tileWidth
		@height = @itemheight * globals.tileWidth
		@overworld = false
		@tilebox = tilebox
		@toolbox = toolbox
		@start = new Point(0, 0)
		@dragging = false

		globals.lists.add this, types.clickable
		globals.lists.add this, types.mouseable

		@tiles = []

		for i in [0...@itemwidth]
			@tiles.push []
			for j in [0...@itemwidth]
				obj = {}
				obj.x = @x + i * (globals.tileWidth + @borderBetweenItems)
				obj.y = @y + 0 * (globals.tileWidth + @borderBetweenItems)
				obj.width =	      globals.tileWidth
				obj.height =      globals.tileWidth
				obj.type   = 0
				@tiles[i].push obj

	getGridXY: () ->
		new Point(Math.floor(mouse.x / globals.tileWidth), Math.floor(mouse.y / globals.tileWidth))


	click: (x, y) ->
		#Get the x/y position
		pos = this.getGridXY()

		if globals.tools[@toolbox.getSelection()][globals.toolsItem] == "box"
			return if @dragging
			@dragging = true
			@start = new Point(pos.x, pos.y)
		else
			@tiles[pos.x][pos.y].type = @tilebox.getSelection()
	
	draw: (x, y) ->
		#draw tiles

		for i in [0...@itemwidth]
			for j in [0...@itemwidth]
				if @overworld
					drawTile(i, j, @tiles[i][j].type, @canvas, globals.mainSheet, @overworld)
				else
					drawTile(i * globals.tileWidth, j * globals.tileWidth, @tiles[i][j].type, @canvas, globals.mainSheet, @overworld)


		@canvas.strokeRect @x,@y,@width,@height
		if @mouseover
			if @dragging
				pos = this.getGridXY()
				pos.x *= globals.tileWidth
				pos.y *= globals.tileWidth
				topleft = new Point(Math.min(pos.x, globals.tileWidth * @start.x), Math.min(pos.y, globals.tileWidth * @start.y))
				@canvas.strokeRect topleft.x,
								   topleft.y,
								   Math.abs(pos.x - globals.tileWidth * @start.x),
								   Math.abs(pos.y - globals.tileWidth * @start.y)
			else
				@canvas.strokeRect globals.tileWidth * Math.floor(mouse.x / globals.tileWidth),
								   globals.tileWidth * Math.floor(mouse.y / globals.tileWidth),
								   globals.tileWidth,
								   globals.tileWidth
	

	unclick: (x, y) ->
		if globals.tools[@toolbox.getSelection()][globals.toolsItem] == "box"
			pos = this.getGridXY()
			for i in [@start.x..pos.x]
				for j in [@start.y..pos.y]
					@tiles[i][j].type = @tilebox.getSelection()
		@dragging = false
				

	switchMode: () ->
		@overworld = !@overworld

	mousemove: () ->
		@mouseover = true
	
	mouseout: () ->
		@mouseover = false
	

window.Grid = Grid
