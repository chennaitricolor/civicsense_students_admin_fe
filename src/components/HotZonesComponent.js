import { GoogleMap, KmlLayer, withGoogleMap, withScriptjs } from 'react-google-maps';
import React from 'react';

export const HotZonesComponent = withScriptjs(
    withGoogleMap(props => {
        return (
            <GoogleMap defaultZoom={10} defaultCenter={{ lat: 13.0827, lng: 80.2707 }}>
                <KmlLayer url="/hotzones.kml" options={{ preserveViewport: true }} zIndex={100}/>
            </GoogleMap>
        );
    }),
);
