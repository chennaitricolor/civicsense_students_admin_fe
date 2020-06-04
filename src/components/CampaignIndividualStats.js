import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card';
import InfiniteScrollContainer from '../containers/InfiniteScrollContainer';

const isChennaiApp = process.env.REACT_APP_IS_GCC;

const useStyles = makeStyles(theme => ({
  root: {
    marginRight: '5%',
    marginTop: '2%',
    marginLeft: '5%',
    height: '550px',
  },
  grid: {
    height: '100%',
    borderRight: '2px solid #00000029',
    borderRadius: '10px',
    boxShadow: '0px 3px 6px #00000029',
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
    height: '270px',
    margin: '5px',
  },
  media: {
    height: 200,
  },
  button: {
    padding: '0px',
  },
  selectedListItem: { paddingLeft: '0px', color: '#0084FF !important', fontWeight: 'bold' },
  unSelectedItem: { paddingLeft: '0px' },
  readonly: { opacity: '1 !important' },
}));

export const CampaignIndividualStats = props => {
  const classes = useStyles();
  const [selectedCampaign, setSelectedCampaign] = React.useState('');
  const { campaignDetails, onCampaignClick, onEntrySubmissionClick, handleToastClose } = props;

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
              {campaignDetails
                ? campaignDetails.map(value => {
                    const labelId = `checkbox-list-label-${value._id}`;

                    return (
                      <ListItem
                        key={value._id}
                        role={undefined}
                        button
                        classes={{
                          root: selectedCampaign === value._id ? classes.selectedListItem : classes.unSelectedItem,
                          disabled: classes.readonly,
                        }}
                        selected={selectedCampaign === value._id}
                        onClick={() => {
                          setSelectedCampaign(value._id);
                          onCampaignClick(value);
                        }}
                        disabled={!isChennaiApp}
                      >
                        <ListItemText
                          id={labelId}
                          primary={
                            <Typography style={{ float: 'left', paddingLeft: '10px' }}>{value.campaignName}</Typography>
                          }
                        />

                        <ListItemText
                          id={labelId}
                          primary={<Typography style={{ float: 'right' }}>{value.noOfEntries}</Typography>}
                        />
                      </ListItem>
                    );
                  })
                : ''}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={9} className={classes.grid}>
          <Card className={classes.titleCard}>
            <Typography color="textSecondary" className={classes.campaignLabel}>
              ENTRIES
            </Typography>
          </Card>
          <InfiniteScrollContainer
            onEntrySubmissionClick={onEntrySubmissionClick}
            handleToastClose={handleToastClose}
          />
        </Grid>
      </Grid>
    </div>
  );
};
