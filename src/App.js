import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { AdminHeader } from './components/AdminHeader';
import { AdminHomeContainer } from './containers/AdminHomeContainer';
import CreateCampaignContainer from './containers/CreateCampaignContainer';
import './App.css';

function App() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [createCampaign, setCreateCampaign] = useState(false);

  const loginRegion = useSelector(state => state.loginResponse.region) || localStorage.getItem('region');

  const handleTabChange = (event, newSelection) => {
    setSelectedTab(newSelection);
  };

  const handleCreateCampaignButtonClick = event => {
    setCreateCampaign(!createCampaign);
  };

  return (
    <div className="app">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`${loginRegion} - COVID Tracker`}</title>
      </Helmet>
      <AdminHeader
        title={`${loginRegion} - COVID Tracker`}
        selectedTab={selectedTab}
        handleTabChange={handleTabChange}
        handleCreateCampaignButtonClick={handleCreateCampaignButtonClick}
      />
      <AdminHomeContainer selectedTab={selectedTab} />
      <CreateCampaignContainer
        createCampaign={createCampaign}
        handleCreateCampaignButtonClick={handleCreateCampaignButtonClick}
      />
    </div>
  );
}

export default App;
