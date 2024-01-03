import React, { Fragment } from 'react'
import clsx from 'clsx'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { InputAdornment, Button, Typography, Box } from '@mui/material'
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
            className={classes.datePickerInput}
            label='Start Date'
            value={startDate}
            onChange={date => handleStartDateChange(date)}
          />
        </span>
        <span className={clsx(classes.datePickerSpan, classes.endDate)}>
          <DatePicker
            label='End Date'
            className={classes.datePickerInput}
            value={endDate}
            onChange={date => handleEndDateChange(date)}
          />
        </span>
      </Box>
    </Fragment>
  )
}

export default DatePickerFilter
