import React, { useState, useEffect } from "react";
import {
    withGoogleMap,
    withScriptjs,
    GoogleMap,
    Marker,
    InfoWindow,
    KmlLayer
} from "react-google-maps";
import * as PropTypes from 'prop-types';
import {useDispatch, useSelector} from "react-redux";
import actions from "../actions/getAcceptedEntriesForReport";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Image from 'material-ui-image';
import {getImageUrl} from "../utils/constants";

const MapWrapped = withScriptjs(withGoogleMap(props => {
    //const [selectedCampaign] = props;
    console.log('props', props);

    const getAcceptedEntries = useSelector(state => state.getAcceptedEntriesForReport);
    const [selectedEntry, setSelectedEntry] = useState(null);

    useEffect(() => {
        const listener = e => {
            if (e.key === "Escape") {
                setSelectedEntry(null);
            }
        };
        window.addEventListener("keydown", listener);

        return () => {
            window.removeEventListener("keydown", listener);
        };
    }, []);

    const getMarkers = () => {
        if(getAcceptedEntries !== undefined && getAcceptedEntries.reportDetails !== undefined && getAcceptedEntries.reportDetails !== '') {
            return (getAcceptedEntries.reportDetails.map(entry => (
                <Marker
                    key={entry._id}
                    position={{
                        lat: entry.location.coordinates[1],
                        lng: entry.location.coordinates[0]
                    }}
                    onClick={() => {
                        setSelectedEntry(entry);
                    }}
                />
            )));
        }
        else {
            return '';
        }
    };

    return (
        <GoogleMap
            defaultZoom={10}
            defaultCenter={{ lat: 13.0827, lng: 80.2707 }}
        >
            <KmlLayer
                url="/Zone_Boundary.kml"
                options={{ preserveViewport: true }}
            />
            {props.selectedCampaign !== '' ? getMarkers() : ''}

            {selectedEntry && (

                <InfoWindow
                    onCloseClick={() => {
                        setSelectedEntry(null);
                    }}
                    position={{
                        lat: selectedEntry.location.coordinates[1],
                        lng: selectedEntry.location.coordinates[0]
                    }}
                >
                    <div>
                        <h2>Location: {selectedEntry.locationNm}</h2>
                        <ul>
                            <li>Phone: {selectedEntry.userId}</li>
                        </ul>
                        <Image imageStyle={{ height: '200px', background: 'grey' }} src={ `${getImageUrl + selectedEntry.photoId}`} title="" />
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
    );
}));

export const  MapContainer = (props) => {
    const [campaignId, setCampaignId] = React.useState('');
    const { campaignDetails } = props;
    const dispatch = useDispatch();

    const handleChange = event => {
        setCampaignId(event.target.value);
        if(campaignId !== event.target.value) {
            dispatch({
                type: actions.GET_ACCEPTED_ENTRIES,
                payload: {lastRecordCreatedAt: '', applyLimit: false, campaignId: event.target.value}
            });
        }
    };
    return (
        <div>
        <div style={{ float: 'right', margin: '2%'}}>
            <InputLabel id="demo-simple-select-label">Select Campaign</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={campaignId}
                onChange={handleChange}
                style={{width: '200px'}}
            >
                {
                    campaignDetails && campaignDetails.campaignDetails && campaignDetails.campaignDetails.map(value => {
                        return (<MenuItem value={value._id}>{value.campaignName}</MenuItem>);
                    })
                }
            </Select>
        </div>
        <div style={{width: "100vw", height: "100vh"}}>
            <MapWrapped
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
                    process.env.REACT_APP_GOOGLE_KEY !== undefined ?  process.env.REACT_APP_GOOGLE_KEY : 'AIzaSyDFIVNy3804eaed33ukPN4zUURrJpZFJJY'
                    }`}
                loadingElement={<div style={{height: `100%`}}/>}
                containerElement={<div style={{height: `100%`}}/>}
                mapElement={<div style={{height: `100%`}}/>}
                selectedCampaign = {campaignId}
            />
        </div>
        </div>
    );
};

MapContainer.propTypes = {
    campaignDetails: PropTypes.object.isRequired
};


export default MapContainer;
