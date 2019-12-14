import routeToPathAction from "../actions/routeToPath";
const routesReducer = (state = {}, action) => {

    switch (action.type) {
        case routeToPathAction.ROUTE_TO_PATH:
            return Object.assign(
                {},
                state,
                { path: action.payload.path }
            );
        default:
            return state;
    }
};

export default routesReducer;