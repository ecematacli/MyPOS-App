import React, { Fragment } from 'react';
import { Popover } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';

import styles from './styles';
import useSalesFiltersState from './useSalesFiltersState';
import DatePickerFilter from '../../../../common/components/datePickerFilter/DatePickerFilter';

const SalesFilters = ({ page, rowsPerPage }) => {
  const classes = styles();
  const {
    startDate,
    handleStartDateChange,
    endDate,
    handleEndDateChange,
    open,
    anchorEl,
    handleClick,
    handleClose,
    onDateSelectClick,
    onClearFiltersClick
  } = useSalesFiltersState(page, rowsPerPage);

  return (
    <Fragment>
      <div className={classes.filterIconContainer}>
        <div className={classes.filterIconDiv} onClick={handleClick}>
          <FilterListIcon className={classes.filterIcon} />
        </div>
      </div>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <DatePickerFilter
          startDate={startDate}
          handleStartDateChange={handleStartDateChange}
          endDate={endDate}
          handleEndDateChange={handleEndDateChange}
          handleClose={handleClose}
          onClearFiltersClick={onClearFiltersClick}
          onDateSelectClick={onDateSelectClick}
        />
      </Popover>
    </Fragment>
  );
};

export default SalesFilters;
