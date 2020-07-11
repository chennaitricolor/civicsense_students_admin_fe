import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import * as PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton';
import actions from '../actions/logout';
import { Tooltip } from '@material-ui/core';

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
  const dispatch = useDispatch();
  const loginRegion = useSelector(state => state.loginResponse.region) || localStorage.getItem('region');

  const handleLogout = () => {
    dispatch({
      type: actions.INITIATE_LOGOUT,
    });
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar style={{ minHeight: '48px' }}>
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
            {/*<Tab className={classes.tabTitle} label="Alerts" />*/}
            {loginRegion === 'GCC' && <Tab className={classes.tabTitle} label="HQIMS" />}
          </Tabs>
          <Button
            style={buttonStyle}
            variant={'contained'}
            color="secondary"
            onClick={props.handleCreateCampaignButtonClick}
          >
            CREATE CAMPAIGN
          </Button>
          <Tooltip title={'Logout'}>
            <IconButton aria-label="Logout" onClick={handleLogout} style={{ marginLeft: '2%' }}>
              <ExitToAppIcon />
            </IconButton>
          </Tooltip>
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
