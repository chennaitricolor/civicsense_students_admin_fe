import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import getCampaignDetailsById from "../actions/getCampaignDetailsById";
import {Tooltip} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import IconButton from '@material-ui/core/IconButton';
import StopIcon from '@material-ui/icons/Stop';
import Image from 'material-ui-image';
import { getImageUrl } from '../utils/constants';
import ToastComponent from '../components/ToastComponent';
import LoadingComponent from '../components/LoadingComponent';

const button = {
        padding: '0px',
    };

const card = {
    maxWidth: '200px',
        height: '270px',
        margin: '5px'
};

const paper = {
    padding: '0 16px 0 16px',
    textAlign: 'center',
    color: 'theme.palette.text.secondary',
    height: '92%',
    overflow: 'auto',
    boxShadow: 'unset',
    borderRadius: 'unset',
};

const loadingComponentStyle =
{
    top: '40%',
        position: 'absolute',
    left: '42%',
    color: '#0084FF',
    width: '50px',
};

const infiniteScrollStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    margin: '-5px -5px',
};

class InfiniteScrollContainer extends React.Component {


    constructor(props) {
        super(props);
    }

    getElementsToRenderBasedOnProps = campaignData => {
        if (campaignData !== undefined) {
             if (campaignData.campaignDetailsError !== '') {
                return (
                    <ToastComponent
                        handleClose={this.props.handleToastClose}
                        openToast={true}
                        toastMessage={'Error in fetching Campaign entries. Please try later..'}
                        toastVariant={'error'}
                    />
                );
            } else if (campaignData && campaignData.campaignDetails && campaignData.campaignDetails.entries) {
                return (
                    <InfiniteScroll
                dataLength={campaignData.campaignDetails.entries.length}
                next={this.loadMore}
                hasMore={campaignData.campaignDetails.entries.length > 0}
                loader={<LoadingComponent isLoading={true} style={loadingComponentStyle}/>}
                scrollableTarget="scrollableDiv"
                style={infiniteScrollStyle}
                    >
                    {this.getElements()}
            </InfiniteScroll>
                );
            } else {
                return '';
            }
        }
    };

    getElements = () => {
        const campaignEntries = this.props.getACampaignDetailsResponse && this.props.getACampaignDetailsResponse.allEntries;
        const campaignId = this.props.getACampaignDetailsResponse && this.props.getACampaignDetailsResponse.campaignDetails.campaignDetails._id;
        let campaignFinalEntries = [];
        campaignEntries.map(value => {
            const imageUrl = `${getImageUrl + value.photoId}`;
            const grid = (
                <Card className={card} style={card}>
                    <CardActionArea>
                        <Image imageStyle={{ height: '200px', background: 'grey' }} src={imageUrl} title="" />
                    </CardActionArea>
                    <List>
                        <ListItem style={{ paddingTop: '0px', paddingLeft: '0px' }}>
                            <StopIcon style={{ float: 'left', color: 'grey' }} />
                            <ListItemText
                                id={value}
                                primary={
                                    <Tooltip title={value.locationNm}>
                                        <Typography
                                            style={{ float: 'left', width: '80px', textOverflow: 'ellipsis', overflow: 'hidden' }}
                                        >
                                            {value.locationNm}
                                        </Typography>
                                    </Tooltip>
                                }
                            />
                            <IconButton
                                size="small"
                                className={button}
                                style={button}
                                aria-label="accept"
                                onClick={() => {
                                    const eventData = {
                                        status: 'ACCEPTED',
                                        campaignId: campaignId,
                                        entryId: value._id,
                                    };
                                    this.props.onEntrySubmissionClick(eventData);
                                }}
                            >
                                <CheckBoxIcon style={{ color: '#00AB88', fontSize: '40px' }} />
                            </IconButton>
                            <IconButton
                                className={button}
                                style={button}
                                aria-label="reject"
                                onClick={() => {
                                    const eventData = {
                                        status: 'REJECTED',
                                        campaignId: campaignId,
                                        entryId: value._id,
                                    };
                                    this.props.onEntrySubmissionClick(eventData);
                                }}
                            >
                                <CancelPresentationIcon style={{ color: '#AEAEAE', fontSize: '40px' }} />
                            </IconButton>
                        </ListItem>
                    </List>
                </Card>
            );
            campaignFinalEntries.push(grid);
        });
        return (campaignFinalEntries);
    };

    loadMore = () => {
        const campaignId = this.props.getACampaignDetailsResponse && this.props.getACampaignDetailsResponse.campaignDetails.campaignDetails._id;
        const campaignEntries = this.props.getACampaignDetailsResponse && this.props.getACampaignDetailsResponse.allEntries;
        const lastCreatedAtOfPreviousPage = campaignEntries.length > 0 ? campaignEntries[campaignEntries.length-1].createdAt : '';
        this.props.getCampaignDetailsById(campaignId, lastCreatedAtOfPreviousPage);
    };

    render() {
        return (<Paper style={paper} id="scrollableDiv">
            <List>
                <Grid container spacing={2} direction="row" justify="flex-start" alignItems="flex-start">
                    {this.getElementsToRenderBasedOnProps(this.props.getACampaignDetailsResponse)}
                </Grid>
            </List>
        </Paper>);
    }
}

export const mapStateToProps = (state) => ({
    getACampaignDetailsResponse: state.getACampaignDetailsResponse
});

export const mapDispatchToProps = (dispatch) => bindActionCreators({
    getCampaignDetailsById
}, dispatch);

InfiniteScrollContainer.propTypes = {
    getCampaignDetailsById: PropTypes.func,
    onEntrySubmissionClick: PropTypes.func,
    handleToastClose: PropTypes.func
};

let connectedInfiniteScrollContainer = connect(mapStateToProps, mapDispatchToProps)(InfiniteScrollContainer);

export default connectedInfiniteScrollContainer;