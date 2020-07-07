import { GoogleMap, InfoWindow, KmlLayer, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { formatDateToMMDDYYYYFormat, isSameDates } from '../utils/helpers/GeneralUtils';
import Image from 'material-ui-image';
import { getImageUrl } from '../utils/constants';

export const MapWrappedComponent = withScriptjs(
  withGoogleMap(props => {
    const getAcceptedEntries = useSelector(state => state.getAcceptedEntriesForReport);
    const [selectedEntry, setSelectedEntry] = useState(null);

    useEffect(() => {
      const listener = e => {
        if (e.key === 'Escape') {
          setSelectedEntry(null);
        }
      };
      window.addEventListener('keydown', listener);

      return () => {
        window.removeEventListener('keydown', listener);
      };
    }, []);

    const getMarkers = () => {
      if (
        getAcceptedEntries !== undefined &&
        getAcceptedEntries.reportDetails !== undefined &&
        getAcceptedEntries.reportDetails !== ''
      ) {
        const filteredAcceptedEntries = getAcceptedEntriesByDates(getAcceptedEntries);
        return filteredAcceptedEntries.map(entry => (
          <Marker
            key={entry._id}
            position={{
              lat: entry.location.coordinates[1],
              lng: entry.location.coordinates[0],
            }}
            onClick={() => {
              setSelectedEntry(entry);
            }}
          />
        ));
      } else {
        return '';
      }
    };

    const getAcceptedEntriesByDates = acceptedEntries => {
      if (props.selectedDate !== null) {
        return acceptedEntries.reportDetails.filter(acceptedEntry =>
          isSameDates(formatDateToMMDDYYYYFormat(acceptedEntry.createdAt), props.selectedDate),
        );
      }
      return acceptedEntries.reportDetails;
    };

    return (
      <GoogleMap defaultZoom={10} defaultCenter={props.regionCenter}>
        <KmlLayer url="/Zone_Boundary.kml" options={{ preserveViewport: true }} />
        {props.selectedCampaign !== '' ? getMarkers() : ''}

        {selectedEntry && (
          <InfoWindow
            onCloseClick={() => {
              setSelectedEntry(null);
            }}
            position={{
              lat: selectedEntry.location.coordinates[1],
              lng: selectedEntry.location.coordinates[0],
            }}
          >
            <div>
              <h2>Location: {selectedEntry.locationNm}</h2>
              <ul>
                <li>Phone: {selectedEntry.userId}</li>
              </ul>
              <Image
                imageStyle={{ height: '200px', background: 'grey' }}
                src={`${getImageUrl + selectedEntry.photoId}`}
                title=""
              />
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    );
  }),
);
