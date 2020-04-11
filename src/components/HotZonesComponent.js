import { GoogleMap, KmlLayer, withGoogleMap, withScriptjs } from 'react-google-maps';
import React from 'react';

const kmlFileUrl = () => {
    return window.location.host.includes('localhost') ? 'https://coviddev.gccservice.in/hotzones.kml' : window.location.host + '/hotzones.kml';
};

export const HotZonesComponent = withScriptjs(
    withGoogleMap(props => {
        console.log('host is: ', kmlFileUrl());
        return (
            <GoogleMap defaultZoom={10} defaultCenter={{ lat: 13.0827, lng: 80.2707 }}>
                <KmlLayer url={kmlFileUrl()} options={{ preserveViewport: true }} zIndex={100}/>
            </GoogleMap>
        );
    }),
);
