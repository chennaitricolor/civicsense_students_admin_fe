import React from 'react';
import PropTypes from 'prop-types';
import MaterialSnackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import SnackbarContentWrapper from './SnackbarContentWrapper';

const useSnackBarStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
}));

const Snackbar = ({
                      variant, message, open, hideSnackbar,
                  }) => {
    const getVariant = () => {
        switch (variant) {
            case 'success':
            case 'warning':
            case 'error':
                return variant;
            default:
                return 'info';
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        hideSnackbar();
    };

    const classes = useSnackBarStyles();
    return (
        <div>
            <MaterialSnackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <SnackbarContentWrapper
                    className={classes.margin}
                    onClose={handleClose}
                    variant={getVariant()}
                    message={message}
                />
            </MaterialSnackbar>
        </div>
    );
};

export default Snackbar;

Snackbar.propTypes = {
    hideSnackbar: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    variant: PropTypes.string.isRequired,
};
