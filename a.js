(function() {
  var Grid, ObjList, Point, SpriteSheet, Tilebox, canv, click, draw, drawTile, globals, grid, init, initMouseHandlers, mainloop, mouse, mousemove, s, toolbox, types, util;
  canv = 0;
  toolbox = 0;
  grid = 0;
  Point = (function() {
    function Point(x, y) {
      this.x = x;
      this.y = y;
    }
    return Point;
  })();
  util = {
    rectIntersectPt: function(rect, pt) {
      return pt.x >= rect.x && pt.x <= rect.x + rect.width && pt.y >= rect.y && pt.y <= rect.y + rect.height;
    },
    intersect: function(obj1, obj2) {
      return util.rectIntersectPt(obj1, new Point(obj2.x, obj2.y)) || util.rectIntersectPt(obj1, new Point(obj2.x + obj2.width, obj2.y)) || util.rectIntersectPt(obj1, new Point(obj2.x, obj2.y + obj2.height)) || util.rectIntersectPt(obj1, new Point(obj2.x + obj2.width, obj2.y + obj2.height));
    }
  };
  types = {
    clickable: "CLICK",
    drawable: "DRAW",
    mouseable: "MOUSE"
  };
  mouse = {
    x: 0,
    y: 0
  };
  globals = {
    tileWidth: 16,
    mouseDown: 0,
    lists: 0
  };
  drawTile = function(x, y, type, canvas) {
    return canvas.drawImage(SpriteSheet.tiles[type], x, y);
  };
  /*
  	if type == 0
  		canvas.fillStyle = "#FF0000"
  	if type == 1
  		canvas.fillStyle = "#00FF00"

  	canvas.fillRect x,
  					 y,
  					 globals.tileWidth,
  					 globals.tileWidth
  */
  SpriteSheet = (function() {
    function SpriteSheet() {}
    SpriteSheet.cache = {};
    SpriteSheet.seenBefore = {};
    SpriteSheet.tiles = [];
    SpriteSheet.prototype.loadImage = function(file, callback) {
      var img;
      img = new Image();
      img.src = "dungeon.png";
      return img.onload = function() {
        var buff, i, j, _ref, _ref2;
        for (i = 0, _ref = img.naturalWidth / globals.tileWidth; (0 <= _ref ? i < _ref : i > _ref); (0 <= _ref ? i += 1 : i -= 1)) {
          for (j = 0, _ref2 = img.naturalHeight / globals.tileWidth; (0 <= _ref2 ? j < _ref2 : j > _ref2); (0 <= _ref2 ? j += 1 : j -= 1)) {
            buff = document.createElement('canvas');
            buff.width = globals.tileWidth;
            buff.height = globals.tileWidth;
            buff.getContext('2d').drawImage(img, i * globals.tileWidth, j * globals.tileWidth, globals.tileWidth, globals.tileWidth, 0, 0, globals.tileWidth, globals.tileWidth);
            SpriteSheet.tiles.push(buff);
          }
        }
        return callback();
      };
    };
    return SpriteSheet;
  })();
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
  Tilebox = (function() {
    function Tilebox(x, y, canvas) {
      var i, obj, _ref;
      this.canvas = canvas;
      this.x = x;
      this.y = y;
      this.width = 200;
      this.height = 40;
      this.items = 2;
      this.borderBetweenItems = 5;
      this.selection = 0;
      this.itemsWide = this.width / globals.tileWidth;
      globals.lists.add(this, types.clickable);
      this.buttons = [];
      for (i = 0, _ref = this.items; (0 <= _ref ? i <= _ref : i >= _ref); (0 <= _ref ? i += 1 : i -= 1)) {
        obj = {};
        obj.x = this.x + i * (globals.tileWidth + this.borderBetweenItems);
        obj.y = this.y + 0 * (globals.tileWidth + this.borderBetweenItems);
        obj.width = globals.tileWidth;
        obj.height = globals.tileWidth;
        obj.index = i;
        this.buttons.push(obj);
      }
    }
    Tilebox.prototype.click = function(x, y) {
      var button, _i, _len, _ref, _results;
      _ref = this.buttons;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        button = _ref[_i];
        _results.push(util.rectIntersectPt(button, mouse) ? this.selection = button.index : void 0);
      }
      return _results;
    };
    Tilebox.prototype.draw = function() {
      var i, _ref, _results;
      this.canvas.strokeRect(this.x, this.y, this.width, this.height);
      _results = [];
      for (i = 0, _ref = this.items; (0 <= _ref ? i < _ref : i > _ref); (0 <= _ref ? i += 1 : i -= 1)) {
        _results.push(this.drawItem(i));
      }
      return _results;
    };
    Tilebox.prototype.getSelection = function() {
      return this.selection;
    };
    Tilebox.prototype.drawItem = function(which) {
      drawTile(this.buttons[which].x, this.buttons[which].y, this.buttons[which].index, this.canvas);
      return this.canvas.strokeRect(this.buttons[which].x, this.buttons[which].y, this.buttons[which].width, this.buttons[which].height);
    };
    return Tilebox;
  })();
  Grid = (function() {
    function Grid(x, y, canvas, toolbox) {
      var i, j, obj, _ref, _ref2;
      this.canvas = canvas;
      this.x = x;
      this.y = y;
      this.itemwidth = 10;
      this.itemheight = 10;
      this.width = this.itemwidth * globals.tileWidth;
      this.height = this.itemheight * globals.tileWidth;
      globals.lists.add(this, types.clickable);
      globals.lists.add(this, types.mouseable);
      this.tiles = [];
      for (i = 0, _ref = this.itemwidth; (0 <= _ref ? i < _ref : i > _ref); (0 <= _ref ? i += 1 : i -= 1)) {
        this.tiles.push([]);
        for (j = 0, _ref2 = this.itemwidth; (0 <= _ref2 ? j < _ref2 : j > _ref2); (0 <= _ref2 ? j += 1 : j -= 1)) {
          obj = {};
          obj.x = this.x + i * (globals.tileWidth + this.borderBetweenItems);
          obj.y = this.y + 0 * (globals.tileWidth + this.borderBetweenItems);
          obj.width = globals.tileWidth;
          obj.height = globals.tileWidth;
          obj.type = 0;
          this.tiles[i].push(obj);
        }
      }
    }
    Grid.prototype.click = function(x, y) {
      var posx, posy;
      posx = Math.floor(mouse.x / globals.tileWidth);
      posy = Math.floor(mouse.y / globals.tileWidth);
      this.tiles[posx][posy].type = toolbox.getSelection();
      return console.log(toolbox.getSelection());
    };
    Grid.prototype.draw = function(x, y) {
      var i, j, _ref, _ref2;
      for (i = 0, _ref = this.itemwidth; (0 <= _ref ? i < _ref : i > _ref); (0 <= _ref ? i += 1 : i -= 1)) {
        for (j = 0, _ref2 = this.itemwidth; (0 <= _ref2 ? j < _ref2 : j > _ref2); (0 <= _ref2 ? j += 1 : j -= 1)) {
          drawTile(i * globals.tileWidth, j * globals.tileWidth, this.tiles[i][j].type, this.canvas);
        }
      }
      this.canvas.strokeRect(this.x, this.y, this.width, this.height);
      if (this.mouseover) {
        return this.canvas.strokeRect(globals.tileWidth * Math.floor(mouse.x / globals.tileWidth), globals.tileWidth * Math.floor(mouse.y / globals.tileWidth), globals.tileWidth, globals.tileWidth);
      }
    };
    Grid.prototype.mousemove = function() {
      return this.mouseover = true;
    };
    Grid.prototype.mouseout = function() {
      return this.mouseover = false;
    };
    return Grid;
  })();
  init = function() {
    canv = document.getElementById("main").getContext("2d");
    toolbox = new Tilebox(10, 300, canv);
    grid = new Grid(0, 0, canv, toolbox);
    initMouseHandlers();
    return setInterval(mainloop, 5);
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
  s = new SpriteSheet;
  s.loadImage("f", init);
}).call(this);
