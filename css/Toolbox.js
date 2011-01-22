(function() {
  var Toolbox;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  Toolbox = (function() {
    __extends(Toolbox, SelWindow);
    function Toolbox(x, y, canvas) {
      Toolbox.__super__.constructor.call(this, x, y, 1, 20, canvas);
    }
    Toolbox.prototype.draw = function() {
      var i, _ref, _results;
      Toolbox.__super__.draw.call(this);
      _results = [];
      for (i = 0, _ref = this.items; (0 <= _ref ? i < _ref : i > _ref); (0 <= _ref ? i += 1 : i -= 1)) {
        _results.push(this.drawItem(i));
      }
      return _results;
    };
    Toolbox.prototype.drawItem = function(which) {
      drawTile(this.buttons[which].x, this.buttons[which].y, this.buttons[which].index, this.canvas, globals.toolsSheet);
      if (this.getSelection() === which) {
        return this.canvas.strokeRect(this.buttons[which].x, this.buttons[which].y, this.buttons[which].width, this.buttons[which].height);
      }
    };
    return Toolbox;
  })();
  window.Toolbox = Toolbox;
}).call(this);
