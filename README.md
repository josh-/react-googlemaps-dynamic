React Google Maps Dynamic
============

Experimental fork of [react-googlemaps](https://github.com/pieterv/react-googlemaps) that can dynamically load the Google Maps API

Usage Example
-------

```js
import { Map, bootstrapGoogleMapsAPI } from 'react-googlemaps-dynamic';
const APIKey = 'API_Key_Here';

var DynamicReactGoogleMap = React.createClass({
  getInitialState() {
      return {
          scriptStatus: 'unloaded'
      };
  },

  componentDidMount() {
      bootstrapGoogleMapsAPI(
          APIKey,
          () => {
              this.setState({ center: new window.google.maps.LatLng(37.8141, 144.9633); });
              this.setState({ scriptStatus: 'loaded' });
          },
          () => {
              this.setState({ scriptStatus: 'error' });
          }
      );
  },

  render() {
    return {this.state.scriptStatus === 'loaded' ? <Map {...this.props}></Map> : null};
  }
});

module.exports = DynamicReactGoogleMap;
```

Please see [react-googlemaps](https://github.com/pieterv/react-googlemaps) for more usage instructions.

License
-------

Licensed under MIT. [Full license here »](LICENSE)
