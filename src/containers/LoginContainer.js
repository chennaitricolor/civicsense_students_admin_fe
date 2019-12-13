import React, { useEffect, useReducer } from 'react';
import { Login } from '../components/Login';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../actions/login';

export const LoginContainer = () => {
  const [loginDetails, setLoginDetails] = useReducer((state, newState) => ({ ...state, ...newState }), {
    userId: '',
    password: '',
    showPassword: false,
  });
  const dispatch = useDispatch();
  const getLoginResponse = useSelector(state => state.loginResponse);

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

  const handleLogin = event => {
    dispatch({
      type: actions.INITIATE_LOGIN,
      payload: {
        userId: loginDetails.userId,
        password: loginDetails.password,
      },
    });
  };

  return (
    <div>
      <Login
        loginDetails={loginDetails}
        handleOnChange={handleOnChange}
        handleClickShowPassword={handleClickShowPassword}
        handleMouseDownPassword={handleMouseDownPassword}
        handleLogin={handleLogin}
        getLoginResponse={getLoginResponse}
      />
    </div>
  );
};
