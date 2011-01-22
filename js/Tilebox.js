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
      Tilebox.__super__.constructor.call(this, x, y, 10, 2, canvas, globals.mainSheet);
    }
    Tilebox.prototype.click = function(x, y) {
      return Tilebox.__super__.click.call(this, x, y);
    };
    Tilebox.prototype.draw = function() {
      return Tilebox.__super__.draw.call(this);
    };
    Tilebox.prototype.getSelection = function() {
      return Tilebox.__super__.getSelection.call(this);
    };
    Tilebox.prototype.unclick = function() {
      return Tilebox.__super__.unclick.call(this);
    };
    return Tilebox;
  })();
  window.Tilebox = Tilebox;
}).call(this);
