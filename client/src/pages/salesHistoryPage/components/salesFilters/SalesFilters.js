import React, { Fragment } from 'react';
import FilterListIcon from '@material-ui/icons/FilterList';

import styles from './styles';
import useSalesFiltersState from './useSalesFiltersState';
import DatePickerFilter from '../../../../common/components/datePickerFilter/DatePickerFilter';
import CustomPopover from '../../../../common/components/customPopover/CustomPopover';

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
      <CustomPopover open={open} anchorEl={anchorEl} onClose={handleClose}>
        <DatePickerFilter
          startDate={startDate}
          handleStartDateChange={handleStartDateChange}
          endDate={endDate}
          handleEndDateChange={handleEndDateChange}
          handleClose={handleClose}
          onClearFiltersClick={onClearFiltersClick}
          onDateSelectClick={onDateSelectClick}
        />
      </CustomPopover>
    </Fragment>
  );
};

export default SalesFilters;
