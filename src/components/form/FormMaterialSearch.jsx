import React from 'react';
import PropTypes from 'prop-types';

import { InputBase } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

/**
 * Material UI Styles
 */
const styles = theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#fff',
    marginLeft: 0,
    width: '100%'
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

const FormMaterialSearch = props => {
  const { classes } = props;
  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        value={props.value}
        onChange={props.onChange}
        disabled={props.disabled}
        name={props.name}
        placeholder={props.placeholder}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput
        }}
      />
    </div>
  );
};

FormMaterialSearch.propTypes = {
  classes: PropTypes.shape(),
  value: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func,
  disabled: PropTypes.bool
};

export default withStyles(styles)(FormMaterialSearch);
