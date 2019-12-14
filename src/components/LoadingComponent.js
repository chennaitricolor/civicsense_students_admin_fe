import React  from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const LoadingComponent = ({ isLoading, error }) => {
    // Handle the loading state
    if (isLoading) {
        return (<CircularProgress className={'progress-loader'}/>);
    }
    // Handle the error state
    else if (error) {
        return <div>Sorry, there was a problem loading the page.</div>;
    }
    else {
        return null;
    }
};

export default LoadingComponent;