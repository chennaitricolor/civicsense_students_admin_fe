import actions from './routeToPath';
export const routeUrls = (path) => (
    {
        type: actions.ROUTE_TO_PATH,
        payload: { path: path },
    });

export default routeUrls;