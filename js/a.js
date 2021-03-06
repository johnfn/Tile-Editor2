(function() {
  var ObjList, batchLoad, canv, click, draw, fileHandle, getTileInfo, grid, init, initMouseHandlers, loadSpriteSheets, mainloop, mousemove, nothing, switchPress, textChangeListener, tilebox, toolbox, unclick;
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
    toolbox = new Toolbox(300 + 10, 0, canv);
    grid = new Grid(0, 0, canv, tilebox, toolbox);
    initMouseHandlers();
    setInterval(mainloop, 5);
    document.getElementById("switch").addEventListener("click", switchPress);
    return document.getElementById("getfile").addEventListener("change", fileHandle);
  };
  initMouseHandlers = function() {
    document.body.onmousedown = function() {
      return globals.mouseDown++;
    };
    document.body.onmouseup = function() {
      globals.mouseDown--;
      return unclick();
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
  unclick = function() {
    var clickobj, _i, _len, _ref, _results;
    _ref = globals.lists.getAll(types.clickable);
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      clickobj = _ref[_i];
      _results.push(util.rectIntersectPt(clickobj, mouse) ? clickobj.unclick() : void 0);
    }
    return _results;
  };
  textChangeListener = function() {
    return console.log("changed");
  };
  window.textChangeListener = textChangeListener;
  fileHandle = function() {};
  window.fileHandle = fileHandle;
  switchPress = function() {
    return grid.switchMode();
  };
  nothing = function() {};
  batchLoad = function(sheet, list) {
    var first, nextCall;
    if (list.length === 0) {
      return;
    }
    first = list.shift();
    nextCall = function() {
      return batchLoad(sheet, list);
    };
    return sheet.loadImage(first, nextCall);
  };
  loadSpriteSheets = function() {
    var x;
    globals.mainSheet = new SpriteSheet;
    globals.mainSheet.loadImage("dungeon.png", init);
    globals.toolsSheet = new SpriteSheet;
    return batchLoad(globals.toolsSheet, (function() {
      var _i, _len, _ref, _results;
      _ref = globals.tools;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        x = _ref[_i];
        _results.push(x[0]);
      }
      return _results;
    })());
  };
  loadSpriteSheets();
  getTileInfo = function() {
    return grid.tiles;
  };
  window.getTileInfo = getTileInfo;
}).call(this);
