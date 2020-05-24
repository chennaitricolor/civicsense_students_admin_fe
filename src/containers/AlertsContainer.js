import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MUIDataTable from 'mui-datatables';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import actions from '../actions/getPositiveEntriesForReport';
import ToastComponent from '../components/ToastComponent';
import toastActions from '../actions/toastActions';
import { getImageUrl } from '../utils/constants';
import { formatDateFromOneFormatToAnother } from '../utils/helpers/GeneralUtils';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';

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

  const headerNames = rowDetails => {
    let header = [];
    rowDetails.forEach(row => {
      if (row.download) header.push({ name: row.label, download: true });
    });
    return header;
  };

  const options = {
    filterType: 'dropdown',
    searchText: '',
    selectableRows: 'none',
    print: false,
    downloadOptions: {
      filename: 'Positive_Records_Reports.csv',
      filterOptions: {
        useDisplayedColumnsOnly: false,
        useDisplayedRowsOnly: true,
      },
    },
    onDownload: (buildHead, buildBody, columns, data) => buildHead(headerNames(columns)) + buildBody(data),
  };

  const columns = () => {
    let column = [];
    column.push({ label: 'Name', name: 'Name' });
    column.push({ label: 'Age', name: 'Age' });
    column.push({
      label: 'Contact Phone',
      name: 'userId',
      options: {
        filter: false,
      },
    });
    column.push({ label: 'Location Name', name: 'locationName' });
    column.push({
      label: 'Temperature',
      name: 'Temperature',
      options: { filter: false },
    });
    column.push({ label: 'Oxygen Level', name: 'Oxygen Level', options: { filter: false } });
    column.push({ label: 'Pulse', name: 'Pulse', options: { filter: false } });
    column.push({ label: 'Respiratory Rate', name: 'Respiratory Rate', options: { filter: false } });
    column.push({ label: 'Indicator', name: 'indicator', options: { filter: false } });
    column.push({ label: 'Campaign Name', name: 'campaignName' });
    column.push({ label: 'Photo URL', name: 'photoUrl', options: { filter: false, sort: false, download: false } });
    column.push({
      label: 'Submitted On',
      name: 'submittedOn',
      options: {
        filter: true,
        sort: true,
        filterType: 'custom',
        customFilterListRender: v => {
          if (v[0] && v[1]) {
            return `Start Date: ${v[0]}, End Date: ${v[1]}`;
          } else if (v[0]) {
            return `Start Date: ${v[0]}`;
          } else if (v[1]) {
            return `End Date: ${v[1]}`;
          }
          return false;
        },
        filterOptions: {
          names: [],
          logic(date, filters) {
            let convertedDate = formatDateFromOneFormatToAnother(date, 'DD-MM-YYYY HH:mm:ss', 'YYYY-MM-DD');
            let check = new Date(convertedDate);
            let from = new Date(filters[0]);
            let to = new Date(filters[1]);
            from.setDate(from.getDate());
            to.setDate(to.getDate());
            from = new Date(from).setHours(0, 0, 0, 0);
            to = new Date(to).setHours(23, 59, 59, 59);

            if (filters[0] && filters[1] && check >= to && check <= from) {
              return true;
            } else if (filters[0] && check >= to) {
              return true;
            } else if (filters[1] && check <= from) {
              return true;
            }
            return false;
          },
          display: (filterList, onChange, index, column) => (
            <div style={{ marginTop: '2%' }}>
              <FormLabel>Date</FormLabel>
              <FormGroup row>
                <TextField
                  id="startDate"
                  label="From"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  placeholder={'DD/MM/YYYY'}
                  defaultValue={'DD/MM/YYYY'}
                  value={filterList[index][0] || ''}
                  onChange={event => {
                    filterList[index][0] = event.target.value;
                    onChange(filterList[index], index, column);
                  }}
                  style={{ width: '48%', marginRight: '2%', marginTop: '5%' }}
                />
                <TextField
                  id="endDate"
                  label="To"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  placeholder={'DD/MM/YYYY'}
                  defaultValue={'DD/MM/YYYY'}
                  value={filterList[index][1] || ''}
                  onChange={event => {
                    filterList[index][1] = event.target.value;
                    onChange(filterList[index], index, column);
                  }}
                  style={{ width: '48%', marginRight: '2%', marginTop: '5%' }}
                />
              </FormGroup>
            </div>
          ),
        },
        print: false,
      },
    });
    column.push({ label: 'Image Full URL', name: 'imageFullURL', options: { filter: false, display: false } });
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
        imageFullURL: process.env.AGENT_ADMIN_API_URL || 'http://52.66.148.41' + `${getImageUrl + entry.photoId}`,
        submittedOn: formatDateFromOneFormatToAnother(entry.createdAt, 'YYYY-MM-DDTHH:mm:ss', 'DD-MM-YYYY HH:mm:ss'),
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
          <MUIDataTable title={'Positive Entries'} data={resultData} columns={columns()} options={options} />
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
