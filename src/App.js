import React, { useState } from 'react';
import './App.css';
import { AdminHeader } from './components/AdminHeader';
import { AdminHomeContainer } from './containers/AdminHomeContainer';
import CreateCampaignContainer from './containers/CreateCampaignContainer';

function App() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [createCampaign, setCreateCampaign] = useState(false);

  const handleTabChange = (event, newSelection) => {
    setSelectedTab(newSelection);
  };

  const handleCreateCampaignButtonClick = event => {
    setCreateCampaign(!createCampaign);
  };

  return (
    <div>
      <AdminHeader
        title={'Agent X Dashboard'}
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
