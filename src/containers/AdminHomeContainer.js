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
    return (
      <div>
        <CampaignOverallStats selectedTab={props.selectedTab} liveCampaignsCount={21} totalEntriesCount={1029} />
        <CampaignIndividualStats />
      </div>
    );
  } else {
    return <p>Reports</p>;
  }
};

AdminHomeContainer.propTypes = {
  selectedTab: PropTypes.number.isRequired,
};
