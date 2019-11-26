import React, { useState } from 'react';
import './App.css';
import {AdminHeader} from "./components/AdminHeader";
import {AdminHomeContainer} from "./containers/AdminHomeContainer";
import {CreateCampaignContainer} from "./containers/CreateCampaignContainer";

function App()  {
  const [selectedTab, setSelectedTab] = useState(0);
  const [createCampaign, setCreateCampaign] = useState(false);

  const handleTabChange = (event, newSelection) => {
    setSelectedTab(newSelection);
  };

  const handleCreateCampaignButtonclick = (event) => {
    setCreateCampaign(!createCampaign);
  };

  return (
      <div>
        <AdminHeader title={'Agent X Dashboard'} selectedTab={selectedTab} handleTabChange={handleTabChange}/>
        <AdminHomeContainer selectedTab={selectedTab}/>
        <CreateCampaignContainer createCampaign={createCampaign}/>
      </div>
  );
}

export default App;
