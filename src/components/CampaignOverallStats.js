import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import * as PropTypes from 'prop-types';

const useStyles = makeStyles({
    card: {
        minWidth: 275,
        width: '20%',
        marginLeft: '5%',
        marginTop: '3%',
        backgroundColor: '#fcfcfc',
        boxShadow: '2px',
        display: 'inline-block'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    campaignCounts: {
        fontSize: '50px',
        fontWeight: 'bold'
    },
    campaignLabel: {
        fontWeight: 'bold'
    },
    pos: {
        marginBottom: 12,
    },
});

export const CampaignOverallStats = (props) => {
    const classes = useStyles();
        return (
            <div>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h6" component="h6" className={classes.campaignCounts}>
                        { props.liveCampaignsCount }
                    </Typography>
                    <Typography color="textSecondary" className={classes.campaignLabel}>
                        Live Campaigns
                    </Typography>
                </CardContent>
            </Card>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant="h6" component="h6" className={classes.campaignCounts}>
                            { props.totalEntriesCount }
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary" className={classes.campaignLabel}>
                            Total Entries
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        );
};

CampaignOverallStats.propTypes = {
    selectedTab: PropTypes.number.isRequired,
    liveCampaignsCount: PropTypes.number,
    totalEntriesCount: PropTypes.number
};