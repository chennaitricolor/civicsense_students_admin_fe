import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const style = {
  top: '40%',
  position: 'absolute',
  left: '42%',
  color: '#0084FF',
  width: '50px'
};

const LoadingComponent = ({ isLoading, error }) => {
  // Handle the loading state
  if (isLoading) {
    return <CircularProgress style={style} />;
  }
  // Handle the error state
  else if (error) {
    return <div>Sorry, there was a problem loading the page.</div>;
  } else {
    return null;
  }
};

export default LoadingComponent;
