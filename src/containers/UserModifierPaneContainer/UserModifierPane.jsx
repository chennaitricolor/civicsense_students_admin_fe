import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import './index.css';
import {editVolunteer, saveVolunteer} from "../../actions/userModifierPaneActions";

class UserModifierPane extends PureComponent {
    constructor() {
        super();
        this.state = {
            name: '',
            number: '',
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
        const { editableVolunteer } = this.props;
        const { name, number, zone, ward } = editableVolunteer;
        this.setState({ name, number, zone, ward });
    }

    handleChange = (field) => (event) => {
        this.setState({ [field]: event.target.value });
    }

    handleClose = () => {
        const { toggleUserModifierPane, editVolunteer } = this.props;
        toggleUserModifierPane(false);
        editVolunteer({});
    }

    handleSubmit = () => {
        const { name, number, zone, ward } = this.state;
        const { saveVolunteer } = this.props;
        saveVolunteer({ name, number, zone, ward });
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
        const { name, number, zone, ward } = this.state;
        return (
            <div className="content-container">
                <div className="content">
                    <div className="input-container">
                        <span>Volunteer Name</span>
                        <input
                            type="text"
                            onChange={this.handleChange('name')}
                            value={name}
                        />
                    </div>
                    <div className="input-container">
                        <span>Phone Number</span>
                        <input
                            type="text"
                            onChange={this.handleChange('number')}
                            value={number}
                        />
                    </div>
                    <div className="input-container">
                        <span>Zone</span>
                        <input
                            type="text"
                            onChange={this.handleChange('zone')}
                            value={zone}
                        />
                    </div>
                    <div className="input-container">
                        <span>Ward</span>
                        <input
                            type="text"
                            onChange={this.handleChange('ward')}
                            value={ward}
                        />
                    </div>
                </div>
            </div>
        );
    }

    renderFooter = () => {
        return (
            <div className="footer">
                <button
                    onClick={() => this.handleSubmit()}
                    disabled={false}
                >
                    Add Volunteer
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
};
