import React, { useState } from 'react';
import { DatePicker } from '@material-ui/pickers';
import { InputAdornment } from '@material-ui/core';
import InsertInvitationIcon from '@material-ui/icons/InsertInvitation';

import styles from './styles';

const DatePickerInput = () => {
  const classes = styles();
  const [selectedStartDate, handleStartDateChange] = useState(new Date());
  const [selectedEndDate, handleEndDateChange] = useState(new Date());

  return (
    <React.Fragment>
      <span className={classes.datePickerInput}>
        <DatePicker
          variant="inline"
          color="secondary"
          label="Start Date"
          autoOk
          value={selectedStartDate}
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
      <span className={classes.datePickerInput}>
        <DatePicker
          variant="inline"
          color="secondary"
          label="End Date"
          autoOk
          value={selectedEndDate}
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
    </React.Fragment>
  );
};

export default DatePickerInput;
