import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { DatePicker } from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Autocomplete from '@material-ui/lab/Autocomplete';
import jsonPath from 'jsonpath-plus';
import CloseIcon from '@material-ui/icons/Close';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import { personasList } from '../utils/constants';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const useStyles = makeStyles(theme => ({
  createCampaignHeader: {
    padding: '2% 0 0% 2%',
    color: '#707070',
    fontSize: '24px',
  },
  textField: {
    marginLeft: '2%',
    marginRight: '2%',
    marginTop: '3%',

    '& label': {
      color: '#707070 !important',
      fontSize: '16px',
    },

    '& fieldset': {
      border: '1px solid #707070 !important',
    },
  },
  datePicker: {
    margin: '2%',
    marginTop: '3%',
    width: '46% !important',

    '& label': {
      color: '#707070 !important',
      fontSize: '16px',
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
      fontSize: '16px',
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
    marginTop: '3%',
  },
  dynamicFields: {
    border: '1px solid #707070',
    margin: '2%',
    marginBottom: '5%',
  },
  '@global': {
    '.create-campaign-rules': {
      width: '46%',
    },
    '.create-campaign-rewards': {
      width: '46%',
    },
    '.create-campaign-form-dynamic-fields-label': {
      width: '46%',
      marginTop: '5%',
    },
    '.create-campaign-form-dynamic-fields-data': {
      width: '96%',
      marginTop: '5%',
    },
  },
}));

const matchStyle = {
  width: '96%',
  margin: '2%',
  marginTop: '3%',
};

const matchStyleForDynamicField = {
  width: '46%',
  margin: '2%',
  marginTop: '5%',
  display: 'inline-block',
};

const typeList = ['dropdown', 'number', 'string'];

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

function renderTextFieldForDynamicFields(idx, label, key, handleChangeForDynamicFields, type, styles) {
  return (
    <TextField
      className={'create-campaign-form-dynamic-fields-' + key + ' ' + styles.textField}
      label={label}
      id={key}
      onChange={e => handleChangeForDynamicFields(idx, e, type, key)}
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

function renderMultiSelectInput(label, key, dropdownList, handleOnChange, styles, matchStyle) {
  return (
    <Autocomplete
      id={key}
      className={`create-campaign-${key} ${styles.label}`}
      multiple
      style={matchStyle}
      options={dropdownList !== undefined ? dropdownList : []}
      loadingText={'Loading'}
      disableCloseOnSelect
      classes={{
        option: styles.option,
      }}
      getOptionLabel={option => option}
      renderOption={(option, { selected }) => (
        <>
          <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
          {option}
        </>
      )}
      onChange={(event, value) => handleOnChange(value, key, 'multiselect')}
      renderInput={params => <TextField {...params} variant="outlined" label={label} />}
    />
  );
}

function renderDropDownField(label, key, dropdownList, handleOnChange, styles, idx, matchStyle) {
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
      <Drawer anchor="right" open={props.createCampaign} onClose={props.handleSnackBarExited}>
        <Typography className={styles.createCampaignHeader}>Create Campaign</Typography>
        {renderTextField('Campaign Name', 'campaignName', props.campaignDetails, props.handleOnChange, styles)}
        {renderTextField('Description', 'description', props.campaignDetails, props.handleOnChange, styles)}
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
        <div>
          {renderTextField('Rules', 'rules', props.campaignDetails, props.handleOnChange, styles)}
          {renderTextField('Rewards', 'rewards', props.campaignDetails, props.handleOnChange, styles)}
        </div>
        <div className={styles.newFieldsDiv}>
          <FormControlLabel
            style={{
              marginLeft: '1%',
              color: '#707070',
            }}
            labelPlacement="start"
            control={
              <Switch
                checked={props.campaignDetails.needMedia}
                onChange={event => props.handleOnChange(event, 'needMedia', 'checkbox')}
                name="needMedia"
              />
            }
            label="Enable Media"
          />
        </div>
        {renderMultiSelectInput(
          'Applicable Personas',
          'personas',
          personasList,
          props.handleOnChange,
          styles,
          matchStyle,
        )}
        <div className={styles.newFieldsDiv}>
          <FormControlLabel
            style={{
              marginLeft: '1%',
              color: '#707070',
            }}
            labelPlacement="start"
            control={
              <Switch
                checked={props.campaignDetails.needForm}
                onChange={event => props.handleOnChange(event, 'needForm', 'checkbox')}
                name="needForm"
              />
            }
            label="Enable Form"
          />
          {props.campaignDetails.needForm ? (
            <div style={{ display: 'inline-block', float: 'right' }}>
              <Button variant="contained" style={{ display: 'inline-block' }} onClick={() => props.handleAdd()}>
                + Add new field
              </Button>
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
                  {renderTextFieldForDynamicFields(
                    idx,
                    'Enter Field Label',
                    'label',
                    props.handleChangeForDynamicFields,
                    'text',
                    styles,
                  )}
                  {renderDropDownField(
                    'Enter Field Type',
                    'type',
                    typeList,
                    props.handleChangeForDynamicFields,
                    styles,
                    idx,
                    matchStyleForDynamicField,
                  )}
                  {field.type === 'dropdown'
                    ? renderTextFieldForDynamicFields(
                        idx,
                        'Enter Dropdown Values',
                        'data',
                        props.handleChangeForDynamicFields,
                        'dropdownData',
                        styles,
                      )
                    : ''}

                  <div>
                    <FormLabel style={{ float: 'left', margin: '3%' }} component="legend">
                      Required Field?
                    </FormLabel>
                    <RadioGroup
                      style={{ display: 'inline-block' }}
                      aria-label="requiredField"
                      name="requiredField"
                      value={field.isRequired ? 'yes' : 'no'}
                      onChange={e => props.handleChangeForDynamicFields(idx, e, 'radio', 'isRequired')}
                    >
                      <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                      <FormControlLabel value="no" control={<Radio />} label="No" />
                    </RadioGroup>
                    <Button
                      variant="outlined"
                      style={{ border: 'none', color: 'red', float: 'right', padding: '0', marginTop: '2%' }}
                      onClick={() => props.handleRemove(idx)}
                    >
                      <CloseIcon />
                    </Button>
                  </div>
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
