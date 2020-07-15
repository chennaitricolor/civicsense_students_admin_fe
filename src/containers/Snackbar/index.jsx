import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showSnackbar, hideSnackbar } from '../../actions/snackbarAction';
import Snackbar from './Snackbar';

const mapStateToProps = (state) => ({
    variant: state.snackbarReducer.variant,
    message: state.snackbarReducer.message,
    open: state.snackbarReducer.open,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    showSnackbar, hideSnackbar,
}, dispatch);

const SnackbarContainer = connect(mapStateToProps, mapDispatchToProps)(Snackbar);

export default SnackbarContainer;
