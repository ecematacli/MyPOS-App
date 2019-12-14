import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableHead, TableRow, Checkbox } from '@material-ui/core';

import styles from './styles';

const PosTableHead = ({ onSelectAllClick, numSelected, rowCount }) => {
  const classes = styles();

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            classes={{ checked: classes.checked }}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all products' }}
          />
        </TableCell>
        <TableCell padding="none">
          <h4>Select All</h4>
        </TableCell>
        <TableCell align="right"></TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  );
};

PosTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired
};

export default PosTableHead;
