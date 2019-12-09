import React, { useState } from 'react';
import { CampaignOverallStats } from '../components/CampaignOverallStats';
import * as PropTypes from 'prop-types';
import { CampaignIndividualStats } from '../components/CampaignIndividualStats';

export const AdminHomeContainer = props => {
  if (props.selectedTab === 0) {
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
