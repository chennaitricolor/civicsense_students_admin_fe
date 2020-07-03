import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CampaignOverallStats } from '../components/CampaignOverallStats';
import * as PropTypes from 'prop-types';
import { CampaignIndividualStats } from '../components/CampaignIndividualStats';
import actions from '../actions/getAllCampaignsList';
import metadataActions from '../actions/metadataActions';
import fetchLocationListActions from '../actions/fetchLocationList';
import getCampaignDetailsActions from '../actions/getACampaignDetails';
import LoadingComponent from '../components/LoadingComponent';
import ToastComponent from '../components/ToastComponent';
import toastActions from '../actions/toastActions';
import entrySubmissionAction from '../actions/approveOrRejectEntries';
import ReportsContainer from './ReportsContainer';
import MapContainer from './MapContainer';
import AlertsContainer from './AlertsContainer';

const loadingComponentStyle = {
  top: '40%',
  position: 'absolute',
  left: '42%',
  color: '#0084FF',
  width: '50px',
};

export const AdminHomeContainer = props => {
  const dispatch = useDispatch();
  const getAllCampaignsResponse = useSelector(state => state.getAllCampaignsResponse);
  const entrySubmissionStatus = useSelector(state => state.entrySubmissionReducer);
  const getConfig = useSelector(state => state.getConfigReducer.config);

  useEffect(() => {
    dispatch({
      type: actions.GET_ALL_CAMPAIGNS_LIST,
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch({
      type: fetchLocationListActions.FETCH_LOCATION_LIST,
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch({
      type: metadataActions.GET_METADATA,
      payload: { Authorization: getConfig.AUTH_HEADER },
    });
  }, [dispatch, getConfig.AUTH_HEADER]);

  const handleCampaignClickEvent = event => {
    dispatch({
      type: getCampaignDetailsActions.GET_CAMPAIGN_DETAILS,
      payload: { campaignId: event._id, lastRecordCreatedAt: '' },
    });
  };

  const handleEntrySubmissionClickEvent = event => {
    dispatch({
      type: entrySubmissionAction.ACCEPT_OR_REJECT_ENTRIES,
      entryId: event.entryId,
      payload: { campaignId: event.campaignId, status: event.status },
    });
  };

  const handleToastClose = () => {
    dispatch({
      type: toastActions.CLOSE_NOTIFICATION_DIALOG_OR_TOAST_MESSAGE,
    });
  };

  const showToastMessage = (message, toastVariant) => {
    return (
      <ToastComponent
        handleClose={handleToastClose}
        openToast={true}
        toastMessage={message}
        toastVariant={toastVariant}
      />
    );
  };

  const getElementsToRender = () => {
    const totalCampaignsAndEntries = getTotalCampaignsAndEntries(getAllCampaignsResponse);
    if (getAllCampaignsResponse !== undefined) {
      if (getAllCampaignsResponse.isLoading) {
        return <LoadingComponent isLoading={getAllCampaignsResponse.isLoading} style={loadingComponentStyle} />;
      } else if (
        getAllCampaignsResponse.liveCampaignsError !== '' &&
        getAllCampaignsResponse.liveCampaignsError !== undefined
      ) {
        return showToastMessage('Error while getting Campaign details. Please try later..', 'error');
      } else if (getAllCampaignsResponse.liveCampaigns !== '' && getAllCampaignsResponse.liveCampaigns !== undefined) {
        return (
          <div>
            <CampaignOverallStats
              selectedTab={props.selectedTab}
              liveCampaignsCount={totalCampaignsAndEntries ? totalCampaignsAndEntries.campaignsCount : 0}
              totalEntriesCount={totalCampaignsAndEntries ? totalCampaignsAndEntries.totalEntries : 0}
            />
            <CampaignIndividualStats
              campaignDetails={totalCampaignsAndEntries.campaignDetails}
              onCampaignClick={handleCampaignClickEvent}
              onEntrySubmissionClick={handleEntrySubmissionClickEvent}
              handleToastClose={handleToastClose}
            />
            {entrySubmissionStatus &&
              entrySubmissionStatus.entrySubmissionError !== '' &&
              showToastMessage(entrySubmissionStatus.entrySubmissionError, 'error')}
          </div>
        );
      } else {
        return <div />;
      }
    }
  };

  if (props.selectedTab === 0) {
    return getElementsToRender();
  } else if (props.selectedTab === 1) {
    return <ReportsContainer liveCampaigns={getTotalCampaignsAndEntries(getAllCampaignsResponse)} />;
  } else if (props.selectedTab === 2) {
    return <MapContainer campaignDetails={getTotalCampaignsAndEntries(getAllCampaignsResponse)} />;
  } else if (props.selectedTab === 3) {
    return <AlertsContainer />;
  } else if (props.selectedTab === 4) {
    return <h1>HQIMS Dashboard - in development</h1>;
  }
};

const getTotalCampaignsAndEntries = campaignsResponse => {
  const liveCampaigns = campaignsResponse.liveCampaigns ? campaignsResponse.liveCampaigns.campaigns : undefined;
  const totalEntries = liveCampaigns !== undefined ? liveCampaigns[0].totalEntries : [];
  const totalEntriesCount = totalEntries !== undefined && totalEntries.length > 0 ? totalEntries[0].count : 0;
  const campaigns =
    liveCampaigns !== undefined && liveCampaigns[0].campaigns !== undefined ? liveCampaigns[0].campaigns : [];
  return {
    campaignsCount: campaigns.length,
    totalEntries: totalEntriesCount,
    campaignDetails: campaigns,
  };
};

AdminHomeContainer.propTypes = {
  selectedTab: PropTypes.number.isRequired,
};

export default AdminHomeContainer;
