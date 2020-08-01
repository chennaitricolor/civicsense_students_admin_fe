import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UserManagement from './UserManagement';
import { searchVolunteerByNumber, deleteVolunteer, fetchTransferVolunteer, transferPatients } from '../../actions/userManagementActions';
import { toggleUserModifierPane, editVolunteer } from '../../actions/userModifierPaneActions';
import { showSnackbar, hideSnackbar } from '../../actions/snackbarAction';

const mapStateToProps = (state) => ({
    volunteer: state.userManagementReducer.volunteer,
    fetchingVolunteer: state.userManagementReducer.fetchingVolunteer,
    fetchedVolunteer: state.userManagementReducer.fetchedVolunteer,
    errorFetchingVolunteer: state.userManagementReducer.errorFetchingVolunteer,
    transferVolunteer: state.userManagementReducer.transferVolunteer,
    fetchingTransferVolunteer: state.userManagementReducer.fetchingTransferVolunteer,
    fetchedTransferVolunteer: state.userManagementReducer.fetchedTransferVolunteer,
    errorFetchingTransferVolunteer: state.userManagementReducer.errorFetchingTransferVolunteer,
    patients: state.userManagementReducer.patients,
    fetchingPatients: state.userManagementReducer.fetchingPatients,
    fetchedPatients: state.userManagementReducer.fetchedPatients,
    errorFetchingPatients: state.userManagementReducer.errorFetchingPatients,
    showUserModifierPane: state.userModifierPaneReducer.showUserModifierPane,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    searchVolunteerByNumber, deleteVolunteer, fetchTransferVolunteer,
    toggleUserModifierPane, editVolunteer, transferPatients,
    showSnackbar, hideSnackbar,
}, dispatch);

const UserManagementContainer = connect(mapStateToProps, mapDispatchToProps)(UserManagement);

export default UserManagementContainer;
