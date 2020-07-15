import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(() => ({
    icon: {
        margin: '0.5rem 0',
        background: '#3C6886 !important',
        color: 'white',
    },
    important: {
        margin: '0.5rem 0',
        background: '#f5821f !important',
        color: 'white',
    },
}));

export default function FloatingActionButton({ onClick, icon, important }) {
    const classes = useStyles();
    return (
        <Fab className={important ? classes.important : classes.icon} aria-label="add" onClick={() => onClick()}>
            {icon}
        </Fab>
    );
}

FloatingActionButton.defaultProps = {
    icon: <AddIcon />,
    important: false,
};

FloatingActionButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    icon: PropTypes.element,
    important: PropTypes.bool,
};
