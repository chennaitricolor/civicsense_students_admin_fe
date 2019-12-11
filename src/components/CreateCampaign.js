import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { DatePicker } from '@material-ui/pickers';
import AutoCompleteDropdown from './AutoCompleteDropdown';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  createCampaignHeader: {
    padding: '2% 0 5% 2%',
    color: '#707070',
    fontSize: '24px',
  },
  textField: {
    marginLeft: '2%',
    marginRight: '2%',

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
    marginTop: '6%',
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
  dropDownDiv: {
    position: 'relative',
  },
  dropDownLabel: {
    margin: '3% 2% 2% 2%',
    fontSize: '20px',
    display: 'block',
    position: 'absolute',
    transform: 'translate(0, 1.5px) scale(0.75)',
    transformOrigin: 'top left',
    color: 'rgba(0, 0, 0, 0.54)',
  },
  campaignMessageSnackBar: {
    '& div': {
      backgroundColor: '#0084FF',
      borderRadius: '10px',
    },
  },
  '@global': {
    '.Select-placeholder': {
      fontSize: '20px',
      fontStyle: 'Italic',
      color: '#707070',
    },
    '.Select-multi-value-wrapper': {
      fontSize: '20px',
    },
  },
}));

const matchStyle = {
  width: '96%%',
  margin: '2%',
  paddingTop: '6%',
};

const dropDownValues = ['Adyar', 'Alandur', 'Ambattur'];

export const CreateCampaign = props => {
  const styles = useStyles();
  return (
    <div>
      <Drawer anchor="right" open={props.createCampaign} onClose={props.handleCreateCampaignButtonClick}>
        <Typography className={styles.createCampaignHeader}>Create Campaign</Typography>
        <TextField
          className={'create-campaign-campaign-name ' + styles.textField}
          label={'Campaign Name'}
          id={'campaignName'}
          value={props.campaignDetails.campaignName}
          onChange={event => props.handleOnChange(event, 'campaignName', 'text')}
          autoComplete="off"
          margin={'normal'}
          variant={'outlined'}
        />
        <DatePicker
          className={'create-campaign-start-date-mui-pickers ' + styles.datePicker}
          key={'create-campaign-start-date-mui-pickers-key'}
          id={'create-campaign-start-date-mui-pickers'}
          label={'Start Date'}
          value={props.campaignDetails.campaignStartDate}
          onChange={date => props.handleOnChange(date, 'campaignStartDate', 'date')}
          placeholder="MM/DD/YYYY"
          format={'MM/DD/YYYY'}
          inputVariant="outlined"
          clearable
        />
        <DatePicker
          className={'create-campaign-end-date-mui-pickers ' + styles.datePicker}
          key={'create-campaign-end-date-mui-pickers-key'}
          id={'create-campaign-end-date-mui-pickers'}
          label={'End Date'}
          value={props.campaignDetails.campaignEndDate}
          onChange={date => props.handleOnChange(date, 'campaignEndDate', 'date')}
          placeholder="MM/DD/YYYY"
          format={'MM/DD/YYYY'}
          inputVariant="outlined"
          clearable
        />
        <div className={styles.dropDownDiv}>
          {props.campaignDetails.campaignSearchLocation !== '' ? (
            <FormLabel className={styles.dropDownLabel}>Location</FormLabel>
          ) : (
            <div />
          )}
          <AutoCompleteDropdown
            classNameIdentifier={'create-campaign-dropdown'}
            styleContainer={matchStyle}
            id={'searchLocation'}
            handleOnChangeForDropdown={e => props.handleOnChange(e, 'campaignSearchLocation', 'dropdown')}
            value={props.campaignDetails.campaignSearchLocation}
            dropDownList={dropDownValues}
            placeholder={'Search Location'}
          />
        </div>
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
      <Snackbar
        className={styles.campaignMessageSnackBar}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
          left: '50%',
        }}
        open={props.showSnackBar}
        autoHideDuration={5000}
        onClose={props.handleSnackBarExited}
        onExited={props.handleSnackBarExited}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">Campaign Created Successfully</span>}
        action={
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            className={'campaign-message-snack-bar-close-icon'}
            onClick={props.handleSnackBarExited}
          >
            <CloseIcon />
          </IconButton>
        }
      />
    </div>
  );
};

CreateCampaign.propTypes = {
  createCampaign: PropTypes.bool.isRequired,
  handleCreateCampaignButtonClick: PropTypes.func.isRequired,
  campaignDetails: PropTypes.object,
  handleOnChange: PropTypes.func,
  isDisabled: PropTypes.bool,
  showSnackBar: PropTypes.bool,
  handleSnackBarExited: PropTypes.func,
  createCampaignEventHandler: PropTypes.func.isRequired,
};
