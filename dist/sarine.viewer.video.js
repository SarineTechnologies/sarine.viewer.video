
/*!
sarine.viewer.video - v0.0.0 -  Sunday, August 16th, 2015, 11:55:27 AM 
 The source code, name, and look and feel of the software are Copyright © 2015 Sarine Technologies Ltd. All Rights Reserved. You may not duplicate, copy, reuse, sell or otherwise exploit any portion of the code, content or visual design elements without express written permission from Sarine Technologies Ltd. The terms and conditions of the sarine.com website (http://sarine.com/terms-and-conditions/) apply to the access and use of this software.
 */

(function() {
  var Video,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Video = (function(_super) {
    __extends(Video, _super);

    function Video(options) {
      Video.__super__.constructor.call(this, options);
    }

    Video.prototype.convertElement = function() {
      this.video = $("<video>");
      return this.element.append(this.video);
    };

    Video.prototype.first_init = function() {
      var defer;
      defer = $.Deferred();
      defer.resolve(this);
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
