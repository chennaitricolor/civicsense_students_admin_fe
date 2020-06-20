import { GoogleMap, KmlLayer, withGoogleMap, withScriptjs } from 'react-google-maps';
import React from 'react';
import { getTestingCentersUrl } from '../utils/constants';

const kmlFileUrl = () => {
  return window.location.host.includes('localhost')
    ? 'https://api.dev.gccservice.in/api/csr/testingCenters'
    : window.location.protocol + '//' + window.location.host + getTestingCentersUrl;
};

export const TestingCenterComponent = withScriptjs(
  withGoogleMap(props => {
    return (
      <GoogleMap defaultZoom={10} defaultCenter={{ lat: 13.0827, lng: 80.2707 }}>
        <KmlLayer url={kmlFileUrl()} options={{ preserveViewport: true }} zIndex={100} />
      </GoogleMap>
    );
  }),
);
