(function() {
  var Tilebox;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  Tilebox = (function() {
    __extends(Tilebox, SelWindow);
    function Tilebox(x, y, canvas) {
      Tilebox.__super__.constructor.call(this, x, y, 10, 2, canvas);
    }
    Tilebox.prototype.click = function(x, y) {
      var button, _i, _len, _ref, _results;
      console.log("click");
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
      Tilebox.__super__.draw.call(this);
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
      drawTile(this.buttons[which].x, this.buttons[which].y, this.buttons[which].index, this.canvas, globals.mainSheet);
      if (this.getSelection() === which) {
        return this.canvas.strokeRect(this.buttons[which].x, this.buttons[which].y, this.buttons[which].width, this.buttons[which].height);
      }
    };
    return Tilebox;
  })();
  window.Tilebox = Tilebox;
}).call(this);
