import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import * as PropTypes from "prop-types";

export const CreateCampaign = (props) => {

};

CreateCampaign.propTypes = {
    createCampaign: PropTypes.bool.isRequired,
    createCampaignEventHandler: PropTypes.func.isRequired
};