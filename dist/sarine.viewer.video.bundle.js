
/*!
sarine.viewer.video - v0.6.0 -  Sunday, January 28th, 2018, 9:42:04 AM 
 The source code, name, and look and feel of the software are Copyright © 2015 Sarine Technologies Ltd. All Rights Reserved. You may not duplicate, copy, reuse, sell or otherwise exploit any portion of the code, content or visual design elements without express written permission from Sarine Technologies Ltd. The terms and conditions of the sarine.com website (http://sarine.com/terms-and-conditions/) apply to the access and use of this software.
 */


/*!
sarine.viewer - v0.3.4 -  Wednesday, November 8th, 2017, 3:00:02 PM 
 The source code, name, and look and feel of the software are Copyright © 2015 Sarine Technologies Ltd. All Rights Reserved. You may not duplicate, copy, reuse, sell or otherwise exploit any portion of the code, content or visual design elements without express written permission from Sarine Technologies Ltd. The terms and conditions of the sarine.com website (http://sarine.com/terms-and-conditions/) apply to the access and use of this software.
 */

(function() {
  var Video, Viewer,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Viewer = (function() {
    var error, rm;

    rm = ResourceManager.getInstance();

    function Viewer(options) {
      console.log("");
      this.first_init_defer = $.Deferred();
      this.full_init_defer = $.Deferred();
      this.src = options.src, this.element = options.element, this.autoPlay = options.autoPlay, this.callbackPic = options.callbackPic;
      this.id = this.element[0].id;
      this.element = this.convertElement();
      Object.getOwnPropertyNames(Viewer.prototype).forEach(function(k) {
        if (this[k].name === "Error") {
          return console.error(this.id, k, "Must be implement", this);
        }
      }, this);
      this.element.data("class", this);
      this.element.on("play", function(e) {
        return $(e.target).data("class").play.apply($(e.target).data("class"), [true]);
      });
      this.element.on("stop", function(e) {
        return $(e.target).data("class").stop.apply($(e.target).data("class"), [true]);
      });
      this.element.on("cancel", function(e) {
        return $(e.target).data("class").cancel().apply($(e.target).data("class"), [true]);
      });
    }

    error = function() {
      return console.error(this.id, "must be implement");
    };

    Viewer.prototype.first_init = Error;

    Viewer.prototype.full_init = Error;

    Viewer.prototype.play = Error;

    Viewer.prototype.stop = Error;

    Viewer.prototype.convertElement = Error;

    Viewer.prototype.cancel = function() {
      return rm.cancel(this);
    };

    Viewer.prototype.loadImage = function(src) {
      return rm.loadImage.apply(this, [src]);
    };

    Viewer.prototype.loadAssets = function(resources, onScriptLoadEnd) {
      var element, resource, scripts, scriptsLoaded, _i, _len;
      if (resources !== null && resources.length > 0) {
        scripts = [];
        for (_i = 0, _len = resources.length; _i < _len; _i++) {
          resource = resources[_i];

          /*element = document.createElement(resource.element)
          if(resource.element == 'script')
            $(document.body).append(element)
             * element.onload = element.onreadystatechange = ()-> triggerCallback(callback)
            element.src = @resourcesPrefix + resource.src + cacheVersion
            element.type= "text/javascript"
           */
          if (resource.element === 'script') {
            scripts.push(resource.src + cacheVersion);
          } else {
            element = document.createElement(resource.element);
            element.href = resource.src + cacheVersion;
            element.rel = "stylesheet";
            element.type = "text/css";
            $(document.head).prepend(element);
          }
        }
        scriptsLoaded = 0;
        scripts.forEach(function(script) {
          return $.getScript(script, function() {
            if (++scriptsLoaded === scripts.length) {
              return onScriptLoadEnd();
            }
          });
        });
      }
    };

    Viewer.prototype.setTimeout = function(delay, callback) {
      return rm.setTimeout.apply(this, [this.delay, callback]);
    };

    return Viewer;

  })();

  this.Viewer = Viewer;

  Video = (function(_super) {
    __extends(Video, _super);

    function Video(options) {
      Video.__super__.constructor.call(this, options);
      this.videoFiles = options.videoFiles;
      this.videoLoop = this.element.data('loop') || true;
      this.videoAutoPlay = this.element.data('autoplay') || true;
      this.controls = this.element.data('controls') || false;
      this.videoSize = this.element.data('size') || false;
    }

    Video.prototype.convertElement = function() {
      this.video = $("<video>");
      return this.element.append(this.video);
    };

    Video.prototype.first_init = function() {
      var $source, arr, defer, playUrl, videoFile, _i, _len, _ref, _t;
      defer = $.Deferred();
      if (this.videoLoop !== "false") {
        this.video.attr({
          "loop": "loop"
        });
      }
      if (this.videoAutoPlay !== "false") {
        this.video.attr({
          "autoplay": "autoplay"
        });
      }
      if (this.controls) {
        this.video.attr({
          controls: true
        });
      }
      if (this.videoSize) {
        this.video.attr({
          width: this.element.data('size'),
          height: this.element.data('size')
        });
      }
      _ref = this.videoFiles;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        videoFile = _ref[_i];
        $source = $('<source>');
        $source.attr({
          type: "video/" + videoFile.fileType,
          src: [this.src, videoFile.fileName + "." + videoFile.fileType].join("/")
        });
        this.element.find("video").append($source);
      }
      _t = this;
      arr = this.callbackPic.split('/');
      arr.pop();
      playUrl = arr.join('/') + '/play.png';
      this.loadImage(playUrl).then(function(img) {
        _t.element.find("video").attr({
          poster: img.src
        });
        return defer.resolve(this);
      });
      this.element.find("video").bind('contextmenu', function() {
        return false;
      });
      this.element.find("video").on('click', function() {
        return this.play();
      });
      return defer;
    };

    Video.prototype.full_init = function() {
      var defer;
      defer = $.Deferred();
      defer.resolve(this);
      return defer;
    };

    Video.prototype.play = function() {};

    Video.prototype.stop = function() {};

    return Video;

  })(Viewer);

  this.Video = Video;

}).call(this);
