(function() {
  var Grid;
  Grid = (function() {
    function Grid(x, y, canvas, toolbox) {
      var i, j, obj, _ref, _ref2;
      this.canvas = canvas;
      this.x = x;
      this.y = y;
      this.itemwidth = 15;
      this.itemheight = 15;
      this.width = this.itemwidth * globals.tileWidth;
      this.height = this.itemheight * globals.tileWidth;
      this.overworld = false;
      this.toolbox = toolbox;
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
      return this.tiles[posx][posy].type = this.toolbox.getSelection();
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
