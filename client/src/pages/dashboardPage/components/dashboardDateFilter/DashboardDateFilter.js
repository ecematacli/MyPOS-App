import React from 'react';
import { TextField, InputAdornment, Popover } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import styles from './styles';
import useDatePickerState from './useDatePickerState';
import DatePickerFilter from '../../../../common/components/datePickerFilter/DatePickerFilter';

const DashboardDateFilter = ({
  startDate,
  handleStartDateChange,
  endDate,
  handleEndDateChange,
  onDateSelection,
  onDateFilterClearing,
  appliedFilters
}) => {
  const classes = styles();
  const {
    open,
    anchorEl,
    handleClick,
    handleClose,
    getDatePickerInputValue
  } = useDatePickerState(appliedFilters);

  return (
    <div className={classes.inputContainer}>
      <TextField
        label="Select Date"
        color="secondary"
        value={getDatePickerInputValue()}
        classes={{ root: classes.input }}
        onClick={handleClick}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <ArrowDropDownIcon />
            </InputAdornment>
          )
        }}
      />
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
          horizontal: 'center'
        }}
      >
        <DatePickerFilter
          startDate={startDate}
          handleStartDateChange={handleStartDateChange}
          endDate={endDate}
          handleEndDateChange={handleEndDateChange}
          handleClose={handleClose}
          onDateSelection={onDateSelection}
          onDateFilterClearing={onDateFilterClearing}
        />
      </Popover>
    </div>
  );
};

export default DashboardDateFilter;
