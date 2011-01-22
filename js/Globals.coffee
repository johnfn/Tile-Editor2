globals =
	windowBorder : 2
	tileWidth    : 16
	mouseDown    : 0 #How many mouse buttons are pressed
	lists        : 0
	mainSheet    : 0
	toolsSheet   : 0
	tools        : [["icons/pencil.png", "pencil"],["icons/pencil_add.png", "box"]]
	toolsItem    : 1

window.globals = globals

types =
	clickable : "CLICK"
	drawable  : "DRAW"
	mouseable : "MOUSE"

window.types = types

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

window.util = util

mouse =
	x : 0
	y : 0

window.mouse = mouse

#TODO: add to util
drawTile = (x, y, type, canvas, sheet, overworld) ->
	if @overworld
		globals.tileWidth = 1
	if !@overworld
		canvas.drawImage(sheet.tiles[type], x, y)
		#canvas.drawImage(globals.mainSheet.tiles[type], x, y)
		#canvas.drawImage(globals.toolsSheet.tiles[type], x, y) #TODO

	if @overworld
		globals.tileWidth = 16
	if @overworld
		if type == 0
			canvas.fillStyle = "#FF0000"
		if type == 1
			canvas.fillStyle = "#00FF00"

		canvas.fillRect x,
					 	y,
					 	globals.tileWidth,
					 	globals.tileWidth

window.drawTile = drawTile
