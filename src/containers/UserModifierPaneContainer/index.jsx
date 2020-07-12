import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UserModifierPane from './UserModifierPane';
import { toggleUserModifierPane, editVolunteer, saveVolunteer } from '../../actions/userModifierPaneActions';

const mapStateToProps = (state) => ({
    showUserModifierPane: state.userModifierPaneReducer.showUserModifierPane,
    editableVolunteer: state.userModifierPaneReducer.editableVolunteer,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    toggleUserModifierPane, editVolunteer, saveVolunteer,
}, dispatch);

const UserModifierPaneContainer = connect(mapStateToProps, mapDispatchToProps)(UserModifierPane);

export default UserModifierPaneContainer;
