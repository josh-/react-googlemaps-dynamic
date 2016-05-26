"use strict";

var assign = require('react/lib/Object.assign');
var ReactDefaultInjection = require('./src/ui/ReactDefaultInjection');
var ReactMapComponents = require('./src/ReactMapComponents');
var MapPropTypes = require('./src/ui/MapPropTypes');
var GoogleMapsAPI = require('./src/GoogleMapsAPI');

ReactDefaultInjection.inject();

module.exports = assign(
  {},
  ReactMapComponents,
  {
    PropTypes: MapPropTypes
  },
  GoogleMapsAPI
);
