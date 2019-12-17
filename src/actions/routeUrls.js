import actions from './routeToPath';
const routeUrls = path => ({
  type: actions.ROUTE_TO_PATH,
  payload: { path: path },
});

export default routeUrls;
