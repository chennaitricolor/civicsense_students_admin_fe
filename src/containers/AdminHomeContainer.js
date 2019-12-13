import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CampaignOverallStats } from '../components/CampaignOverallStats';
import * as PropTypes from 'prop-types';
import { CampaignIndividualStats } from '../components/CampaignIndividualStats';
import actions from '../actions/getAllCampaignsList';

export const AdminHomeContainer = props => {
  const dispatch = useDispatch();
  const getAllCampaignsResponse = useSelector(state => state.getAllCampaignsResponse);

  useEffect(() => {
    dispatch({
      type: actions.GET_ALL_CAMPAIGNS_LIST,
    });
  }, []);

  if (props.selectedTab === 0) {
    console.log('API response: ', getAllCampaignsResponse);
      console.log('API response: ', getAllCampaignsResponse);
      const totalCampaignsAndEntries = getTotalCampaignsAndEntries(getAllCampaignsResponse);
    return (
      <div>
        <CampaignOverallStats selectedTab={props.selectedTab} liveCampaignsCount={totalCampaignsAndEntries ? totalCampaignsAndEntries.campaignsCount : 0} totalEntriesCount={totalCampaignsAndEntries ? totalCampaignsAndEntries.totalEntries : 0} />
        <CampaignIndividualStats />
      </div>
    );
  } else {
    return <p>Reports</p>;
  }
};

const getTotalCampaignsAndEntries = (campaignsResponse) => {
    const liveCampaigns  = campaignsResponse.liveCampaigns.campaigns;
    const totalEntries = liveCampaigns !== undefined ? liveCampaigns.totalEntries : [];
    const totalEntriesCount = totalEntries !== undefined && totalEntries.length > 0 ? totalEntries[0].count : 0;
    const campaigns = liveCampaigns !== undefined && liveCampaigns.campaigns !== undefined ? liveCampaigns.campaigns : [];
    const data = {
        campaignsCount: campaigns.length,
        totalEntries: totalEntriesCount
    };
    console.log(data);
    return data;
};

AdminHomeContainer.propTypes = {
  selectedTab: PropTypes.number.isRequired,
};
