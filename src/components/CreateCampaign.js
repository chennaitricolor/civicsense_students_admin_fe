import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { DatePicker } from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import jsonPath from 'jsonpath-plus';

const useStyles = makeStyles(theme => ({
  createCampaignHeader: {
    padding: '2% 0 0% 2%',
    color: '#707070',
    fontSize: '24px',
  },
  textField: {
    marginLeft: '2%',
    marginRight: '2%',
    marginTop: '5%',

    '& label': {
      color: '#707070 !important',
      fontSize: '20px',
    },

    '& fieldset': {
      border: '1px solid #707070 !important',
    },
  },
  datePicker: {
    margin: '2%',
    marginTop: '5%',
    width: '96% !important',

    '& label': {
      color: '#707070 !important',
      fontSize: '20px',
    },

    '& fieldset': {
      border: '1px solid #707070 !important',
    },
  },
  actionButton: {
    width: '100%',
    bottom: '0',
    position: 'absolute',
    height: '5%',
  },
  label: {
    '& label': {
      color: '#707070 !important',
      fontSize: '20px',
    },

    '& fieldset': {
      border: '1px solid #707070 !important',
    },
  },
  option: {
    fontSize: 14,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
  campaignMessageSnackBar: {
    '& div': {
      backgroundColor: '#0084FF',
      borderRadius: '10px',
    },
  },
}));

const matchStyle = {
  width: '96%%',
  margin: '2%',
  paddingTop: '5%',
};

function renderTextField(label, key, campaignDetails, handleOnChange, styles) {
  return (
    <TextField
      className={'create-campaign-' + key + ' ' + styles.textField}
      label={label}
      id={key}
      value={jsonPath({
        flatten: true,
        json: campaignDetails,
        path: key,
        wrap: false,
      })}
      onChange={event => handleOnChange(event, key, 'text')}
      autoComplete="off"
      margin={'normal'}
      variant={'outlined'}
    />
  );
}

function renderDateField(label, key, campaignDetails, handleOnChange, styles) {
  return (
    <DatePicker
      className={'create-campaign-' + key + '-mui-pickers ' + styles.datePicker}
      key={'create-campaign-' + key + '-mui-pickers-key'}
      id={'create-campaign-' + key + '-mui-pickers'}
      label={label}
      value={jsonPath({
        flatten: true,
        json: campaignDetails,
        path: key,
        wrap: false,
      })}
      onChange={date => handleOnChange(date, key, 'date')}
      disablePast
      placeholder="MM/DD/YYYY"
      format={'MM/DD/YYYY'}
      inputVariant="outlined"
      clearable
    />
  );
}

export const CreateCampaign = props => {
  const styles = useStyles();
  return (
    <div>
      <Drawer anchor="right" open={props.createCampaign} onClose={props.handleCreateCampaignButtonClick}>
        <Typography className={styles.createCampaignHeader}>Create Campaign</Typography>
        {renderTextField('Campaign Name', 'campaignName', props.campaignDetails, props.handleOnChange, styles)}
        {renderDateField('Start Date', 'campaignStartDate', props.campaignDetails, props.handleOnChange, styles)}
        {renderDateField('End Date', 'campaignEndDate', props.campaignDetails, props.handleOnChange, styles)}
        <Autocomplete
          className={'create-campaign-search-location ' + styles.label}
          id={'campaignSearchLocation'}
          value={props.campaignDetails.campaignSearchLocation}
          style={matchStyle}
          options={props.locationList !== undefined ? props.locationList : []}
          loadingText={'Loading'}
          classes={{
            option: styles.option,
          }}
          getOptionLabel={option => (option.label !== undefined ? option.label : option)}
          onChange={(event, value) => props.handleOnChange(value, 'campaignSearchLocation', 'dropdown')}
          renderInput={params => (
            <TextField
              {...params}
              label={'Search Location'}
              variant={'outlined'}
              fullWidth
              inputProps={{
                ...params.inputProps,
                autoComplete: 'disabled',
              }}
            />
          )}
        />
        {renderTextField('Description', 'description', props.campaignDetails, props.handleOnChange, styles)}
        {renderTextField('Rules', 'rules', props.campaignDetails, props.handleOnChange, styles)}
        {renderTextField('Rewards', 'rewards', props.campaignDetails, props.handleOnChange, styles)}
        <Button
          id={'create-campaign-create-button'}
          variant="contained"
          className={styles.actionButton}
          onClick={event => props.createCampaignEventHandler(event)}
          disabled={props.isDisabled}
        >
          CREATE
        </Button>
      </Drawer>
    </div>
  );
};

CreateCampaign.propTypes = {
  createCampaign: PropTypes.bool.isRequired,
  handleCreateCampaignButtonClick: PropTypes.func.isRequired,
  campaignDetails: PropTypes.object,
  handleOnChange: PropTypes.func,
  locationList: PropTypes.array,
  isDisabled: PropTypes.bool,
  showSnackBar: PropTypes.bool,
  handleSnackBarExited: PropTypes.func,
  createCampaignEventHandler: PropTypes.func.isRequired,
};
