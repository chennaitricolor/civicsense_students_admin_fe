import React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from 'react-select';
import Icon from '@material-ui/core/Icon';

export class Option extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.onSelect(this.props.option, event);
  }

  setMenuItemClass(selected) {
    return selected ? 'drop-down__option--selected' : 'drop-down__option';
  }

  render() {
    return (
      <MenuItem onClick={this.handleClick} component="div" className={this.setMenuItemClass(this.props.isFocused)}>
        {this.props.children}
      </MenuItem>
    );
  }
}

Option.propTypes = {
  onSelect: PropTypes.func,
  option: PropTypes.object,
  children: PropTypes.string,
  isFocused: PropTypes.bool,
};

export class SelectWrapped extends React.Component {
  constructor(props) {
    super(props);
  }

  getNoResultsText() {
    return <Typography>No results found</Typography>;
  }

  renderArrow(arrowProps) {
    return arrowProps.isOpen ? <Icon> arrow_drop_up </Icon> : <Icon> arrow_drop_down </Icon>;
  }

  getValueComponent(valueProps) {
    const { children } = valueProps;

    return (
      <div className="drop-down__option-value" style={optionsStyle}>
        {children}
      </div>
    );
  }

  render() {
    return (
      <Select
        optionComponent={Option}
        noResultsText={this.getNoResultsText()}
        arrowRenderer={this.renderArrow}
        valueComponent={this.getValueComponent}
        {...this.props}
      />
    );
  }
}

SelectWrapped.propTypes = {
  id: PropTypes.string,
  classes: PropTypes.object,
};

const ITEM_HEIGHT = 48;

const dropDownStyle = {
  width: '248px',
};

const optionsStyle = {
  padding: 0,
};

const matchStyle = {
  width: '248px',
};

const styles = theme => ({
  chip: {
    margin: theme.spacing(0.25),
  },

  '@global': {
    '.Select-control': {
      display: 'flex',
      alignItems: 'center',
      border: 0,
      height: 'auto',
      background: 'transparent',
      '&:hover': {
        boxShadow: 'none',
      },
    },
    '.Select-multi-value-wrapper': {
      flexGrow: 1,
      display: 'flex',
      flexWrap: 'wrap',
      fontSize: '14px',
      textAlign: 'Justify',
    },
    '.Select--multi .Select-input': {
      margin: 0,
    },
    '.Select.has-value.is-clearable.Select--single > .Select-control .Select-value': {
      padding: 0,
    },
    '.Select-noresults': {
      padding: theme.spacing(2),
    },
    '.Select-input': {
      display: 'inline-flex !important',
      padding: 0,
      height: 'auto',
    },
    '.Select-input input': {
      background: 'transparent',
      border: 0,
      padding: 0,
      cursor: 'default',
      display: 'inline-block',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      margin: 0,
      outline: 0,
    },
    '.Select-placeholder, .Select--single .Select-value': {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.pxToRem(14),
      padding: 0,
    },
    '.Select-placeholder': {
      fontSize: '14px',
      color: '#333940',
    },
    '.Select-menu-outer': {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[2],
      position: 'absolute',
      left: 0,
      top: 'calc(100%)',
      width: '100%',
      zIndex: '10',
      maxHeight: ITEM_HEIGHT * 4.5,
    },
    '.Select.is-focused:not(.is-open) > .Select-control': {
      boxShadow: 'none',
    },
    '.Select-menu': {
      maxHeight: ITEM_HEIGHT * 4.5,
      overflowY: 'auto',
    },
    '.Select-menu div': {
      boxSizing: 'content-box',
    },
    '.Select-arrow-zone': {
      marginRight: '6px',
      color: theme.palette.action.active,
      cursor: 'pointer',
      height: 21,
      // width: 21,
      zIndex: 1,
    },
    '.Select-aria-only': {
      position: 'absolute',
      overflow: 'hidden',
      clip: 'rect(0 0 0 0)',
      height: 1,
      width: 1,
      margin: -1,
    },
    '.drop-down__option': {
      '&:hover': {
        backgroundColor: '#e5f7f8',
      },
    },
    '.drop-down__option--selected': {
      backgroundColor: '#e5f7f8',
    },
    '.document-match__label': {
      color: '#1b6c92',
      opacity: '0.9',
      fontSize: '12px',
      fontWeight: 'normal',
      fontStyle: 'italic',
      fontStretch: 'normal',
      letterSpacing: 'normal',
      paddingTop: '6px',
    },
  },
});

export class AutoCompleteDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.setNameForDropDownOption = this.setNameForDropDownOption.bind(this);
  }

  getDropDownList(dropDownList) {
    if (dropDownList.length !== undefined) {
      return dropDownList.map(type => ({
        value: type.value !== undefined ? type.value : type,
        label: type.label !== undefined ? type.label : type,
        name: this.props.id,
      }));
    }
    return [];
  }

  setNameForDropDownOption(dropDownList) {
    let dropDownListCopy = [];
    dropDownList.forEach(val => {
      dropDownListCopy.push(Object.assign({}, val));
    });
    return dropDownListCopy.map(option => {
      if (option === undefined) {
        option = {};
      }
      option.name = this.props.id;
      return option;
    });
  }

  render() {
    return (
      <div
        style={this.props.styleContainer !== undefined ? this.props.styleContainer : matchStyle}
        className={
          this.props.classNameIdentifier !== undefined
            ? this.props.classNameIdentifier + '-auto-complete-dropdown-container'
            : 'auto-complete-dropdown-container'
        }
      >
        <div className="drop-down-match">
          <div
            style={dropDownStyle}
            className={
              'drop-down-match ' +
              (this.props.classNameIdentifier === undefined ? '' : this.props.classNameIdentifier + '-width')
            }
          >
            <Input
              autoComplete="0"
              fullWidth
              id={this.props.id}
              value={this.props.value}
              inputComponent={SelectWrapped}
              className={
                'drop-down__input ' +
                (this.props.classNameIdentifier === undefined ? '' : this.props.classNameIdentifier)
              }
              onChange={this.props.handleOnChangeForDropdown}
              inputProps={{
                classes: this.props.classes,
                placeholder: this.props.placeholder,
                options: this.props.isDropDownFormatted
                  ? this.setNameForDropDownOption(this.props.dropDownList)
                  : this.getDropDownList(this.props.dropDownList),
              }}
              disabled={this.props.readOnly !== undefined ? this.props.readOnly : false}
            />
          </div>
        </div>
      </div>
    );
  }
}

AutoCompleteDropdown.defaultProps = {
  isDropDownFormatted: false,
};

AutoCompleteDropdown.propTypes = {
  id: PropTypes.string,
  classes: PropTypes.object.isRequired,
  handleOnChangeForDropdown: PropTypes.func.isRequired,
  value: PropTypes.string,
  dropDownList: PropTypes.array,
  isDropDownFormatted: PropTypes.bool,
  placeholder: PropTypes.string,
  styleContainer: PropTypes.object,
  classNameIdentifier: PropTypes.string,
  readOnly: PropTypes.bool,
};

let withStylesAutoCompleteDropdown = withStyles(styles)(AutoCompleteDropdown);

export default withStylesAutoCompleteDropdown;
