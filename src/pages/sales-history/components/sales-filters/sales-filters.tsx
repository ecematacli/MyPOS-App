import React, { Fragment, useContext } from 'react'
import { Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import {
  FilterButton,
  FilterButtonContainer,
  SalesFilterContainer,
  StyledContainer,
  StyledFilterListIcon,
  getDropdownInputStyles,
} from './sales-filters-styles'
import { useSalesFiltersPopover } from './use-sales-filters-popover'
import { DatePickerFilter } from '../../../../common/components/date-picker-filter/date-picker-filter'
import { CustomPopover } from '../../../../common/components/custom-popover/custom-popover'
import { CustomInput } from '../../../../common/components/custom-input/custom-input'
import { Outlets, Outlet } from '../../../../api/outlets/types'
import { AuthContext } from '../../../../contexts/auth-context'

interface FiltersProps {
  startDate: Date | null
  handleStartDateChange: (newDate: Date) => void
  endDate: Date | null
  handleEndDateChange: (newDate: Date) => void
  onDateFilterClearing: () => void
  onDateSelection: () => void
  outlets: Outlets
  selectedOutlet: Outlet
  handleOutletChange: (outletName: string) => void
}

export const SalesFilters: React.FC<FiltersProps> = ({
  startDate,
  handleStartDateChange,
  endDate,
  handleEndDateChange,
  selectedOutlet,
  handleOutletChange,
  onDateFilterClearing,
  onDateSelection,
  outlets,
}) => {
  const theme = useTheme()
  const { open, anchorEl, handleClick, handleClose } = useSalesFiltersPopover()
  const { isAdmin } = useContext(AuthContext)

  const onApplyFilterClick = () => {
    onDateSelection()
    handleClose()
  }

  return (
    <Fragment>
      <StyledContainer display='flex' justifyContent='flex-end'>
        <Box sx={{ cursor: 'pointer' }} onClick={handleClick}>
          <StyledFilterListIcon />
        </Box>
      </StyledContainer>
      <CustomPopover open={open} anchorEl={anchorEl} onClose={handleClose}>
        <SalesFilterContainer>
          <DatePickerFilter
            startDate={startDate}
            handleStartDateChange={handleStartDateChange}
            endDate={endDate}
            handleEndDateChange={handleEndDateChange}
          />
          {isAdmin && (
            <CustomInput
              dropdown
              color='secondary'
              name={'Magaza'}
              label={'Outlet'}
              classesProp={{
                dropdownInput: { root: getDropdownInputStyles(theme) },
              }}
              dropdownItems={[{ name: 'All', id: 0 }, ...outlets]}
              value={selectedOutlet ? selectedOutlet.name : 'All'}
              onChange={({ target: { value } }) => handleOutletChange(value)}
            />
          )}
          <FilterButtonContainer display='flex' justifyContent='flex-end'>
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
              onClick={onApplyFilterClick}
              disabled={!startDate && !endDate && !selectedOutlet}
              color='primary'>
              Apply filter
            </FilterButton>
          </FilterButtonContainer>
        </SalesFilterContainer>
      </CustomPopover>
    </Fragment>
  )
}
