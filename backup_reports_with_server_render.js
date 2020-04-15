import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import actions from "../actions/getAcceptedEntriesForReport";
import LoadingComponent from '../components/LoadingComponent';
import ToastComponent from "../components/ToastComponent";
import toastActions from "../actions/toastActions";
import * as PropTypes from "prop-types";
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
                margin: '5%'
            }
        }
    }
});

export const ReportsContainer = props => {
    const dispatch = useDispatch();
    const getAcceptedEntries = useSelector(state => state.getAcceptedEntriesForReport);
    const getAllCampaignsResponse = useSelector(state => state.getAllCampaignsResponse);

    useEffect(() => {
        dispatch({
            type: actions.GET_ACCEPTED_ENTRIES,
            payload: {lastRecordCreatedAt: '', applyLimit: true}
        });
    }, []);

    const columns = [{name: "Photo URL", options: { filter: false, sort: false}}, "Campaign Name", "Location Name", "Contact Phone", {name: "Image Full URL", options: { display: false}},
        {name: "Latitude", options: { display: false}},
        {name: "Longitude", options: { display: false}}];

    const headerNames = [
        {
            name: 'Image',
            download: true,
        },
        {
            name: 'Campaign Name',
            download: true,
        },
        {
            name: 'Location Name',
            download: true,
        },
        {
            name: 'Contact Phone',
            download: true,
        },
        {
            name: 'Image Full URL',
            download: true,
        },
        {
            name: 'Latitude',
            download: true,
        },
        {
            name: 'Longitude',
            download: true,
        },
    ];

    const changePage = (page) => {
        const acceptedEntries = getAcceptedEntries && getAcceptedEntries.reportDetails;
        const lastAcceptedEntry = acceptedEntries !== '' && acceptedEntries.length > 0 ? acceptedEntries[acceptedEntries.length-1] : '';
        const lastRecordCreatedAtParamValue = lastAcceptedEntry !== '' ? lastAcceptedEntry.createdAt : '';
        dispatch({
            type: actions.GET_ACCEPTED_ENTRIES,
            payload: {lastRecordCreatedAt: lastRecordCreatedAtParamValue, applyLimit: true}
        });

    };

    const options = {
        filterType: 'dropdown',
        searchText: '',
        selectableRows: 'none',
        count: 7,
        rowsPerPage: 2,
        serverSide: true,
        rowsPerPageOptions: [2],
        downloadOptions: {
            filename: 'Reports.csv',
            filterOptions: {
                useDisplayedColumnsOnly: false,
                useDisplayedRowsOnly: true
            }
        },
        onDownload: (buildHead, buildBody, columns, data) =>
            buildHead(headerNames) +
            buildBody(
                data
            ),
        onTableChange: (action, tableState) => {

            console.log(action, tableState);
            // a developer could react to change on an action basis or
            // examine the state as a whole and do whatever they want

            switch (action) {
                case 'changePage':
                    changePage(tableState.page);
                    break;
            }
        }

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

    const getDataTable = (reportDetails) => {
        /*const liveCampaignIds = props.liveCampaigns.campaignDetails !== undefined && props.liveCampaigns.campaignDetails !== '' ? props.liveCampaigns.campaignDetails.map(
            campaign => campaign._id
        ) : [];
        let liveCampaignMap = new Map();
        if(props.liveCampaigns.campaignDetails !== undefined && props.liveCampaigns.campaignDetails !== '' ) {
            props.liveCampaigns.campaignDetails.forEach(cd => {
                liveCampaignMap.set(cd._id, cd.campaignName);
            }) ;
        }*/
        let resultData = [];

       // const liveCampaignReports = reportDetails.filter( report => liveCampaignIds.includes(report.campaignId));
        reportDetails.forEach(lc => {
            let rowData = [];
            let photoUrl = <a href='/' onClick={() => { window.location = `${getImageUrl + lc.photoId}`}} target="_blank">{lc.photoId}</a>;
            rowData.push(photoUrl);
            rowData.push(lc.campaign.campaignName);
            rowData.push(lc.locationNm);
            rowData.push(lc.userId !== undefined && lc.userId !== '' ? lc.userId :'NA');
            rowData.push(process.env.AGENT_ADMIN_API_URL || 'http://52.66.148.41' + `${getImageUrl + lc.photoId}`);
            rowData.push(lc.location.coordinates[1]);
            rowData.push(lc.location.coordinates[0]);
            resultData.push(rowData);
        });
        return (  <MuiThemeProvider theme={muiTheme}>
            <div style={{ margin: '5%'}}>
            <MUIDataTable
            title={"Accepted Campaign Entries"}
            data={resultData}
            columns={columns}
            options={options}
        />
        </div>
        </MuiThemeProvider>);
    };

    const getElementsToRender = () => {
        if(getAcceptedEntries !== undefined) {
            if(getAcceptedEntries.isLoading) {
                return <LoadingComponent isLoading={getAcceptedEntries.isLoading} style={loadingComponentStyle}/>;
            }
            else if(getAcceptedEntries.reportDetailsError !== '' && getAcceptedEntries.reportDetailsError !== undefined) {
                return showToastMessage('Error while retrieving report entries. Please try later..', 'error');
            }
            else if(getAcceptedEntries.reportDetails !== '' && getAcceptedEntries.reportDetails !== undefined) {
                return getDataTable(getAcceptedEntries.reportDetails);
            }
            else {
                return <div />
            }
        }
    };

    return getElementsToRender();

};

ReportsContainer.propTypes = {
    liveCampaigns: PropTypes.array.isRequired,
};


export default ReportsContainer;

