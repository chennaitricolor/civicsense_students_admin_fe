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

  const getConfig = useSelector(state => state.getConfigReducer.config);

  const handleTabChange = (event, newSelection) => {
    setSelectedTab(newSelection);
  };

  const handleCreateCampaignButtonClick = event => {
    setCreateCampaign(!createCampaign);
  };

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{getConfig !== null ? getConfig.APP_TITLE : 'GCC - COVID Tracker'}</title>
      </Helmet>
      <AdminHeader
        title={getConfig !== null ? getConfig.APP_TITLE : 'GCC - COVID Tracker'}
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
