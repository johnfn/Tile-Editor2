(function() {
  var SelWindow;
  SelWindow = (function() {
    function SelWindow(x, y, itemsWide, items, canvas) {
      var i, obj, _ref;
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
        obj.x = this.x + i * (globals.tileWidth + this.border) + this.border;
        obj.y = this.y + Math.floor(i / itemsWide) * (globals.tileWidth + this.border);
        obj.width = globals.tileWidth;
        obj.height = globals.tileWidth;
        obj.index = i;
        this.buttons.push(obj);
      }
    }
    SelWindow.prototype.draw = function() {
      return this.canvas.strokeRect(this.x, this.y, this.width + this.border, this.height);
    };
    return SelWindow;
  })();
  window.SelWindow = SelWindow;
}).call(this);
