import * as PropTypes from 'prop-types';
import {useDispatch} from "react-redux";
import actions from "../actions/getAcceptedEntriesForReport";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { DatePicker } from '@material-ui/pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import MomentUtils from '@date-io/moment';
import { formatDateToMMDDYYYYFormat } from '../utils/helpers/GeneralUtils';
import {MapWrappedComponent} from "../components/MapComponent";
import React, {useState} from "react";

const  useStyle = makeStyles(theme => ({
    datepickerStyle : {
        marginTop: '20%',
        '& label': {
            color: '#707070 !important',
            fontSize: '20px',
        },
        '&& fieldset': {
            border: '1px solid #707070 !important',
        }
    }
}));

export const  MapContainer = (props) => {
    const style = useStyle();
    const [campaignId, setCampaignId] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const { campaignDetails } = props;
    const dispatch = useDispatch();

    const handleChange = event => {
        setCampaignId(event.target.value);
        if(campaignId !== event.target.value) {
            dispatch({
                type: actions.GET_ACCEPTED_ENTRIES,
                payload: {lastRecordCreatedAt: '', applyLimit: false, campaignId: event.target.value}
            });
        }
    };

    const handleDateChange = (date) => {
        const dateValue = date !== null ? formatDateToMMDDYYYYFormat(new Date(date.valueOf())) : null;
        setSelectedDate(dateValue);
    };

    return (
        <div>
        <div style={{ float: 'right', margin: '2%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
            <div>
            <InputLabel id="demo-simple-select-label">Select Campaign</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={campaignId}
                onChange={handleChange}
                style={{width: '200px'}}
            >
                {
                    campaignDetails && campaignDetails.campaignDetails && campaignDetails.campaignDetails.map(value => {
                        return (<MenuItem value={value._id}>{value.campaignName}</MenuItem>);
                    })
                }
            </Select>
            </div>
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <DatePicker
                    className={'map-date-picker ' + style.datepickerStyle}
                    key={'map-date-picker-key'}
                    id={'map-date-picker-id'}
                    label='Select Date'
                    value={selectedDate}
                    onChange={date => handleDateChange(date)}
                    placeholder="MM/DD/YYYY"
                    format={'MM/DD/YYYY'}
                    inputVariant="outlined"
                    clearable
                />
            </MuiPickersUtilsProvider>
        </div>
        <div style={{width: "100vw", height: "100vh"}}>
            <MapWrappedComponent
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
                    process.env.REACT_APP_GOOGLE_KEY !== undefined ?  process.env.REACT_APP_GOOGLE_KEY : 'AIzaSyDFIVNy3804eaed33ukPN4zUURrJpZFJJY'
                    }`}
                loadingElement={<div style={{height: `100%`}}/>}
                containerElement={<div style={{height: `100%`}}/>}
                mapElement={<div style={{height: `100%`}}/>}
                selectedCampaign = {campaignId}
                selectedDate = {selectedDate}
            />
        </div>
        </div>
    );
};

MapContainer.propTypes = {
    campaignDetails: PropTypes.object.isRequired
};


export default MapContainer;
