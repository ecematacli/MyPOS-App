import React from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import styles from './styles';
import { AppliedFilters } from '../../types';
import useDatePickerState from './useDatePickerState';
import CustomPopover from '../../../../common/components/customPopover';
import DatePickerFilter from '../../../../common/components/datePickerFilter';

interface DateFilterProps {
  startDate: Date;
  handleStartDateChange: React.Dispatch<React.SetStateAction<Date>>;
  endDate: Date;
  handleEndDateChange: React.Dispatch<React.SetStateAction<Date>>;
  onDateSelection: () => void;
  onDateFilterClearing: () => void;
  appliedFilters: AppliedFilters;
}

const DashboardDateFilter: React.FC<DateFilterProps> = ({
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
      <CustomPopover open={open} anchorEl={anchorEl} onClose={handleClose}>
        <DatePickerFilter
          startDate={startDate}
          handleStartDateChange={handleStartDateChange}
          endDate={endDate}
          handleEndDateChange={handleEndDateChange}
          handleClose={handleClose}
          onDateSelection={onDateSelection}
          onDateFilterClearing={onDateFilterClearing}
        />
      </CustomPopover>
    </div>
  );
};

export default DashboardDateFilter;
