import React, { Fragment } from 'react';
import clsx from 'clsx';
import { DatePicker } from '@material-ui/pickers';
import { InputAdornment, Button } from '@material-ui/core';
import InsertInvitationIcon from '@material-ui/icons/InsertInvitation';

import styles from './styles';

const DatePickerFilter = ({
  startDate,
  handleStartDateChange,
  endDate,
  handleEndDateChange,
  handleClose,
  onDateSelection,
  onDateFilterClearing
}) => {
  const classes = styles();

  const noAppliedFilter = !startDate && !endDate;

  const onDateSelectClick = () => {
    onDateSelection();
    handleClose();
  };

  const renderDatePickerInputs = () => (
    <Fragment>
      <span className={classes.datePickerSpan}>
        <DatePicker
          variant="inline"
          color="secondary"
          className={classes.datePickerInput}
          label="Start Date"
          autoOk
          value={startDate}
          onChange={date => handleStartDateChange(date)}
          InputProps={{
            endAdornment: (
              <React.Fragment>
                <InputAdornment position="start">
                  <InsertInvitationIcon className={classes.calendarIcon} />
                </InputAdornment>
              </React.Fragment>
            )
          }}
        />
      </span>
      <span className={clsx(classes.datePickerSpan, classes.endDate)}>
        <DatePicker
          variant="inline"
          color="secondary"
          label="End Date"
          className={classes.datePickerInput}
          autoOk
          value={endDate}
          onChange={date => handleEndDateChange(date)}
          InputProps={{
            endAdornment: (
              <React.Fragment>
                <InputAdornment position="start">
                  <InsertInvitationIcon className={classes.calendarIcon} />
                </InputAdornment>
              </React.Fragment>
            )
          }}
        />
      </span>
    </Fragment>
  );

  const renderFilterActionButtons = () => (
    <div className={classes.filterBtnDiv}>
      <div>
        <Button
          className={classes.filterBtn}
          color="secondary"
          onClick={handleClose}
        >
          Cancel
        </Button>
      </div>
      <div>
        <Button
          className={classes.filterBtn}
          color="secondary"
          disabled={noAppliedFilter}
          onClick={onDateFilterClearing}
        >
          Clear Filters
        </Button>
      </div>
      <div>
        <Button
          onClick={onDateSelectClick}
          disabled={noAppliedFilter}
          className={classes.filterBtn}
          color="primary"
        >
          Apply filter
        </Button>
      </div>
    </div>
  );

  return (
    <Fragment>
      <div className={classes.filterCaption}>
        Add Start and End Date Filters...
      </div>
      <div className={classes.filterPaper}>
        {renderDatePickerInputs()}
        {renderFilterActionButtons()}
      </div>
    </Fragment>
  );
};

export default DatePickerFilter;
