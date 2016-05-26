"use strict";

var insertGoogleMapsScript = function(APIKey, done, error) {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  var loaded = function() {
    done();
  };
  var errored = function() {
    removeScript(this);
    error();
  };
  script.onload = loaded;
  script.onreadystatechange = loaded;
  script.onerror = errored;
  script.src = buildURL(APIKey);
  document.getElementsByTagName('head')[0].appendChild(script);
};

var scriptExists = function(scriptURL) {
  var scripts = document.getElementsByTagName('script');
  var googleMapsScripts = Array.prototype.slice.call(scripts, 0).filter(function(script) {
    if (script.src === scriptURL) {
      return script;
    }
  });
  if (googleMapsScripts.length > 0) {
    return googleMapsScripts[0];
  }
  return false;
};

var removeScript = function(scriptNode) {
  if (scriptNode) {
    document.getElementsByTagName('head')[0].removeChild(scriptNode);
  }
};

var buildURL = function(APIKey) {
  var googleMapsAPIUrl = 'https://maps.googleapis.com/maps/api/js';
  if (APIKey) {
    googleMapsAPIUrl = googleMapsAPIUrl.concat('?key=' + APIKey);
  }
  return googleMapsAPIUrl;
};

/**
 * Determined whether the Google Maps API is loaded.
 *
 * @param {string} [APIKey] - Google Maps API Key.
 * @param {function} [done] - Function to be called if the API is available, or when the API becomes available after loading.
 * @param {string} [error] - Function to be called if the API is not available, or when the API fails to load.
 *
 * @public
 */
var bootstrap = function(APIKey, done, error) {
  if (done && typeof done != 'function') {
    console.error('Incorrect parameter passed to `bootstrapGoogleMapsAPI`: `done` should be a function.');
    return;
  }
  if (error && typeof error != 'function') {
    console.error('Incorrect parameter passed to `bootstrapGoogleMapsAPI`: `error` should be a function.');
    return;
  }

  if (window.google) {
    if (window.google.maps) {
      if (typeof done === 'function') {
        done();
        return;
      }
    }
  }

  var script = scriptExists(buildURL(APIKey));
  if (script) {
    var currentOnLoad = script.onload;
    var loaded = function() {
      currentOnLoad();
      done();
    };
    script.onload = loaded;
    script.onreadystatechange = loaded;

    var currentOnError = script.onerror;
    script.onerror = function() {
      currentOnError();
      error();
    };
    return;
  }

  insertGoogleMapsScript(APIKey, done, error);
};

module.exports = { bootstrapGoogleMapsAPI: bootstrap };