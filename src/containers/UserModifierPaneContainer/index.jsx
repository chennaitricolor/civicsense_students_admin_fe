import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UserModifierPane from './UserModifierPane';
import { toggleUserModifierPane, editVolunteer, saveVolunteer, getZoneWardMapping } from '../../actions/userModifierPaneActions';

const mapStateToProps = (state) => ({
    showUserModifierPane: state.userModifierPaneReducer.showUserModifierPane,
    editableVolunteer: state.userModifierPaneReducer.editableVolunteer,
    zoneWardMapping: state.userModifierPaneReducer.zoneWardMapping,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    toggleUserModifierPane, editVolunteer, saveVolunteer, getZoneWardMapping,
}, dispatch);

const UserModifierPaneContainer = connect(mapStateToProps, mapDispatchToProps)(UserModifierPane);

export default UserModifierPaneContainer;
