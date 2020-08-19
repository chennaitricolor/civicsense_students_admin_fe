import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UserModifierPane from './UserModifierPane';
import { toggleUserModifierPane, editVolunteer, saveVolunteer, getZoneWardMapping, getZoneListing } from '../../actions/userModifierPaneActions';

const mapStateToProps = (state) => ({
    showUserModifierPane: state.userModifierPaneReducer.showUserModifierPane,
    editableVolunteer: state.userModifierPaneReducer.editableVolunteer,
    zoneWardMapping: state.userModifierPaneReducer.zoneWardMapping,
    zoneListing: state.userModifierPaneReducer.zoneListing,
    fetchingZoneWardMapping: state.userModifierPaneReducer.fetchingZoneWardMapping,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    toggleUserModifierPane, editVolunteer, saveVolunteer, getZoneWardMapping, getZoneListing,
}, dispatch);

const UserModifierPaneContainer = connect(mapStateToProps, mapDispatchToProps)(UserModifierPane);

export default UserModifierPaneContainer;
