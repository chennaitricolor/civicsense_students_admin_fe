import React, { useEffect } from 'react';
import { embedDashboard } from 'amazon-quicksight-embedding-sdk';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../actions/GetDashboardEmbedAction';
import LoadingComponent from './LoadingComponent';

const loadingComponentStyle = {
  top: '40%',
  position: 'absolute',
  left: '42%',
  color: '#0084FF',
  width: '50px',
};

let options = {
  container: '#dashboardContainer',
  parameters: {},
  scrolling: 'no',
  height: 'AutoFit',
  loadingHeight: '700px',
  locale: 'en-US',
  footerPaddingEnabled: true,
};

export const ReportEmbedComponent = (props) => {
  const dispatch = useDispatch();
  const getDashboardEmbedUrl = useSelector((state) => state.getDashboardEmbedUrlReducer);
  useEffect(() => {
    dispatch({
      type: actions.GET_DASHBOARD_EMBED_URL,
    });
  }, [dispatch]);

  useEffect(() => {
    if (getDashboardEmbedUrl !== undefined && getDashboardEmbedUrl.dashboardEmbedUrl !== undefined) {
      options.url = getDashboardEmbedUrl.dashboardEmbedUrl.dashboard.EmbedUrl;
      embedDashboard(options);
    }
  }, [getDashboardEmbedUrl]);


  const getElementsToRender = () => {
    const getDashboardEmbedUrlResponse = getDashboardEmbedUrl;
    if (getDashboardEmbedUrlResponse !== undefined && getDashboardEmbedUrlResponse.isLoading) {
      return <LoadingComponent isLoading={getDashboardEmbedUrlResponse.isLoading} style={loadingComponentStyle} />;
    } else {
      return (
        <div>
        <div id="dashboardContainer"></div>
      </div>
      );
    }
  };
  return getElementsToRender();
};

ReportEmbedComponent.propTypes = {
};

export default ReportEmbedComponent;
