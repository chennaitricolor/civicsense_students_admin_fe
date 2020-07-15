import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import CustomSelect from "./CustomSelect";
import './index.css';

class UserModifierPane extends PureComponent {
    constructor() {
        super();
        this.state = {
            name: '',
            login: '',
            zone: '',
            ward: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.renderHeader = this.renderHeader.bind(this);
        this.renderContent = this.renderContent.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
    }

    componentDidMount() {
        const { editableVolunteer, getZoneWardMapping } = this.props;
        getZoneWardMapping();

        const { name, login, _zone, ward } = editableVolunteer;
        this.setState({
            name, login,
            zone: _zone ? _zone.name : '',
            ward
        });
    }

    handleChange = (field) => (event) => {
        if (['zone'].includes(field)) {
            this.setState({
                [field]: event,
                ward: '',
            });
        }
        else if (['ward'].includes(field)) {
            this.setState({[field]: event});
        }
        else if (['login'].includes(field)) {
            const value = event.target.value;
            if (value.match(/^(\s*|\d+)$/) && value.length <= 10) {
                this.setState({ [field]: event.target.value });
            }
        }
        else this.setState({ [field]: event.target.value });
    }

    handleClose = () => {
        const { toggleUserModifierPane, editVolunteer } = this.props;
        toggleUserModifierPane(false);
        editVolunteer({});
    }

    handleSubmit = () => {
        const { name, login, zone, ward } = this.state;
        const { saveVolunteer, zoneWardMapping, editableVolunteer } = this.props;
        const zoneFound = zoneWardMapping.find(m => m.name === zone);
        const zoneId = zoneFound.wards ? zoneFound.wards[0].zone : '';

        const payload = {
            name,
            login,
            password: login,
            zone: zoneId,
            ward,
            active: true,
        };
        saveVolunteer(Object.keys(editableVolunteer) === 0 ? payload : {...payload, id: editableVolunteer.id});
        this.handleClose();
    }

    renderHeader = () => {
        const { editableVolunteer } = this.props;
        const editMode = Object.keys(editableVolunteer).length > 0;
        return (
            <div className="header">
                <span>
                    {editMode ? 'Edit Volunteer' : 'Add New Volunteer'}
                </span>
                <button
                    type="button"
                    onClick={() => this.handleClose()}
                >
                    <CloseIcon />
                </button>
            </div>
        );
    }

    renderContent = () => {
        const { name, login, zone, ward } = this.state;
        const { zoneWardMapping } = this.props;
        const wards = (zoneWardMapping.length !== 0 ? zoneWardMapping : [])
            .filter(m => m.name === zone)
            .map(m => m.wards);
        return (
            <div className="content-container">
                <div className="content">
                    <div className="input-container">
                        <span>Volunteer Name</span>
                        <input
                            type="text"
                            onChange={this.handleChange('name')}
                            value={name || ''}
                        />
                    </div>
                    <div className="input-container">
                        <span>Phone Number</span>
                        <input
                            type="text"
                            onChange={this.handleChange('login')}
                            value={login || ''}
                        />
                    </div>
                    <div className="input-container">
                        <span>Zone</span>
                        <CustomSelect
                            options={zoneWardMapping.map(m => m.name)}
                            handleChange={this.handleChange('zone')}
                            value={zone || ''}
                        />
                    </div>
                    <div className="input-container">
                        <span>Ward</span>
                        <CustomSelect
                            options={(wards.length > 0 ? wards[0] : []).map(w => w.id)}
                            handleChange={this.handleChange('ward')}
                            value={ward || ''}
                        />
                    </div>
                </div>
            </div>
        );
    }

    renderFooter = () => {
        const { name, login, zone, ward } = this.state;
        const { editableVolunteer } = this.props;
        const editMode = Object.keys(editableVolunteer).length > 0;
        return (
            <div className="footer">
                <button
                    onClick={() => this.handleSubmit()}
                    disabled={name === '' || login === '' || zone === '' || ward === '' || login.length !== 10}
                >
                    {editMode ? 'Edit Volunteer' : 'Add Volunteer'}
                </button>
            </div>
        );
    }

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
