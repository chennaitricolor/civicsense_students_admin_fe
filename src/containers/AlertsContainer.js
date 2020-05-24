import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MUIDataTable from 'mui-datatables';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import actions from '../actions/getPositiveEntriesForReport';
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

const AlertsContainer = props => {
  const dispatch = useDispatch();
  const getPositiveEntries = useSelector(state => state.getPositiveEntriesForReportReducer);

  useEffect(() => {
    dispatch({
      type: actions.GET_POSITIVE_ENTRIES,
    });
  }, []);

  // campaignName: "Positive Cases"
  // createdAt: "2020-05-24T06:28:56.274Z"
  // createdBy: 9003593601
  // description: "To get the positive cases"
  // endDate: "2021-01-30T00:00:00.000Z"
  // formFields: [{data: [], label: "Name", type: "string", isRequired: true},…]
  // 0: {data: [], label: "Name", type: "string", isRequired: true}
  // 1: {data: [], label: "Age", type: "string", isRequired: true}
  // 2: {data: [], label: "Oxygen Level", type: "number", isRequired: true}
  // 3: {data: [], label: "Pulse", type: "number", isRequired: true}
  // 4: {data: [], label: "Temperature", type: "number", isRequired: true}
  // 5: {data: [], label: "Respiratory Rate", type: "number", isRequired: true}
  // locationIds: ["5e88490f1f1a8c0011245192"]
  // needForm: true
  // noOfEntries: 3
  // rewards: 50
  // rules: "Post the cases"
  // startDate: "2020-05-24T00:00:00.000Z"
  // updatedAt: "2020-05-24T12:00:57.080Z"
  // __v: 0
  // _id: "5eca14287543c90011642d86"
  // campaignId: "5eca14287543c90011642d86"
  // createdAt: "2020-05-24T07:46:45.042Z"

  const headerNames = rowDetails => {
    let header = [];
    rowDetails.forEach(row => {
      header.push({ name: row.label, download: true });
    });
    return header;
  };

  const options = {
    filterType: 'dropdown',
    searchText: '',
    selectableRows: 'none',
    downloadOptions: {
      filename: 'CSR_AgentX_Reports.csv',
      filterOptions: {
        useDisplayedColumnsOnly: false,
        useDisplayedRowsOnly: true,
      },
    },
    onDownload: (buildHead, buildBody, columns, data) => buildHead(headerNames(columns)) + buildBody(data),
  };

  const columns = rowDetails => {
    let column = [];
    column.push({ label: 'Photo URL', name: 'photoUrl', options: { filter: false, sort: false } });
    column.push({ label: 'Campaign Name', name: 'campaignName' });
    column.push({ label: 'Location Name', name: 'locationName' });
    column.push({
      label: 'Contact Phone',
      name: 'userId',
      options: {
        filter: false,
      },
    });
    column.push({ label: 'Name', name: 'Name' });
    column.push({ label: 'Age', name: 'Age' });
    column.push({ label: 'Temperature', name: 'Temperature' });
    column.push({ label: 'Oxygen Level', name: 'Oxygen Level' });
    column.push({ label: 'Pulse', name: 'Pulse' });
    column.push({ label: 'Respiratory Rate', name: 'Respiratory Rate' });
    column.push({ label: 'Indicator', name: 'indicator' });
    return column;
  };

  const getDataTable = positiveEntries => {
    let resultData = [];
    positiveEntries.forEach(entry => {
      let rowData;
      let photoUrl = (
        <a
          href={'/'}
          onClick={() => {
            window.location = `${getImageUrl + entry.photoId}`;
          }}
          target={'_blank'}
        >
          {entry.photoId}
        </a>
      );
      rowData = {
        photoUrl: photoUrl,
        campaignName: entry.campaign.campaignName,
        locationName: entry.locationNm,
        userId: entry.userId !== undefined && entry.userId !== '' ? entry.userId : 'NA',
      };
      if (entry.formData !== undefined) {
        Object.keys(entry.formData).forEach(form => {
          rowData = Object.assign(
            {
              [form]: entry.formData[form],
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
            title={'Positive Entries'}
            data={resultData}
            columns={columns(positiveEntries)}
            options={options}
          />
        </div>
      </MuiThemeProvider>
    );
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

  const getElementsToRender = () => {
    if (getPositiveEntries !== undefined) {
      if (getPositiveEntries.positiveDetailsError !== undefined && getPositiveEntries.positiveDetailsError !== null) {
        return showToastMessage('Error while retrieving report entries. Please try later..', 'error');
      } else if (getPositiveEntries.positiveDetails !== undefined && getPositiveEntries.positiveDetails !== null) {
        return getDataTable(getPositiveEntries.positiveDetails);
      } else {
        return <div />;
      }
    }
  };

  return getElementsToRender();
};

export default AlertsContainer;
