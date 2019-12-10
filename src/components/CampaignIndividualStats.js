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
    margin: '2%',
    marginLeft: '5%',
    height: '550px',
  },
  grid: {
    height: '100%',
    borderRight: '1px solid #00000029',
  },
  titleCard: {
    height: '8%',
    boxShadow: 'unset',
    borderRadius: 'unset',
  },
  paper: {
    padding: '0 0 0 16px',
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
              {[0, 1, 2, 3].map(value => {
                const labelId = `checkbox-list-label-${value}`;

                return (
                  <ListItem key={value} role={undefined} button style={{ paddingLeft: '0px' }}>
                    <ListItemText
                      id={labelId}
                      primary={<Typography style={{ float: 'left' }}>Adyar campaign</Typography>}
                    />
                    <ListItemText id={labelId} primary={<Typography style={{ float: 'right' }}>21</Typography>} />
                  </ListItem>
                );
              })}
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
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(value => {
                  return (
                    <Grid item xs={12} sm={6} md={3} key={value}>
                      <Card className={classes.card}>
                        <CardActionArea>
                          <CardMedia
                            className={classes.media}
                            image={require('../images/potholes.jpeg')}
                            title="Contemplative Reptile"
                          />
                        </CardActionArea>
                        <List>
                          <ListItem style={{ paddingTop: '0px', paddingLeft: '0px' }}>
                            <StopIcon style={{ float: 'left', color: 'grey' }} />
                            <ListItemText
                              id={value}
                              primary={<Typography style={{ float: 'left' }}>Location</Typography>}
                            />
                            <IconButton size="small" className={classes.button} aria-label="delete">
                              <CheckBoxIcon style={{ color: 'green', fontSize: '40px' }} />
                            </IconButton>
                            <IconButton className={classes.button} aria-label="delete">
                              <CancelPresentationIcon style={{ color: 'grey', fontSize: '40px' }} />
                            </IconButton>
                          </ListItem>
                        </List>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
