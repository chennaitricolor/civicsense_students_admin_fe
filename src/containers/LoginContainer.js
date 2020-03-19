import React, { useEffect, useReducer } from 'react';
import { Login } from '../components/Login';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../actions/login';
import otpAction from '../actions/getOTP';

export const LoginContainer = () => {
  const [loginDetails, setLoginDetails] = useReducer((state, newState) => ({ ...state, ...newState }), {
    userId: '',
    password: '',
    showPassword: false,
  });
  const dispatch = useDispatch();
  const getLoginResponse = useSelector(state => state.loginResponse);
  const getOTPResponse = useSelector(state => state.getOTPReducer);

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
      <Login
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
