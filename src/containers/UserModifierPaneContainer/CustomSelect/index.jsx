import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import './index.css';

class CustomSelect extends PureComponent {
    constructor() {
        super();
        this.state = { showDropdown: false };

        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleDropdownToggle = this.handleDropdownToggle.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside, { passive: true });
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside, { passive: true });
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(event) {
        const { showDropdown } = this.state;
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            if (showDropdown) {
                this.setState({
                    showDropdown: false,
                });
            }
        }
    }

    handleDropdownToggle() {
        const { showDropdown } = this.state;
        this.setState({ showDropdown: !showDropdown });
    }

    render() {
        const { showDropdown } = this.state;
        const {
            label, value, options, handleChange, tooltipText, disabled,
        } = this.props;
        return (
            <div className="custom-select-container" ref={this.setWrapperRef}>
                <div className="custom-label-container">
                    <div><span className="custom-label">{label}</span></div>
                </div>
                <button type="button" className="custom-select" onClick={() => this.handleDropdownToggle()}>
                    <span className="custom-select-label">{value}</span>
                    <ArrowDropDown />
                </button>
                {showDropdown && !disabled && (
                    <div className="custom-options">
                        {options.map((option) => (
                            <button
                                key={option}
                                className="custom-option"
                                type="button"
                                onClick={() => {
                                    handleChange(option);
                                    this.handleDropdownToggle();
                                }}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        );
    }
}

export default CustomSelect;

CustomSelect.defaultProps = {
    disabled: false,
    label: '',
    value: '',
};

CustomSelect.propTypes = {
    handleChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.any).isRequired,
    value: PropTypes.any,
    disabled: PropTypes.bool,
    label: PropTypes.string,
};
