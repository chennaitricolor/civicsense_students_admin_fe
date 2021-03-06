import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import CustomSelect from './CustomSelect';
import './index.css';

const AddressTypes = ['zone', 'municipality', 'town panchayat', 'cantonment', 'block'];

class UserModifierPane extends PureComponent {
  constructor() {
    super();
    this.state = {
      name: '',
      login: '',
      zone: '',
      ward: '',
      fieldsChanged: false,
      type: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.renderHeader = this.renderHeader.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
  }

  componentDidMount() {
    const { editableVolunteer } = this.props;

    const { name, login, _zone, ward } = editableVolunteer;
    if (login) {
      this.setState({
        name,
        login,
        zone: _zone ? _zone.name : '',
        ward,
      });
    }
  }

  handleChange = field => event => {
    const { fieldsChanged } = this.state;
    const { editableVolunteer, getZoneListing , getZoneWardMapping, zoneListing} = this.props;
    const editMode = Object.keys(editableVolunteer).length > 0;

    if (['zone'].includes(field)) {
      this.setState({
        [field]: event,
        ward: '',
      });
      getZoneWardMapping(zoneListing.find(z => z.name === event).id);
    } else if (['ward'].includes(field)) {
      this.setState({ [field]: event });
    } else if (['type'].includes(field)) {
      this.setState({ [field]: event, zone: '', ward: '' });
      getZoneListing(event);
    } else if (['login'].includes(field)) {
      const value = event.target.value;
      if (value.match(/^(\s*|\d+)$/) && value.length <= 10) {
        this.setState({ [field]: event.target.value });
      }
    } else this.setState({ [field]: event.target.value });

    if (editMode) {
      const { name, login, _zone, ward } = editableVolunteer;
      const mirrorInitialState = {
        name,
        login,
        zone: _zone ? _zone.name : '',
        ward,
      };

      if (['zone', 'ward'].includes(field) && mirrorInitialState[field] !== event && !fieldsChanged) {
        this.setState({ fieldsChanged: true });
      } else if (['zone', 'ward'].includes(field) && mirrorInitialState[field] === event && fieldsChanged) {
        this.setState({ fieldsChanged: false });
      }

      if (['name', 'login'].includes(field) && mirrorInitialState[field] !== event.target.value && !fieldsChanged) {
        this.setState({ fieldsChanged: true });
      } else if (
        ['name', 'login'].includes(field) &&
        mirrorInitialState[field] === event.target.value &&
        fieldsChanged
      ) {
        this.setState({ fieldsChanged: false });
      }
    }
  };

  handleClose = () => {
    const { toggleUserModifierPane, editVolunteer } = this.props;
    toggleUserModifierPane(false);
    editVolunteer({});
  };

  handleSubmit = () => {
    const { name, login, zone, ward } = this.state;
    const { saveVolunteer, zoneWardMapping, editableVolunteer, zoneListing } = this.props;
    const zoneId = zoneListing.find(m => m.name === zone).id;
    const wardFound = zoneWardMapping.find(m => m.name === ward);
    const wardId = wardFound ? wardFound.id : null;

    const payload = {
      name,
      login,
      password: login,
      zone: zoneId,
      ward: wardId,
      active: true,
      region: localStorage.getItem('region'),
    };
    saveVolunteer(Object.keys(editableVolunteer) === 0 ? payload : { ...payload, id: editableVolunteer.id });
    this.handleClose();
  };

  renderHeader = () => {
    const { editableVolunteer } = this.props;
    const editMode = Object.keys(editableVolunteer).length > 0;
    return (
      <div className="header">
        <span>{editMode ? 'Edit Volunteer' : 'Add New Volunteer'}</span>
        <button type="button" onClick={() => this.handleClose()}>
          <CloseIcon />
        </button>
      </div>
    );
  };

  renderContent = () => {
    const { name, login, zone, ward, type } = this.state;
    const { zoneWardMapping, zoneListing } = this.props;
    return (
      <div className="content-container">
        <div className="content">
          <div className="input-container">
            <span>Volunteer Name</span>
            <input type="text" onChange={this.handleChange('name')} value={name || ''} />
          </div>
          <div className="input-container">
            <span>Phone Number</span>
            <input type="text" onChange={this.handleChange('login')} value={login || ''} />
          </div>
          <div className="input-container">
            <span>Address Type</span>
            <CustomSelect options={AddressTypes} handleChange={this.handleChange('type')} value={type || ''} />
          </div>
          {type && (
            <div className="input-container">
              <span className="zoneLabel">{type}</span>
              <CustomSelect
                options={zoneListing.map(m => m.name)}
                handleChange={this.handleChange('zone')}
                value={zone || ''}
              />
            </div>
          )}
          {zone && type && zoneWardMapping.length > 0 && (
            <div className="input-container">
              <span>Ward</span>
              <CustomSelect
                options={zoneWardMapping.map(m => m.name)}
                handleChange={this.handleChange('ward')}
                value={ward || ''}
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  renderFooter = () => {
    const { name, login, zone, ward, fieldsChanged } = this.state;
    const { editableVolunteer, zoneWardMapping, fetchingZoneWardMapping } = this.props;
    const editMode = Object.keys(editableVolunteer).length > 0;
    return (
      <div className="footer">
        <button
          onClick={() => this.handleSubmit()}
          disabled={
            name === '' ||
            login === '' ||
            zone === '' ||
            (ward === '' && zoneWardMapping.length !== 0) ||
            fetchingZoneWardMapping ||
            login.length !== 10 ||
            (editMode && !fieldsChanged)
          }
        >
          {editMode ? 'Save Volunteer' : 'Add Volunteer'}
        </button>
      </div>
    );
  };

  render() {
    return (
      <div className="request-form-container">
        <div className="request-form">
          {this.renderHeader()}
          {this.renderContent()}
          {this.renderFooter()}
        </div>
      </div>
    );
  }
}

export default UserModifierPane;

UserModifierPane.propTypes = {
  toggleUserModifierPane: PropTypes.func.isRequired,
  editVolunteer: PropTypes.func.isRequired,
  saveVolunteer: PropTypes.func.isRequired,
  editableVolunteer: PropTypes.object.isRequired,
  zoneWardMapping: PropTypes.array.isRequired,
};
