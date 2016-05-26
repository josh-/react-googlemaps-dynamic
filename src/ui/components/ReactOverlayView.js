"use strict";

var React = require('react');
var assign = require('react/lib/Object.assign');
var cloneWithProps = require('react/lib/cloneWithProps');
var GoogleMapsAPI = require('../../GoogleMapsAPI');
var MapPropTypes = require('../MapPropTypes');

function MapOverlayView(props) {
  this.props = props;
  this.setMap(props.map);
}

MapOverlayView.prototype = function() {
  return new window.google.maps.OverlayView();
}

MapOverlayView.prototype.onAdd = function() {
  this._containerElement = document.createElement('div');
  this.getPanes()[this.props.mapPane]
    .appendChild(this._containerElement);
};

MapOverlayView.prototype.draw = function() {
  var props = assign({}, this.props, {position: null, mapPane: null});
  if (this.props.position) {
    var point = this.getProjection()
      .fromLatLngToDivPixel(this.props.position);

    props.style = assign({}, {
      position: 'absolute',
      left: point.x,
      top: point.y
    }, this.props.style);
  }

  React.render(
    cloneWithProps(<div />, props),
    this._containerElement
  )
};

MapOverlayView.prototype.onRemove = function() {
  React.unmountComponentAtNode(this._containerElement);
  this._containerElement.parentNode
    .removeChild(this._containerElement);
  this._containerElement = null;
};

var ReactOverlayView = React.createClass({
  displayName: 'OverlayView',

  propTypes: {
    mapPane: MapPropTypes.MapPanes.isRequired
  },

  getDefaultProps: function() {
    return {
      mapPane: 'overlayLayer'
    };
  },

  render: function() {
    // Nothing to render
    return null;
  },

  componentDidMount: function() {
    this.__node = new MapOverlayView(this.props);
  },

  componentDidUpdate: function(prevProps) {
    this.__node.props = this.props;
    this.__node.draw();

    if (this.props.mapPane != prevProps.mapPane) {
      // Unmount then, mount again onto the correct map pane
      this.__node.setMap(null);
      this.__node.setMap(this.props.map);
    }
  },

  componentWillUnmount: function() {
    this.__node.setMap(null);
    this.__node = null;
  }
});

module.exports = ReactOverlayView;
