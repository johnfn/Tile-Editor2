canv = 0
tilebox = 0
toolbox = 0
grid = 0


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

init = () ->
	canv = document.getElementById("main").getContext "2d"
	tilebox = new Tilebox 10, 300, canv
	toolbox = new Toolbox 300 + 10, 0, canv #TODO 200... constant rawr... but toolbox/grid have nested dependencies
	grid = new Grid 0, 0, canv, tilebox, toolbox

	initMouseHandlers()

	setInterval mainloop, 5

	document.getElementById("switch").addEventListener "click", switchPress

initMouseHandlers = () ->

	document.body.onmousedown = () ->
		globals.mouseDown++

	document.body.onmouseup = ()   ->
		globals.mouseDown--
		unclick()

	document.body.onmousemove = (e) ->
		mouse.x = e.clientX + document.body.scrollLeft - 8
		mouse.y = e.clientY + document.body.scrollTop - 8
		mousemove()


mainloop = () ->
	click() if globals.mouseDown
	draw()

draw = () ->
	canv.clearRect(0, 0, 1000, 1000)
		
	grid.draw()
	tilebox.draw()
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

unclick = () ->
	for clickobj in globals.lists.getAll types.clickable
		if util.rectIntersectPt clickobj, mouse
			clickobj.unclick()

switchPress = () ->
	grid.switchMode()

nothing = () ->


batchLoad = (sheet, list) -> #This is made a little more tricky because loadImage is a function with a callback.
							 #Note to self: A better way might just be to load them all concurrently and 
							 #update a global and then when its max'd you call init.
							 #But then you might have race conditions so whatever.

	return if list.length == 0

	first = list.shift()

	nextCall = () -> batchLoad sheet, list
	
	sheet.loadImage(first, nextCall)



loadSpriteSheets = () ->
	globals.mainSheet = new SpriteSheet
	globals.mainSheet.loadImage("dungeon.png",init)

	globals.toolsSheet = new SpriteSheet
	batchLoad(globals.toolsSheet, (x[0] for x in globals.tools))


loadSpriteSheets()

