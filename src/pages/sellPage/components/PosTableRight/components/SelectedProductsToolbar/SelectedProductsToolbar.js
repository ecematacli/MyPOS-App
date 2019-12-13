import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Toolbar, Typography, Tooltip, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import styles from './styles';

const SelectedProductsToolbar = ({ numSelected }) => {
  const classes = styles();

  return (
    <Toolbar
      className={clsx(classes.selectedItemRoot, {
        [classes.highlight]: numSelected > 0
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
        >
          {numSelected === 1
            ? `${numSelected} Product has been selected`
            : `${numSelected} Products have been selected`}
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle">
          Products
        </Typography>
      )}

      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

SelectedProductsToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
};

export default SelectedProductsToolbar;
