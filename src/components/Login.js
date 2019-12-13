import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import agentXLoginLogo from '../images/loginVector.png';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles(theme => ({
  loginContainer: {
    color: '#777',
    borderRadius: '3px',
    borderStyle: 'solid',
    borderWidth: '1px',
    height: 'auto',
    margin: '100px auto 8px',
    width: '400px',
    minWidth: '300px',
  },
  loginInformationContainer: {
    backgroundColor: '#243762',
  },
  agentXTitle: {
    paddingTop: '5%',
    fontSize: '28px',
    textAlign: 'center',
    color: '#fff',
  },
  agentXLoginLogo: {
    paddingLeft: '15%',
  },
  agentXSignInInformation: {
    paddingTop: '5%',
    paddingBottom: '5%',
    textAlign: 'center',
    color: '#fff',
  },
  errorMessage: {
    textAlign: 'center',
    color: 'red',
  },
  textField: {
    width: '94%',
    margin: '5% 2% 0% 2%',

    '& label': {
      color: '#707070 !important',
    },

    '& fieldset': {
      border: '1px solid #707070 !important',
    },
  },
  actionButton: {
    margin: '5% 0% 10% 2%',
    fontSize: '20px',
    width: '94%',
    bottom: '0',
  },
}));

export const Login = props => {
  console.log(props);
  const styles = useStyles();
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginInformationContainer}>
        <Typography className={styles.agentXTitle}>Agent X Dashboard</Typography>
        <img className={styles.agentXLoginLogo} alt={'loginLogo'} src={agentXLoginLogo} />
        <Typography className={styles.agentXSignInInformation}>Sign in by entering the information below</Typography>
      </div>
      {props.getLoginResponse.loginMessage === 'Unauthorized' ? (
        <div className={styles.errorMessage}>Incorrect Username or Password</div>
      ) : (
        <div />
      )}
      <TextField
        className={'agent-x-login-email-id ' + styles.textField}
        label={'User Id'}
        id={'userId'}
        value={props.loginDetails.userId}
        onChange={event => props.handleOnChange(event, 'userId', 'text')}
        autoComplete="off"
        margin={'normal'}
        variant={'outlined'}
      />
      <TextField
        className={styles.textField + ' agent-x-login-password'}
        label={'Password'}
        id={'password'}
        value={props.loginDetails.password}
        onChange={event => props.handleOnChange(event, 'password', 'text')}
        type={props.loginDetails.showPassword ? 'text' : 'password'}
        autoComplete="off"
        margin={'normal'}
        variant={'outlined'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={props.handleClickShowPassword}
                onMouseDown={props.handleMouseDownPassword}
                edge="end"
              >
                {props.loginDetails.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button
        id={'agent-x-sign-in-button'}
        variant="contained"
        className={styles.actionButton}
        onClick={event => props.handleLogin(event)}
      >
        SIGN IN
      </Button>
    </div>
  );
};

Login.propTypes = {
  loginDetails: PropTypes.object,
  handleOnChange: PropTypes.func,
  handleClickShowPassword: PropTypes.func,
  handleMouseDownPassword: PropTypes.func,
  handleLogin: PropTypes.func,
  getLoginResponse: PropTypes.string,
};
