import React, { useEffect, useReducer, useState } from 'react';
import * as PropTypes from 'prop-types';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { CreateCampaign } from '../components/CreateCampaign';
import { formatDateToMMDDYYYYFormat } from '../utils/helpers/GeneralUtils';

const CreateCampaignContainer = props => {
  const [campaign, setCampaign] = useReducer((state, newState) => ({ ...state, ...newState }), {
    campaignName: '',
    campaignStartDate: null,
    campaignEndDate: null,
    campaignSearchLocation: '',
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [showSnackBar, setShowSnackBar] = useState(false);

  useEffect(() => disableCreateButton());

  const handleOnChange = (event, id, type) => {
    if (type === 'text') {
      setCampaign({
        [event.target.id]: event.target.value,
      });
    }
    if (type === 'date') {
      if (event !== null && event.valueOf() !== null) {
        setCampaign({
          [id]: formatDateToMMDDYYYYFormat(new Date(event.valueOf())),
        });
      } else {
        setCampaign({
          [id]: null,
        });
      }
    }
    if (type === 'dropdown') {
      if (event !== null) {
        setCampaign({
          [id]: event.value,
        });
      } else {
        setCampaign({
          [id]: '',
        });
      }
    }
  };

  const disableCreateButton = () => {
    setIsDisabled(
      !(
        campaign.campaignName !== '' &&
        campaign.campaignStartDate !== null &&
        campaign.campaignEndDate !== null &&
        campaign.campaignSearchLocation !== ''
      ),
    );
  };

  const createCampaignEventHandler = event => {
    console.log(campaign);
    setShowSnackBar(true);
    props.handleCreateCampaignButtonClick();
    setCampaign({
      campaignName: '',
      campaignStartDate: null,
      campaignEndDate: null,
      campaignSearchLocation: '',
    });
  };

  const handleSnackBarExited = () => {
    setShowSnackBar(false);
  };

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <CreateCampaign
        createCampaign={props.createCampaign}
        handleCreateCampaignButtonClick={props.handleCreateCampaignButtonClick}
        campaignDetails={campaign}
        handleOnChange={handleOnChange}
        isDisabled={isDisabled}
        showSnackBar={showSnackBar}
        handleSnackBarExited={handleSnackBarExited}
        createCampaignEventHandler={createCampaignEventHandler}
      />
    </MuiPickersUtilsProvider>
  );
};

CreateCampaignContainer.propTypes = {
  createCampaign: PropTypes.bool.isRequired,
  handleCreateCampaignButtonClick: PropTypes.func.isRequired,
};

export default CreateCampaignContainer;
