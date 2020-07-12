import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MUIDataTable from 'mui-datatables';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import actions from '../actions/getAllEntriesForReport';
import LoadingComponent from '../components/LoadingComponent';
import ToastComponent from '../components/ToastComponent';
import toastActions from '../actions/toastActions';
import * as PropTypes from 'prop-types';
import { getImageUrl, reportsFileFromServerUrl } from '../utils/constants';
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from '@material-ui/core/FormControl';
import {InputLabel} from "@material-ui/core";
import MomentUtils from "@date-io/moment";
import {formatDateToDateTime} from "../utils/helpers/GeneralUtils";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';
import GetAppIcon from '@material-ui/icons/GetApp';

const loadingComponentStyle = {
  top: '40%',
  position: 'absolute',
  left: '42%',
  color: '#0084FF',
  width: '50px',
};

const buttonStyle = {
      //margin: '5% 0% 10% 2%',
      fontSize: '20px',
      width: '10%',
      //bottom: '0',
};

const downloadReportButtonStyle = {
  fontSize: '1.1rem',
  color: '#0084FF',
  borderRadius: '0'
};

const isDisabledDownload  = {
  cursor: 'not-allowed',
  opacity: '0.5',
}

const datePickerStyle = {
  marginTop: '20%',
  '& label': {
    color: '#707070 !important',
    fontSize: '20px',
  },
  '&& fieldset': {
    border: '1px solid #707070 !important',
  },
};

const muiTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: ['Sans-serif'].join(','),
    font: {
      color: '#333940',
    },
  },
  root: {
    color: '#333940',
  },
  palette: {
    tertiary: { main: '#004261' },
    secondary: { main: '#fcfcfc' },
    primary: { main: '#0084FF' },
    background: { default: '#fcfcfc' },
    error: { main: '#E10C32' },
    success: { main: '#00AB84' },
    buttonColor: { main: '#0099ff' },
  },
  overrides: {
    MUIDataTableBodyCell: {
      root: {
        margin: '5%',
      },
    },
  },
});

export const ReportsContainer = props => {
  const dispatch = useDispatch();
  const [zoneName, setZoneName] = useState('');
  const [campaignName, setCampaignName] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const getAcceptedEntries = useSelector(state => state.getAllEntriesForReportReducer);
  const getAllCampaignsResponse = useSelector(state => state.getAllCampaignsResponse);
  const allZonesList = useSelector(state => state.fetchLocationListReducer);
  const loginRegion = useSelector(state => state.loginResponse.region) || localStorage.getItem('region');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [downloadButtonDisabled, setDownloadButtonDisabled] = useState(true);

  useEffect(() => {
    dispatch({
      type: actions.CLEAR_ALL_ENTRIES,
    });
  }, [dispatch]);

  const columns = rowDetails => {
    let column = [];

    column.push({ label: 'Photo URL', name: 'photoUrl', options: { filter: false, sort: false } });
    column.push({ label: 'Campaign Name', name: 'campaignName' });
    column.push({ label: 'Status', name: 'status' });
    column.push({ label: 'Location Name', name: 'locationName' });
    column.push({
      label: 'Contact Phone',
      name: 'userId',
      options: {
        filter: false,
      },
    });
    column.push({ label: 'Image Full URL', name: 'imageFullURL', options: { filter: false, display: false } });
    column.push({ label: 'Latitude', name: 'latitude', options: { filter: false, display: false } });
    column.push({ label: 'Longitude', name: 'longitude', options: { filter: false, display: false } });

    rowDetails.forEach(row => {
      if (row.formData !== undefined) {
        Object.keys(row.formData).forEach(form => {
          column.push({ name: form, options: { filter: false, display: false } });
        });
      }
    });

    let uniqueArray = [];
    let uniqueObject = {};
    for (let i in column) {
      let objTitle = column[i]['name'];
      uniqueObject[objTitle] = column[i];
    }

    for (let i in uniqueObject) {
      uniqueArray.push(uniqueObject[i]);
    }

    return uniqueArray;
  };

  const headerNames = rowDetails => {
    let header = [];

    rowDetails.forEach(row => {
      header.push({ name: row.label, download: true });
    });

    return header;
  };

  const getReportsFileName = () => {
    return zoneName+ '_' + selectedDate + '.csv';
  };

  const options = {
    filterType: 'dropdown',
    searchText: '',
    selectableRows: 'none',
    download: false,
    /*downloadOptions: {
      filename: getReportsFileName(),
      filterOptions: {
        useDisplayedColumnsOnly: false,
        useDisplayedRowsOnly: true,
      },
    },*/
    onDownload: (buildHead, buildBody, columns, data) => buildHead(headerNames(columns)) + buildBody(data),
  };


  const handleToastClose = () => {
    dispatch({
      type: toastActions.CLOSE_NOTIFICATION_DIALOG_OR_TOAST_MESSAGE,
    });
  };

  const showToastMessage = (message, toastVariant) => {
    return (
      <ToastComponent
        handleClose={handleToastClose}
        openToast={true}
        toastMessage={message}
        toastVariant={toastVariant}
      />
    );
  };

  const handleZoneSelectionChange = (event) => {
    setZoneName(event.target.value);
    const isAllZones = event.target.value.toLowerCase() === loginRegion.toLowerCase() || event.target.value.toLowerCase() === 'tamil nadu';
    setDownloadButtonDisabled(selectedDate === '' || event.target.value === '' || event.target.value === undefined || event.target.value === null || selectedDate === null || campaignName === '');
    setButtonDisabled(selectedDate === '' || event.target.value === '' || event.target.value === undefined || event.target.value === null || selectedDate === null || isAllZones || campaignName === '');
    dispatch({
      type: actions.CLEAR_ALL_ENTRIES,
    });
  };

  const handleCampaignSelectionChange = (event) => {
    setCampaignName(event.target.value);
    const isAllZones = zoneName === loginRegion || zoneName === 'Tamil Nadu';
    setDownloadButtonDisabled(selectedDate === '' || event.target.value === undefined || event.target.value === null || event.target.value.trim() === '' || selectedDate === null || zoneName === '');
    setButtonDisabled(selectedDate === '' || event.target.value === undefined || event.target.value === null || event.target.value.trim() === '' || selectedDate === null || zoneName === '' || isAllZones);
    dispatch({
      type: actions.CLEAR_ALL_ENTRIES,
    });
  };

  const handleGetReportsButtonClick = () => {
    const dateObject = new Date(selectedDate);
    const dateString = dateObject !== null ? dateObject.getFullYear() + '-' + str_pad(dateObject.getMonth() + 1) + '-' + str_pad(dateObject.getDate()) : '';
    const finalString =  dateString !== '' ? dateString + 'T00:00:00.000Z' : null;
    dispatch({
      type: actions.GET_ALL_ENTRIES,
      payload: {
        locationNm: zoneName,
        lastRecordCreatedAt: finalString,
        campaignId: campaignName
      }
    });
  };

  const getCampaignsList = () => {
    const allCampaignsObject = getAllCampaignsResponse && getAllCampaignsResponse.liveCampaigns && getAllCampaignsResponse.liveCampaigns.campaigns ? getAllCampaignsResponse.liveCampaigns.campaigns : [];
    return allCampaignsObject[0] ? allCampaignsObject[0].campaigns : [];
  };

  const getDataTable = reportDetails => {
    // const liveCampaignIds =
    //   props.liveCampaigns.campaignDetails !== undefined && props.liveCampaigns.campaignDetails !== ''
    //     ? props.liveCampaigns.campaignDetails.map(campaign => campaign._id)
    //     : [];
    // let liveCampaignMap = new Map();
    // if (props.liveCampaigns.campaignDetails !== undefined && props.liveCampaigns.campaignDetails !== '') {
    //   props.liveCampaigns.campaignDetails.forEach(cd => {
    //     liveCampaignMap.set(cd._id, cd.campaignName);
    //   });
    // }
    let resultData = [];
    // const liveCampaignReports = reportDetails.filter( report => liveCampaignIds.includes(report.campaignId));
    reportDetails.forEach(lc => {
      let rowData;
      let photoUrl = (
        <a
          href="/"
          onClick={() => {
            window.location = `${getImageUrl + lc.photoId}`;
          }}
          target="_blank"
        >
          {lc.photoId}
        </a>
      );
      rowData = {
        photoUrl: photoUrl,
        campaignName: lc.campaign.campaignName,
        status: lc.status,
        locationName: lc.locationNm,
        userId: lc.userId !== undefined && lc.userId !== '' ? lc.userId : 'NA',
        imageFullURL: process.env.AGENT_ADMIN_API_URL || 'http://52.66.148.41' + `${getImageUrl + lc.photoId}`,
        latitude: lc.location.coordinates[1],
        longitude: lc.location.coordinates[0],
      };
      if (lc.formData !== undefined) {
        Object.keys(lc.formData).forEach(form => {
          rowData = Object.assign(
            {
              [form]: lc.formData[form],
            },
            rowData,
          );
        });
      }
      resultData.push(rowData);
    });

    return (
      <MuiThemeProvider theme={muiTheme}>
        <div style={{ margin: '5%' }}>
          <MUIDataTable
            title={'Campaign Entries'}
            data={resultData}
            columns={columns(reportDetails)}
            options={options}
          />
        </div>
      </MuiThemeProvider>
    );
  };

  const  str_pad = (n) => {
    return String("00" + n).slice(-2);
  }

  const handleDateChange = date => {
    const dateValue = date !== null ? formatDateToDateTime(new Date(date.valueOf()), 'YYYY-MM-DD', 'YYYY-MM-DD[T]HH:mm:ss.SSS') : null;
    setSelectedDate(dateValue);
    const isAllZones = zoneName === loginRegion || zoneName === 'Tamil Nadu';
    setDownloadButtonDisabled(date === '' || zoneName === '' || date === null || dateValue === 'Invalid date' || campaignName === '');
    setButtonDisabled(date === '' || zoneName === '' || date === null || dateValue === 'Invalid date' || isAllZones || campaignName === '');
    dispatch({
      type: actions.CLEAR_ALL_ENTRIES,
    });
  };

  const downloadReportsFullUrl = () => {
    const dateObject = new Date(selectedDate);
    const dateString = dateObject !== null ? dateObject.getFullYear() + '-' + str_pad(dateObject.getMonth() + 1) + '-' + str_pad(dateObject.getDate()) : '';
    const finalString =  dateString !== '' ? dateString + 'T00:00:00.000Z' : null;
    const zoneFinalName = zoneName.toLowerCase() === loginRegion.toLowerCase() || zoneName.toLowerCase() === 'tamil nadu' ? '' : zoneName;
    const zoneParam = zoneFinalName !== '' ? 'locationNm='+zoneFinalName : '';
    let queryParams = '&campaignId=' + campaignName + '&lastRecordCreatedAt=' + finalString;
    if(zoneParam !== '') {
      queryParams = queryParams + '&' + zoneParam;
    }
    return reportsFileFromServerUrl + queryParams;

  }

  const getElementsToRender = () => {
    if (getAcceptedEntries !== undefined) {
      if (getAcceptedEntries.isLoading) {
        return <LoadingComponent isLoading={getAcceptedEntries.isLoading} style={loadingComponentStyle} />;
      } else if (getAcceptedEntries.reportDetailsError !== '' && getAcceptedEntries.reportDetailsError !== undefined) {
        return showToastMessage('Error while retrieving report entries. Please try later..', 'error');
      } else if (getAcceptedEntries.reportDetails !== '' && getAcceptedEntries.reportDetails !== undefined) {
        return getDataTable(getAcceptedEntries.reportDetails);
      } else {
        return <div />;
      }
    }
  };
  return (  <div style={{ height: '100%', overflow: 'scroll' }}>
      <div style={{ display: 'flex', flexDirection: 'row', margin: '5%', justifyContent: 'space-around'}}>
        <FormControl>
          <InputLabel id='zone-name-list'>Select a Zone</InputLabel>
    <Select
        labelId="zone-name-list"
        id="zone-name-list"
        value={zoneName}
        onChange={handleZoneSelectionChange}
        style={{ width: '200px' }}
    >
      {allZonesList &&
      allZonesList.locationList &&
      allZonesList.locationList.map(value => {
        return <MenuItem value={value.label}>{value.label}</MenuItem>;
      })}
    </Select>
        </FormControl>
        <FormControl>
          <InputLabel id='campaign-name-list'>Select a Campaign</InputLabel>
          <Select
              labelId="campaign-name-list"
              id="campaign-name-list"
              value={campaignName}
              onChange={handleCampaignSelectionChange}
              style={{ width: '200px' }}
          >
            {getCampaignsList().map(value => {
              return <MenuItem value={value._id}>{value.campaignName}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <KeyboardDatePicker
              id="date-picker-dialog"
              label="Pick a date"
              format="YYYY-MM-DD"
              value={selectedDate}
              onChange={handleDateChange}
          />
        </MuiPickersUtilsProvider>
        <Button
            id={'agent-x-sign-in-button'}
            variant="contained"
            className={buttonStyle}
            onClick={handleGetReportsButtonClick}
            disabled={buttonDisabled}
        >
          Get Report
        </Button>
        <a href={downloadReportsFullUrl()} target="_blank" rel="noopener noreferrer" style={downloadButtonDisabled ? isDisabledDownload : {}} download={getReportsFileName()}>
          <IconButton
                  style={downloadReportButtonStyle}
          disabled={downloadButtonDisabled}>
            <GetAppIcon />
            Download Report
          </IconButton>
        </a>
  </div>
    { getElementsToRender()}
  </div>)
};

ReportsContainer.propTypes = {
  liveCampaigns: PropTypes.array.isRequired,
};

export default ReportsContainer;
