import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import IconButton from '@material-ui/core/IconButton';
import StopIcon from '@material-ui/icons/Stop';

const useStyles = makeStyles(theme => ({
  root: {
    marginRight: '5%',
    marginTop: '2%',
    marginLeft: '5%',
    height: '550px',
  },
  grid: {
    height: '100%',
    //border: '1px solid #00000029',
    borderRadius: '10px',
    boxShadow: '0px 3px 6px #00000029'
  },
  titleCard: {
    height: '8%',
    boxShadow: 'unset',
    borderRadius: 'unset',
  },
  paper: {
    padding: '0 16px 0 16px',
    textAlign: 'center',
    color: 'theme.palette.text.secondary',
    height: '92%',
    overflow: 'auto',
    boxShadow: 'unset',
    borderRadius: 'unset',
  },
  campaignLabel: {
    fontWeight: 'bold',
    textAlign: 'center',
    padding: '8px 0',
  },
  campaignDurationLabel: {
    color: '#707070',
    font: 'Medium 20px/26px Roboto;',
    textAlign: 'left',
    float: 'right',
  },
  card: {
    maxWidth: '200px',
    height: '250px',
  },
  media: {
    height: 200,
  },
  button: {
    padding: '0px',
  },
}));

export const CampaignIndividualStats = props => {
  const classes = useStyles();
  const [selectedCampaign, setSelectedCampaign] = React.useState('');
  const { campaignDetails, campaignData, onCampaignClick} = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={0} className={classes.grid}>
        <Grid item xs={3} className={classes.grid}>
          <Card className={classes.titleCard}>
            <Typography color="textSecondary" className={classes.campaignLabel}>
              CAMPAIGNS
            </Typography>
          </Card>
          <Paper className={classes.paper}>
            <List>
              {campaignDetails ? campaignDetails.map(value => {
                const labelId = `checkbox-list-label-${value._id}`;

                return (
                  <ListItem key={value._id} role={undefined} button style={{ paddingLeft: '0px' }} selected={selectedCampaign === value._id} onClick={() => {
                    setSelectedCampaign(value._id);
                    onCampaignClick(value);
                  }}>
                    <ListItemText
                      id={labelId}
                      primary={<Typography style={{ float: 'left', paddingLeft: '10px' }}>{value.campaignName}</Typography>}
                    />
                    <ListItemText id={labelId} primary={<Typography style={{ float: 'right' }}>{value.noOfEntries}</Typography>} />
                  </ListItem>
                );
              }) : '' }
            </List>
          </Paper>
        </Grid>
        <Grid item xs={9} className={classes.grid}>
          <Card className={classes.titleCard}>
            <Typography color="textSecondary" className={classes.campaignLabel}>
              ENTRIES
            </Typography>
          </Card>
          <Paper className={classes.paper}>
            <List>
              <Grid container spacing={2} direction="row" justify="flex-start" alignItems="flex-start">
                {campaignData && campaignData.campaignDetails && campaignData.campaignDetails.entries ? campaignData.campaignDetails.entries.map(value => {
                  return (
                    <Grid item xs={12} sm={6} md={3} key={value}>
                      <Card className={classes.card}>
                        <CardActionArea>
                          <CardMedia
                            className={classes.media}
                            image={require('../images/potholes.jpeg')}
                            title="Pothole"
                          />
                        </CardActionArea>
                        <List>
                          <ListItem style={{ paddingTop: '0px', paddingLeft: '0px' }}>
                            <StopIcon style={{ float: 'left', color: 'grey' }} />
                            <ListItemText
                              id={value}
                              primary={<Typography style={{ float: 'left' }}>{value.locationNm}</Typography>}
                            />
                            <IconButton size="small" className={classes.button} aria-label="delete">
                              <CheckBoxIcon style={{ color: '#00AB88', fontSize: '40px' }} />
                            </IconButton>
                            <IconButton className={classes.button} aria-label="delete">
                              <CancelPresentationIcon style={{ color: '#AEAEAE', fontSize: '40px' }} />
                            </IconButton>
                          </ListItem>
                        </List>
                      </Card>
                    </Grid>
                  );
                }) : ''}
              </Grid>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
