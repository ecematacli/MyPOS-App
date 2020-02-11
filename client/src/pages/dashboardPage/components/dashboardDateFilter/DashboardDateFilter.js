import React, { Fragment } from 'react';
import {
  TextField,
  InputAdornment,
  Popover,
  IconButton
} from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import styles from './styles';
import useDatePickerState from './useDatePickerState';
import DatePickerFilter from '../../../../common/components/datePickerFilter/DatePickerFilter';

const DashboardDateFilter = () => {
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
  } = useDatePickerState();

  const renderFilterContent = () => {
    return (
      <div className={classes.datePickerContainer}>
        <div>
          <DatePicker
            autoOk
            orientation="landscape"
            variant="static"
            openTo="date"
            // value={date}
            // onChange={changeDate}
          />
        </div>
        <div>
          <DatePicker
            autoOk
            orientation="landscape"
            variant="static"
            openTo="date"
            // value={date}
            // onChange={changeDate}
          />
        </div>
      </div>
    );
  };

  return (
    <div className={classes.inputContainer}>
      <TextField
        label="Select Date"
        color="secondary"
        classes={{ root: classes.input }}
        onClick={handleClick}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <ArrowDropDownIcon />
              </IconButton>
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
          onClearFiltersClick={onClearFiltersClick}
          onDateSelectClick={onDateSelectClick}
        />
      </Popover>
    </div>
  );
};

export default DashboardDateFilter;
