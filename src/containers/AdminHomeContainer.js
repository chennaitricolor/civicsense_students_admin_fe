import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CampaignOverallStats } from '../components/CampaignOverallStats';
import * as PropTypes from 'prop-types';
import { CampaignIndividualStats } from '../components/CampaignIndividualStats';
import actions from '../actions/getAllCampaignsList';
import getCampaignDetailsActions from '../actions/getACampaignDetails';
import LoadingComponent from '../components/LoadingComponent';
import ToastComponent from "../components/ToastComponent";
import toastActions from '../actions/toastActions';

export const AdminHomeContainer = props => {
  const dispatch = useDispatch();
  const getAllCampaignsResponse = useSelector(state => state.getAllCampaignsResponse);
  const getACampaignDetailsResponse = useSelector(state => state.getACampaignDetailsResponse);

  useEffect(() => {
    dispatch({
      type: actions.GET_ALL_CAMPAIGNS_LIST,
    });
  }, []);


  const handleCampaignClickEvent = (event) => {
     dispatch({
          type: getCampaignDetailsActions.GET_CAMPAIGN_DETAILS,
          payload: { campaignId: event._id }
      });
  };

  const handleToastClose = () => {
      dispatch({
          type: toastActions.CLOSE_NOTIFICATION_DIALOG_OR_TOAST_MESSAGE,
      });
  };

  const getElementsToRender = () => {
      const totalCampaignsAndEntries = getTotalCampaignsAndEntries(getAllCampaignsResponse);
      if(getAllCampaignsResponse !== undefined) {
          if(getAllCampaignsResponse.isLoading) {
              return <LoadingComponent isLoading={getAllCampaignsResponse.isLoading}/>
          }
          else if(getAllCampaignsResponse.liveCampaigns !== '' && getAllCampaignsResponse.liveCampaigns !== undefined) {
              return (
                  <div>
                      <CampaignOverallStats selectedTab={props.selectedTab} liveCampaignsCount={totalCampaignsAndEntries ? totalCampaignsAndEntries.campaignsCount : 0} totalEntriesCount={totalCampaignsAndEntries ? totalCampaignsAndEntries.totalEntries : 0} />
                      <CampaignIndividualStats campaignDetails={totalCampaignsAndEntries.campaignDetails} onCampaignClick={handleCampaignClickEvent} campaignData={getACampaignDetailsResponse}/>
                  </div>
              );
          }
          else if(getAllCampaignsResponse.liveCampaignsError !== '' && getAllCampaignsResponse.liveCampaignsError !== undefined) {
              return <ToastComponent
                  handleClose={handleToastClose}
                  openToast={getAllCampaignsResponse.liveCampaignsError !== ''}
                  toastMessage='Error while getting Campaign details. Please try later..'
                  toastVariant='error'
              />;
          }
          else {
              return (<div/>)
          }
      }

  };

  if (props.selectedTab === 0) {
      return getElementsToRender();
  } else {
    return <p>Reports</p>;
  }
};

const getTotalCampaignsAndEntries = (campaignsResponse) => {
    const liveCampaigns  = campaignsResponse.liveCampaigns ? campaignsResponse.liveCampaigns.campaigns : undefined;
    const totalEntries = liveCampaigns !== undefined ? liveCampaigns[0].totalEntries : [];
    const totalEntriesCount = totalEntries !== undefined && totalEntries.length > 0 ? totalEntries[0].count : 0;
    const campaigns = liveCampaigns !== undefined && liveCampaigns[0].campaigns !== undefined ? liveCampaigns[0].campaigns : [];
    return {
        campaignsCount: campaigns.length,
        totalEntries: totalEntriesCount,
        campaignDetails: campaigns
    };
};

AdminHomeContainer.propTypes = {
  selectedTab: PropTypes.number.isRequired,
};

export default AdminHomeContainer;
