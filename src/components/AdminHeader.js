import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import * as PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  tabs: {
    flexGrow: 20,
  },
  tabTitle: {
    fontSize: '20px',
  },
  title: {
    flexGrow: 1,
    color: '#0084FF',
    fontWeight: 'bold',
    fontSize: '25px',
  },
}));

const buttonStyle = {
  fontWeight: 'bold',
  fontSize: '15px',
  width: '15%',
};

export const AdminHeader = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {props.title}
          </Typography>
          <Tabs
            className={classes.tabs}
            value={props.selectedTab}
            indicatorColor="secondary"
            onChange={props.handleTabChange}
          >
            <Tab className={classes.tabTitle} label="Home" />
            <Tab className={classes.tabTitle} label="Reports" />
            <Tab className={classes.tabTitle} label="Map View" />
          </Tabs>
          <Button
            style={buttonStyle}
            variant={'contained'}
            color="secondary"
            onClick={props.handleCreateCampaignButtonClick}
          >
            CREATE CAMPAIGN
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

AdminHeader.propTypes = {
  title: PropTypes.string.isRequired,
  handleTabChange: PropTypes.func.isRequired,
  selectedTab: PropTypes.number.isRequired,
  handleCreateCampaignButtonClick: PropTypes.func.isRequired,
};
