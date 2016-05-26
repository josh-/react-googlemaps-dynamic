"use strict";

var React = require('react');

/**
 * Checks whether a prop provides a `GoogleMaps.LatLng`
 */
 exports.LatLng = React.PropTypes.object;

/**
 * Checks whether a prop provides a `GoogleMaps.LatLngBounds`
 */
exports.LatLngBounds = React.PropTypes.func;

/**
 * Checks whether a prop provides a `GoogleMaps.Map`
 */
exports.Map = React.PropTypes.object;

/**
 * Checks whether a prop provides a `GoogleMaps.Point`
 */
exports.Point = React.PropTypes.func;

/**
 * Checks whether a prop provides a `GoogleMaps.Animation`
 */
exports.Animation = React.PropTypes.oneOf('BOUNCE', 'DROP', 'nr', 'lr');

/**
 * Checks whether a prop provides a `GoogleMaps.Icon`
 */
exports.Icon = React.PropTypes.object;

/**
 * Checks whether a prop provides a `GoogleMaps.Symbol`
 */
exports.Symbol = React.PropTypes.object;

/**
 * Checks whether a prop provides a `GoogleMaps.MarkerShape`
 */
exports.MarkerShape = React.PropTypes.object;

/**
 * Checks whether a prop provides a `GoogleMaps.MapPanes`
 */
exports.MapPanes = React.PropTypes.oneOf(['floatPane', 'mapPane', 'markerLayer', 'overlayLayer', 'overlayMouseTarget']);