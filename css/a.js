(function() {
  var ObjList, batchLoad, canv, click, draw, grid, init, initMouseHandlers, loadSpriteSheets, mainloop, mousemove, nothing, switchPress, tilebox, toolbox;
  canv = 0;
  tilebox = 0;
  toolbox = 0;
  grid = 0;
  ObjList = (function() {
    ObjList.all = {};
    function ObjList() {}
    ObjList.prototype.add = function(obj, types) {
      var type, _i, _len, _results;
      if (!(types instanceof Array)) {
        types = [types];
      }
      _results = [];
      for (_i = 0, _len = types.length; _i < _len; _i++) {
        type = types[_i];
        _results.push(ObjList.all[type] != null ? ObjList.all[type].push(obj) : ObjList.all[type] = [obj]);
      }
      return _results;
    };
    ObjList.prototype.getAll = function(type) {
      if (ObjList.all[type] != null) {
        return ObjList.all[type];
      } else {
        return [];
      }
    };
    return ObjList;
  })();
  globals.lists = new ObjList();
  init = function() {
    canv = document.getElementById("main").getContext("2d");
    tilebox = new Tilebox(10, 300, canv);
    grid = new Grid(0, 0, canv, tilebox);
    toolbox = new Toolbox(grid.width + 10, 0, canv);
    initMouseHandlers();
    setInterval(mainloop, 5);
    return document.getElementById("switch").addEventListener("click", switchPress);
  };
  initMouseHandlers = function() {
    document.body.onmousedown = function() {
      return globals.mouseDown++;
    };
    document.body.onmouseup = function() {
      return globals.mouseDown--;
    };
    return document.body.onmousemove = function(e) {
      mouse.x = e.clientX + document.body.scrollLeft - 8;
      mouse.y = e.clientY + document.body.scrollTop - 8;
      return mousemove();
    };
  };
  mainloop = function() {
    if (globals.mouseDown) {
      click();
    }
    return draw();
  };
  draw = function() {
    canv.clearRect(0, 0, 1000, 1000);
    grid.draw();
    tilebox.draw();
    return toolbox.draw();
  };
  mousemove = function() {
    var moveobj, _i, _len, _ref, _results;
    _ref = globals.lists.getAll(types.mouseable);
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      moveobj = _ref[_i];
      _results.push(util.rectIntersectPt(moveobj, mouse) ? moveobj.mousemove() : moveobj.mouseout());
    }
    return _results;
  };
  click = function() {
    var clickobj, _i, _len, _ref, _results;
    _ref = globals.lists.getAll(types.clickable);
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      clickobj = _ref[_i];
      _results.push(util.rectIntersectPt(clickobj, mouse) ? clickobj.click(mouse.x, mouse.y) : void 0);
    }
    return _results;
  };
  switchPress = function() {
    return grid.switchMode();
  };
  nothing = function() {};
  batchLoad = function(sheet, list) {
    var first, nextCall;
    if (list.length === 0) {
      return;
    }
    first = list.pop(0);
    nextCall = function() {
      return batchLoad(sheet, list);
    };
    return sheet.loadImage(first, nextCall);
  };
  loadSpriteSheets = function() {
    globals.mainSheet = new SpriteSheet;
    globals.mainSheet.loadImage("dungeon.png", init);
    globals.toolsSheet = new SpriteSheet;
    return globals.toolsSheet.loadImage("icons/pencil.png", nothing);
  };
  loadSpriteSheets();
}).call(this);
