import React, { Fragment } from 'react'
import { Box } from '@mui/material'

import { DatePickerContainer, FilterCaption, StyledDatePicker } from './styles'

type DateChangeHandler = React.Dispatch<React.SetStateAction<Date>>

interface Props {
  startDate: Date
  handleStartDateChange: DateChangeHandler
  endDate: Date
  handleEndDateChange: DateChangeHandler
}

export const DatePickerFilter: React.FC<Props> = ({
  startDate,
  handleStartDateChange,
  endDate,
  handleEndDateChange,
}) => {
  return (
    <Fragment>
      <FilterCaption>Add Start and End Date Filters...</FilterCaption>
      <Box>
        <DatePickerContainer component='span'>
          <StyledDatePicker
            label='Start Date'
            value={startDate}
            onChange={(date: Date | null) => handleStartDateChange(date)}
          />
        </DatePickerContainer>
        <DatePickerContainer
          component='span'
          sx={theme => ({
            [theme.breakpoints.up('md')]: {
              marginLeft: 32,
            },
          })}>
          <StyledDatePicker
            label='End Date'
            value={endDate}
            onChange={(date: Date | null) => handleEndDateChange(date)}
          />
        </DatePickerContainer>
      </Box>
    </Fragment>
  )
}
