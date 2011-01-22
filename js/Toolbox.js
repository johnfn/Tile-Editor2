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
      Toolbox.__super__.constructor.call(this, x, y, 1, 2, canvas, globals.toolsSheet);
    }
    Toolbox.prototype.click = function(x, y) {
      return Toolbox.__super__.click.call(this, x, y);
    };
    Toolbox.prototype.draw = function() {
      return Toolbox.__super__.draw.call(this);
    };
    Toolbox.prototype.getSelection = function() {
      return Toolbox.__super__.getSelection.call(this);
    };
    Toolbox.prototype.unclick = function() {
      return Toolbox.__super__.unclick.call(this);
    };
    return Toolbox;
  })();
  window.Toolbox = Toolbox;
}).call(this);
