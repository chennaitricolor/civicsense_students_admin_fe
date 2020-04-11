import React from "react";
import {HotZonesComponent} from "../components/HotZonesComponent";

const HotZonesContainer = () => {
    return ( <div style={{ width: '100vw', height: '100vh' }}>
        <HotZonesComponent
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
                process.env.REACT_APP_GOOGLE_KEY !== undefined
                    ? process.env.REACT_APP_GOOGLE_KEY
                    : 'AIzaSyDFIVNy3804eaed33ukPN4zUURrJpZFJJY'
            }`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
        />
    </div>);
};

export default HotZonesContainer;