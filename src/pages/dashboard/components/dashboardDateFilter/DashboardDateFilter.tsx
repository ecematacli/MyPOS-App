import React from 'react'
import { TextField, InputAdornment, Box, Button } from '@material-ui/core'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'

import styles from './styles'
import { AppliedFilters } from '../../types'
import useDatePickerState from './useDatePickerState'
import CustomPopover from '../../../../common/components/customPopover'
import DatePickerFilter from '../../../../common/components/datePickerFilter'

interface DateFilterProps {
  startDate: Date
  handleStartDateChange: React.Dispatch<React.SetStateAction<Date>>
  endDate: Date
  handleEndDateChange: React.Dispatch<React.SetStateAction<Date>>
  onDateSelection: () => void
  onDateFilterClearing: () => void
  appliedFilters: AppliedFilters
}

const DashboardDateFilter: React.FC<DateFilterProps> = ({
  startDate,
  handleStartDateChange,
  endDate,
  handleEndDateChange,
  onDateSelection,
  onDateFilterClearing,
  appliedFilters,
}) => {
  const classes = styles()
  const {
    open,
    anchorEl,
    handleClick,
    handleClose,
    getDatePickerInputValue,
  } = useDatePickerState(appliedFilters)

  const onDateSelectClick = () => {
    onDateSelection()
    handleClose()
  }

  return (
    <div className={classes.inputContainer}>
      <TextField
        label='Select Date'
        color='secondary'
        value={getDatePickerInputValue()}
        classes={{ root: classes.input }}
        onClick={handleClick}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <ArrowDropDownIcon />
            </InputAdornment>
          ),
        }}
      />
      <CustomPopover open={open} anchorEl={anchorEl} onClose={handleClose}>
        <Box className={classes.dashboardFiltersContainer}>
          <DatePickerFilter
            startDate={startDate}
            handleStartDateChange={handleStartDateChange}
            endDate={endDate}
            handleEndDateChange={handleEndDateChange}
          />
          <Box className={classes.filterBtnDiv}>
            <Button
              className={classes.filterBtn}
              color='secondary'
              onClick={handleClose}>
              Cancel
            </Button>
            <Button
              className={classes.filterBtn}
              color='secondary'
              disabled={!startDate && !endDate}
              onClick={onDateFilterClearing}>
              Clear Filters
            </Button>
            <Button
              onClick={onDateSelectClick}
              disabled={!startDate || !endDate}
              className={classes.filterBtn}
              color='primary'>
              Apply filter
            </Button>
          </Box>
        </Box>
      </CustomPopover>
    </div>
  )
}

export default DashboardDateFilter
