(function() {
  var SpriteSheet;
  SpriteSheet = (function() {
    function SpriteSheet() {
      this.cache = {};
      this.seenBefore = {};
      this.tiles = [];
    }
    SpriteSheet.prototype.loadImage = function(file, callback) {
      var img, thisObj;
      img = new Image();
      img.src = file;
      thisObj = this;
      return img.onload = function() {
        var buff, i, j, _ref, _ref2;
        for (i = 0, _ref = img.naturalWidth / globals.tileWidth; (0 <= _ref ? i < _ref : i > _ref); (0 <= _ref ? i += 1 : i -= 1)) {
          for (j = 0, _ref2 = img.naturalHeight / globals.tileWidth; (0 <= _ref2 ? j < _ref2 : j > _ref2); (0 <= _ref2 ? j += 1 : j -= 1)) {
            buff = document.createElement('canvas');
            buff.width = globals.tileWidth;
            buff.height = globals.tileWidth;
            buff.getContext('2d').drawImage(img, i * globals.tileWidth, j * globals.tileWidth, globals.tileWidth, globals.tileWidth, 0, 0, globals.tileWidth, globals.tileWidth);
            thisObj.tiles.push(buff);
          }
        }
        return callback();
      };
    };
    return SpriteSheet;
  })();
  window.SpriteSheet = SpriteSheet;
}).call(this);
