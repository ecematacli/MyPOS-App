import React from 'react'
import { TextField, InputAdornment } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

import {
  FilterButton,
  FilterButtonContainer,
  FilterContainer,
  InputContainer,
} from './dasboard-date-filter-styles'
import { AppliedFilters } from '../../types'
import { useDatePicker } from './use-date-picker'
import { CustomPopover } from '../../../../common/components/custom-popover/custom-popover'
import { DatePickerFilter } from '../../../../common/components/date-picker-filter/date-picker-filter'

interface DateFilterProps {
  startDate: Date
  handleStartDateChange: React.Dispatch<React.SetStateAction<Date>>
  endDate: Date
  handleEndDateChange: React.Dispatch<React.SetStateAction<Date>>
  onDateSelection: () => void
  onDateFilterClearing: () => void
  appliedFilters: AppliedFilters
}

export const DashboardDateFilter: React.FC<DateFilterProps> = ({
  startDate,
  handleStartDateChange,
  endDate,
  handleEndDateChange,
  onDateSelection,
  onDateFilterClearing,
  appliedFilters,
}) => {
  const {
    open,
    anchorEl,
    handleClick,
    handleClose,
    getDatePickerInputValue,
  } = useDatePicker(appliedFilters)

  const onDateSelectClick = () => {
    onDateSelection()
    handleClose()
  }

  return (
    <InputContainer>
      <TextField
        label='Select Date'
        color='secondary'
        value={getDatePickerInputValue()}
        sx={{ width: 245 }}
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
        <FilterContainer>
          <DatePickerFilter
            startDate={startDate}
            handleStartDateChange={handleStartDateChange}
            endDate={endDate}
            handleEndDateChange={handleEndDateChange}
          />
          <FilterButtonContainer>
            <FilterButton color='secondary' onClick={handleClose}>
              Cancel
            </FilterButton>
            <FilterButton
              color='secondary'
              disabled={!startDate && !endDate}
              onClick={onDateFilterClearing}>
              Clear Filters
            </FilterButton>
            <FilterButton
              onClick={onDateSelectClick}
              disabled={!startDate || !endDate}
              color='primary'>
              Apply filter
            </FilterButton>
          </FilterButtonContainer>
        </FilterContainer>
      </CustomPopover>
    </InputContainer>
  )
}
