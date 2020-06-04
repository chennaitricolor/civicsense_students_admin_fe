import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MUIDataTable from 'mui-datatables';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import actions from '../actions/getAllEntriesForReport';
import LoadingComponent from '../components/LoadingComponent';
import ToastComponent from '../components/ToastComponent';
import toastActions from '../actions/toastActions';
import * as PropTypes from 'prop-types';
import { getImageUrl } from '../utils/constants';

const loadingComponentStyle = {
  top: '40%',
  position: 'absolute',
  left: '42%',
  color: '#0084FF',
  width: '50px',
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
  const getAcceptedEntries = useSelector(state => state.getAllEntriesForReportReducer);
  const getAllCampaignsResponse = useSelector(state => state.getAllCampaignsResponse);

  useEffect(() => {
    dispatch({
      type: actions.GET_ALL_ENTRIES,
    });
  }, []);

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

  const changePage = page => {
    const acceptedEntries = getAcceptedEntries && getAcceptedEntries.reportDetails;
    const lastAcceptedEntry =
      acceptedEntries !== '' && acceptedEntries.length > 0 ? acceptedEntries[acceptedEntries.length - 1] : '';
    const lastRecordCreatedAtParamValue = lastAcceptedEntry !== '' ? lastAcceptedEntry.createdAt : '';
    dispatch({
      type: actions.GET_ACCEPTED_ENTRIES,
      payload: { lastRecordCreatedAt: lastRecordCreatedAtParamValue, applyLimit: false, campaignId: '' },
    });
  };

  const options = {
    filterType: 'dropdown',
    searchText: '',
    selectableRows: 'none',
    downloadOptions: {
      filename: 'Reports.csv',
      filterOptions: {
        useDisplayedColumnsOnly: false,
        useDisplayedRowsOnly: true,
      },
    },
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
            title={'Accepted Campaign Entries'}
            data={resultData}
            columns={columns(reportDetails)}
            options={options}
          />
        </div>
      </MuiThemeProvider>
    );
  };

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

  return getElementsToRender();
};

ReportsContainer.propTypes = {
  liveCampaigns: PropTypes.array.isRequired,
};

export default ReportsContainer;
