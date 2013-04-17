// Created by Kendall Buchanan, (https://github.com/kendagriff)
// Modified by Paul English, (https://github.com/nrub)
// MIT licence
// Version 0.0.2

(function() {
  var _loadUrl = Backbone.History.prototype.loadUrl
      _navigate = Backbone.History.prototype.navigate;   

  Backbone.History.prototype.loadUrl = function(fragmentOverride) {
    var matched = _loadUrl.apply(this, arguments);
    Backbone.History.prototype.trackUrl.apply(this);
    
    return matched;
  };

  Backbone.History.prototype.trackUrl = function () {
    var fragment = this.fragment;

    // Normalise fragment with leading slash
    if (!/^\//.test(fragment)) fragment = '/' + fragment;

    // Ensure we aren't double tracking an already tracked fragment
    if (fragment !== this.lastTrackedFragment) {
      if (window._gaq !== undefined) window._gaq.push(['_trackPageview', fragment]);
      this.lastTrackedFragment = fragment;
    }
  };

  Backbone.History.prototype.navigate = function(fragment, options) {
    var result = _navigate.apply(this, arguments);

    if (!options || options === true) options = {
      track: true,
      trigger: options
    };
    
    if (_.isUndefined(options.track)) {
      options.track = true;
    }

    if (options.track) {
      this.trackUrl();
    }

    return result;
  };
}).call(this);
