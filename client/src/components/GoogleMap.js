import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: 37.7749,
  lng: -122.4194
};

function Map() {
  return (
    <LoadScript googleMapsApiKey="8f62ea463659b3311c4b3b5870eeeba90f654915">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  )
}

export default Map;