(function() {
  var Grid;
  Grid = (function() {
    function Grid(x, y, canvas, tilebox, toolbox) {
      var i, j, obj, _ref, _ref2;
      this.canvas = canvas;
      this.x = x;
      this.y = y;
      this.itemwidth = 15;
      this.itemheight = 15;
      this.width = this.itemwidth * globals.tileWidth;
      this.height = this.itemheight * globals.tileWidth;
      this.overworld = false;
      this.tilebox = tilebox;
      this.toolbox = toolbox;
      this.start = new Point(0, 0);
      this.dragging = false;
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
    Grid.prototype.getGridXY = function() {
      return new Point(Math.floor(mouse.x / globals.tileWidth), Math.floor(mouse.y / globals.tileWidth));
    };
    Grid.prototype.click = function(x, y) {
      var pos;
      pos = this.getGridXY();
      if (globals.tools[this.toolbox.getSelection()][globals.toolsItem] === "box") {
        if (this.dragging) {
          return;
        }
        this.dragging = true;
        return this.start = new Point(pos.x, pos.y);
      } else {
        return this.tiles[pos.x][pos.y].type = this.tilebox.getSelection();
      }
    };
    Grid.prototype.draw = function(x, y) {
      var i, j, _ref, _ref2;
      for (i = 0, _ref = this.itemwidth; (0 <= _ref ? i < _ref : i > _ref); (0 <= _ref ? i += 1 : i -= 1)) {
        for (j = 0, _ref2 = this.itemwidth; (0 <= _ref2 ? j < _ref2 : j > _ref2); (0 <= _ref2 ? j += 1 : j -= 1)) {
          if (this.overworld) {
            drawTile(i, j, this.tiles[i][j].type, this.canvas, globals.mainSheet, this.overworld);
          } else {
            drawTile(i * globals.tileWidth, j * globals.tileWidth, this.tiles[i][j].type, this.canvas, globals.mainSheet, this.overworld);
          }
        }
      }
      this.canvas.strokeRect(this.x, this.y, this.width, this.height);
      if (this.mouseover) {
        return this.canvas.strokeRect(globals.tileWidth * Math.floor(mouse.x / globals.tileWidth), globals.tileWidth * Math.floor(mouse.y / globals.tileWidth), globals.tileWidth, globals.tileWidth);
      }
    };
    Grid.prototype.unclick = function(x, y) {
      var i, j, pos, _ref, _ref2, _ref3, _ref4;
      if (globals.tools[this.toolbox.getSelection()][globals.toolsItem] === "box") {
        pos = this.getGridXY();
        for (i = _ref = this.start.x, _ref2 = pos.x; (_ref <= _ref2 ? i <= _ref2 : i >= _ref2); (_ref <= _ref2 ? i += 1 : i -= 1)) {
          for (j = _ref3 = this.start.y, _ref4 = pos.y; (_ref3 <= _ref4 ? j <= _ref4 : j >= _ref4); (_ref3 <= _ref4 ? j += 1 : j -= 1)) {
            this.tiles[i][j].type = this.tilebox.getSelection();
          }
        }
      }
      return this.dragging = false;
    };
    Grid.prototype.switchMode = function() {
      return this.overworld = !this.overworld;
    };
    Grid.prototype.mousemove = function() {
      return this.mouseover = true;
    };
    Grid.prototype.mouseout = function() {
      return this.mouseover = false;
    };
    return Grid;
  })();
  window.Grid = Grid;
}).call(this);
