import React, { useEffect, useReducer } from 'react';
import { Login } from '../components/Login';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../actions/login';
import otpAction from '../actions/getOTP';
import { Helmet } from 'react-helmet';

export const LoginContainer = () => {
  const [loginDetails, setLoginDetails] = useReducer((state, newState) => ({ ...state, ...newState }), {
    userId: '',
    password: '',
    showPassword: false,
  });
  const dispatch = useDispatch();
  const getLoginResponse = useSelector(state => state.loginResponse);
  const getOTPResponse = useSelector(state => state.getOTPReducer);
  const getConfig = useSelector(state => state.getConfigReducer.config);

  useEffect(() => {}, [getLoginResponse]);

  const handleOnChange = (event, id, type) => {
    if (type === 'text') {
      setLoginDetails({
        [event.target.id]: event.target.value,
      });
    }
  };

  const handleClickShowPassword = () => {
    setLoginDetails({ showPassword: !loginDetails.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleLogin = () => {
    dispatch({
      type: actions.INITIATE_LOGIN,
      payload: {
        userId: loginDetails.userId,
        otp: loginDetails.password,
      },
    });
  };

  const handleGetOTP = () => {
    dispatch({
      type: otpAction.GET_LOGIN_OTP,
      payload: {
        userId: loginDetails.userId,
      },
    });
  };

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{getConfig !== null ? getConfig.APP_TITLE : 'GCC - COVID Tracker'}</title>
      </Helmet>
      <Login
        title={getConfig !== null ? getConfig.APP_TITLE : 'GCC - COVID Tracker'}
        loginDetails={loginDetails}
        handleOnChange={handleOnChange}
        handleLogin={handleLogin}
        getLoginResponse={getLoginResponse}
        getOTPResponse={getOTPResponse}
        handleGetOTP={handleGetOTP}
      />
    </div>
  );
};

export default LoginContainer;
