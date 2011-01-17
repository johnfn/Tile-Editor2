canv = 0
toolbox = 0
grid = 0

class Point
	constructor: (x, y) ->
		@x = x
		@y = y

util =
	rectIntersectPt : (rect, pt) ->
		pt.x >= rect.x and pt.x <= rect.x + rect.width and
		pt.y >= rect.y and pt.y <= rect.y + rect.height


	# could optimize this by storing points on objects
	intersect : (obj1, obj2) ->
		util.rectIntersectPt(obj1, new Point(obj2.x              , obj2.y              )) or
		util.rectIntersectPt(obj1, new Point(obj2.x + obj2.width , obj2.y              )) or
		util.rectIntersectPt(obj1, new Point(obj2.x              , obj2.y + obj2.height)) or
		util.rectIntersectPt(obj1, new Point(obj2.x + obj2.width , obj2.y + obj2.height))
	
types =
	clickable : "CLICK"
	drawable  : "DRAW"
	mouseable : "MOUSE"


mouse =
	x : 0
	y : 0


globals =
	tileWidth : 16
	mouseDown : 0 #How many mouse buttons are pressed
	lists : 0


drawTile = (x, y, type, canvas) ->
	canvas.drawImage(SpriteSheet.tiles[type], x, y)
###
	if type == 0
		canvas.fillStyle = "#FF0000"
	if type == 1
		canvas.fillStyle = "#00FF00"

	canvas.fillRect x,
					 y,
					 globals.tileWidth,
					 globals.tileWidth
###


class SpriteSheet
	@cache = {}
	@seenBefore = {}
	@tiles = []

	loadImage: (file, callback) ->
		img = new Image()
		img.src = "dungeon.png"
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
					SpriteSheet.tiles.push(buff)

			callback()
			


class ObjList
	@all = {}

	constructor: () ->

	add: (obj, types) ->
		if types not instanceof Array
			types = [types]

		for type in types
			if ObjList.all[type]?
				ObjList.all[type].push obj
			else
				ObjList.all[type] = [obj]

	getAll: (type) ->
		if ObjList.all[type]?
			ObjList.all[type]
		else
			[]

globals.lists = new ObjList()

class Tilebox
	constructor: (x, y, canvas) ->
		@canvas = canvas
		@x = x
		@y = y
		@width = 200
		@height = 40
		@items = 2
		@borderBetweenItems = 5
		@selection = 0

		@itemsWide = @width / globals.tileWidth

		globals.lists.add this, types.clickable

		@buttons = []

		for i in [0..@items]
			obj        = {}
			obj.x      = @x + i * (globals.tileWidth + @borderBetweenItems)
			obj.y      = @y + 0 * (globals.tileWidth + @borderBetweenItems)
			obj.width  =	      globals.tileWidth
			obj.height =          globals.tileWidth
			obj.index  = i
			@buttons.push obj

	click: (x, y) ->
		for button in @buttons
			if util.rectIntersectPt button, mouse
				@selection = button.index

	draw: () ->
		@canvas.strokeRect @x, @y, @width, @height

		@drawItem i for i in [0...@items]


	getSelection: () -> @selection

	drawItem: (which) ->
		drawTile(@buttons[which].x, @buttons[which].y, @buttons[which].index, @canvas)

		@canvas.strokeRect @buttons[which].x, @buttons[which].y, @buttons[which].width, @buttons[which].height

class Grid
	constructor: (x, y, canvas, toolbox) ->
		@canvas = canvas
		@x = x
		@y = y
		@itemwidth = 10
		@itemheight = 10
		@width = @itemwidth * globals.tileWidth
		@height = @itemheight * globals.tileWidth

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

	click: (x, y) ->
		#Get the x/y position
		posx = Math.floor(mouse.x / globals.tileWidth)
		posy = Math.floor(mouse.y / globals.tileWidth)
		@tiles[posx][posy].type = toolbox.getSelection()
		console.log toolbox.getSelection()
	
	draw: (x, y) ->
		#draw tiles

		for i in [0...@itemwidth]
				for j in [0...@itemwidth]
					drawTile(i * globals.tileWidth, j * globals.tileWidth, @tiles[i][j].type, @canvas)

		@canvas.strokeRect @x,@y,@width,@height
		if @mouseover
			@canvas.strokeRect globals.tileWidth * Math.floor(mouse.x / globals.tileWidth),
							   globals.tileWidth * Math.floor(mouse.y / globals.tileWidth),
							   globals.tileWidth,
							   globals.tileWidth
	



	mousemove: () ->
		@mouseover = true
	
	mouseout: () ->
		@mouseover = false

init = () ->
	canv = document.getElementById("main").getContext "2d"
	toolbox = new Tilebox 10, 300, canv
	grid = new Grid 0, 0, canv, toolbox

	initMouseHandlers()

	setInterval mainloop, 5

initMouseHandlers = () ->

	document.body.onmousedown = () ->
		globals.mouseDown++

	document.body.onmouseup = ()   ->
		globals.mouseDown--

	document.body.onmousemove = (e) ->
		mouse.x = e.clientX + document.body.scrollLeft - 8
		mouse.y = e.clientY + document.body.scrollTop - 8
		mousemove()


mainloop = () ->
	if globals.mouseDown
		click()
	draw()

draw = () ->
	canv.clearRect(0, 0, 1000, 1000)
		
	grid.draw()
	toolbox.draw()

mousemove = () ->
	for moveobj in globals.lists.getAll types.mouseable
		if util.rectIntersectPt moveobj, mouse
			moveobj.mousemove()
		else
			moveobj.mouseout()

click = () ->
	for clickobj in globals.lists.getAll types.clickable
		if util.rectIntersectPt clickobj, mouse
			clickobj.click(mouse.x, mouse.y)


s = new SpriteSheet
s.loadImage("f",init)
#setTimeout init, 5

