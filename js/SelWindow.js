(function() {
  var SelWindow;
  SelWindow = (function() {
    function SelWindow(x, y, itemsWide, items, canvas, spritesheet) {
      var i, obj, _ref;
      this.spritesheet = spritesheet;
      this.canvas = canvas;
      this.x = x;
      this.y = y;
      this.border = globals.windowBorder;
      this.items = items;
      this.width = itemsWide * (globals.tileWidth + this.border);
      this.height = Math.ceil(items / itemsWide) * (globals.tileWidth + this.border);
      this.selection = 0;
      this.itemsWide = this.width / globals.tileWidth;
      globals.lists.add(this, types.clickable);
      this.buttons = [];
      for (i = 0, _ref = this.items; (0 <= _ref ? i < _ref : i > _ref); (0 <= _ref ? i += 1 : i -= 1)) {
        obj = {};
        obj.x = this.x + i % itemsWide * (globals.tileWidth + this.border) + this.border;
        obj.y = this.y + Math.floor(i / itemsWide) * (globals.tileWidth + this.border);
        obj.width = globals.tileWidth;
        obj.height = globals.tileWidth;
        obj.index = i;
        this.buttons.push(obj);
      }
    }
    SelWindow.prototype.click = function() {
      var button, _i, _len, _ref, _results;
      _ref = this.buttons;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        button = _ref[_i];
        _results.push(util.rectIntersectPt(button, mouse) ? this.selection = button.index : void 0);
      }
      return _results;
    };
    SelWindow.prototype.unclick = function() {};
    SelWindow.prototype.draw = function() {
      var i, _ref, _results;
      this.canvas.strokeRect(this.x, this.y, this.width + this.border, this.height);
      _results = [];
      for (i = 0, _ref = this.items; (0 <= _ref ? i < _ref : i > _ref); (0 <= _ref ? i += 1 : i -= 1)) {
        _results.push(this.drawItem(i));
      }
      return _results;
    };
    SelWindow.prototype.getSelection = function() {
      return this.selection;
    };
    SelWindow.prototype.drawItem = function(which) {
      drawTile(this.buttons[which].x, this.buttons[which].y, this.buttons[which].index, this.canvas, this.spritesheet);
      if (this.getSelection() === which) {
        return this.canvas.strokeRect(this.buttons[which].x, this.buttons[which].y, this.buttons[which].width, this.buttons[which].height);
      }
    };
    return SelWindow;
  })();
  window.SelWindow = SelWindow;
}).call(this);
