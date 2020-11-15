import React from 'react';
import PropTypes from 'prop-types';

import { InputBase, Select, MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

/**
 * Material UI Styles
 */
const styles = theme => ({
  container: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#fff',
    marginLeft: 0
  },
  select: {
    width: 'unset !important',
    '&:focus': {
      backgroundColor: '#fff'
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    width: '100%'
  }
});
/* ********************************** */

const FormMaterialSelect = props => {
  const { classes, disabled } = props;
  return (
    <div className={classes.container}>
      <div className={classes.searchIcon}>
        <i className="fas fa-sliders-h" />
      </div>
      <Select
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        classes={{
          select: classes.select
        }}
        input={
          <InputBase
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
          />
        }
        disabled={disabled}
      >
        {props.options.map((item, index) => (
          <MenuItem key={`order-filter-option-${index + 1}`} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

FormMaterialSelect.propTypes = {
  classes: PropTypes.shape(),
  value: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func,
  disabled: PropTypes.bool
};

export default withStyles(styles)(FormMaterialSelect);
