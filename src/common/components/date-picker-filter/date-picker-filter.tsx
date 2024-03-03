import React from 'react'
import { Box, Grid } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

import { DatePickerContainer, FilterCaption, GridContainer } from './styles'

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
    <React.Fragment>
      <FilterCaption>Add Start and End Date Filters...</FilterCaption>
      <GridContainer container spacing={3} pt={2}>
        <Grid item xs={12} md={6}>
          <DatePickerContainer component='span'>
            <DatePicker
              sx={{ width: '100%' }}
              label='Start Date'
              value={startDate}
              onChange={(date: Date) => handleStartDateChange(date)}
            />
          </DatePickerContainer>
        </Grid>
        <Grid item xs={12} md={6}>
          <DatePickerContainer component='span'>
            <DatePicker
              sx={{ width: '100%' }}
              label='End Date'
              value={endDate}
              onChange={(date: Date) => handleEndDateChange(date)}
            />
          </DatePickerContainer>
        </Grid>
      </GridContainer>
    </React.Fragment>
  )
}
