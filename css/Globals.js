(function() {
  var drawTile, globals, mouse, types, util;
  globals = {
    windowBorder: 2,
    tileWidth: 16,
    mouseDown: 0,
    lists: 0,
    mainSheet: 0,
    toolsSheet: 0
  };
  window.globals = globals;
  types = {
    clickable: "CLICK",
    drawable: "DRAW",
    mouseable: "MOUSE"
  };
  window.types = types;
  util = {
    rectIntersectPt: function(rect, pt) {
      return pt.x >= rect.x && pt.x <= rect.x + rect.width && pt.y >= rect.y && pt.y <= rect.y + rect.height;
    },
    intersect: function(obj1, obj2) {
      return util.rectIntersectPt(obj1, new Point(obj2.x, obj2.y)) || util.rectIntersectPt(obj1, new Point(obj2.x + obj2.width, obj2.y)) || util.rectIntersectPt(obj1, new Point(obj2.x, obj2.y + obj2.height)) || util.rectIntersectPt(obj1, new Point(obj2.x + obj2.width, obj2.y + obj2.height));
    }
  };
  window.util = util;
  mouse = {
    x: 0,
    y: 0
  };
  window.mouse = mouse;
  drawTile = function(x, y, type, canvas, sheet, overworld) {
    if (this.overworld) {
      globals.tileWidth = 1;
    }
    if (!this.overworld) {
      canvas.drawImage(sheet.tiles[type], x, y);
    }
    if (this.overworld) {
      globals.tileWidth = 16;
    }
    if (this.overworld) {
      if (type === 0) {
        canvas.fillStyle = "#FF0000";
      }
      if (type === 1) {
        canvas.fillStyle = "#00FF00";
      }
      return canvas.fillRect(x, y, globals.tileWidth, globals.tileWidth);
    }
  };
  window.drawTile = drawTile;
}).call(this);
