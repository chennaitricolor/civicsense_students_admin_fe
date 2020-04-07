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
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

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
    width: '46% !important',

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
  newFieldsDiv: {
    margin: '2%',
    marginTop: '5%',
  },
  dynamicFields: {
    border: '2px solid #707070',
    margin: '2%',
  },
}));

const matchStyle = {
  width: '46%',
  margin: '2%',
  paddingTop: '5%',
};

const typeList = ['string', 'number', 'dropdown'];

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

function renderDropDownField(label, key, dropdownList, handleOnChange, styles, idx) {
  return (
    <Autocomplete
      className={'create-campaign-' + key + ' ' + styles.label}
      id={key}
      style={matchStyle}
      options={dropdownList !== undefined ? dropdownList : []}
      loadingText={'Loading'}
      classes={{
        option: styles.option,
      }}
      getOptionLabel={option => (option.label !== undefined ? option.label : option)}
      onChange={(event, value) => handleOnChange(idx, value, 'dropdown', key)}
      renderInput={params => (
        <TextField
          {...params}
          label={label}
          variant={'outlined'}
          fullWidth
          inputProps={{
            ...params.inputProps,
            autoComplete: 'off',
          }}
        />
      )}
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
        <div>
          {renderDateField('Start Date', 'campaignStartDate', props.campaignDetails, props.handleOnChange, styles)}
          {renderDateField('End Date', 'campaignEndDate', props.campaignDetails, props.handleOnChange, styles)}
        </div>
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
                autoComplete: 'off',
              }}
            />
          )}
        />
        {renderTextField('Description', 'description', props.campaignDetails, props.handleOnChange, styles)}
        <div>
          {renderTextField('Rules', 'rules', props.campaignDetails, props.handleOnChange, styles)}
          {renderTextField('Rewards', 'rewards', props.campaignDetails, props.handleOnChange, styles)}
        </div>
        <div className={styles.newFieldsDiv}>
          <FormControlLabel
            style={{
              width: '30%',
            }}
            control={
              <Checkbox
                checked={props.campaignDetails.needForm}
                onChange={event => props.handleOnChange(event, 'needForm', 'checkbox')}
                name="needForm"
              />
            }
            label="Need Form"
          />
          {props.campaignDetails.needForm ? (
            <div style={{ display: 'inline-block', width: '60%' }}>
              <Button variant="contained" style={{ display: 'inline-block' }} onClick={() => props.handleAdd()}>
                <AddIcon />
              </Button>
              <Typography style={{ display: 'inline-block', marginLeft: '2%' }}>Add New Field(s)</Typography>
            </div>
          ) : (
            ''
          )}
        </div>
        {props.campaignDetails.needForm ? (
          <div>
            {props.fields.map((field, idx) => {
              return (
                <div key={`${field}-${idx}`} className={styles.dynamicFields}>
                  <TextField
                    className={'create-campaign-form-dynamic-fields' + ' ' + styles.textField}
                    label={'Enter Label'}
                    id={'label'}
                    onChange={e => props.handleChangeForDynamicFields(idx, e, 'text', 'label')}
                    autoComplete="off"
                    margin={'normal'}
                    variant={'outlined'}
                  />
                  {renderDropDownField('Enter Type', 'type', typeList, props.handleChangeForDynamicFields, styles, idx)}
                  {field.type === 'dropdown' ? (
                    <TextField
                      className={'create-campaign-form-dynamic-fields' + ' ' + styles.textField}
                      label={'Enter Dropdown Values'}
                      id={'data'}
                      onChange={e => props.handleChangeForDynamicFields(idx, e, 'dropdownData', 'data')}
                      autoComplete="off"
                      margin={'normal'}
                      variant={'outlined'}
                    />
                  ) : (
                    ''
                  )}
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={field.isRequired}
                        onChange={event => props.handleChangeForDynamicFields(idx, event, 'checkbox', 'isRequired')}
                        name="isRequired"
                      />
                    }
                    label="Required"
                  />
                  <Button variant="contained" onClick={() => props.handleRemove(idx)}>
                    <CloseIcon />
                  </Button>
                </div>
              );
            })}
          </div>
        ) : (
          ''
        )}
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
  handleAdd: PropTypes.func,
  handleRemove: PropTypes.func,
  handleChangeForDynamicFields: PropTypes.func,
  fields: PropTypes.string,
  showSnackBar: PropTypes.bool,
  handleSnackBarExited: PropTypes.func,
  createCampaignEventHandler: PropTypes.func.isRequired,
};
