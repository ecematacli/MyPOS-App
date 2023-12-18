import React, { Fragment } from 'react'
import clsx from 'clsx'
import { DatePicker } from '@material-ui/pickers'

import { InputAdornment, Button, Typography, Box } from '@material-ui/core'
import InsertInvitationIcon from '@material-ui/icons/InsertInvitation'

import styles from './styles'

type DateChangeHandler = React.Dispatch<React.SetStateAction<Date>>

interface Props {
  startDate: Date
  handleStartDateChange: DateChangeHandler
  endDate: Date
  handleEndDateChange: DateChangeHandler
}

const DatePickerFilter: React.FC<Props> = ({
  startDate,
  handleStartDateChange,
  endDate,
  handleEndDateChange,
}) => {
  const classes = styles()

  return (
    <Fragment>
      <Typography className={classes.filterCaption}>
        Add Start and End Date Filters...
      </Typography>
      <Box>
        <span className={classes.datePickerSpan}>
          <DatePicker
            variant='inline'
            color='secondary'
            className={classes.datePickerInput}
            label='Start Date'
            autoOk
            value={startDate}
            onChange={date => handleStartDateChange(date)}
            InputProps={{
              endAdornment: (
                <React.Fragment>
                  <InputAdornment position='start'>
                    <InsertInvitationIcon className={classes.calendarIcon} />
                  </InputAdornment>
                </React.Fragment>
              ),
            }}
          />
        </span>
        <span className={clsx(classes.datePickerSpan, classes.endDate)}>
          <DatePicker
            variant='inline'
            color='secondary'
            label='End Date'
            className={classes.datePickerInput}
            autoOk
            value={endDate}
            onChange={date => handleEndDateChange(date)}
            InputProps={{
              endAdornment: (
                <React.Fragment>
                  <InputAdornment position='start'>
                    <InsertInvitationIcon className={classes.calendarIcon} />
                  </InputAdornment>
                </React.Fragment>
              ),
            }}
          />
        </span>
      </Box>
    </Fragment>
  )
}

export default DatePickerFilter
