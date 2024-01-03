import React, { Fragment, useContext } from 'react'
import FilterListIcon from '@material-ui/icons/FilterList'

import styles from './styles'
import useSalesFiltersPopover from './useSalesFiltersPopover'
import DatePickerFilter from '../../../../common/components/datePickerFilter'
import { CustomPopover } from '../../../../common/components/custom-popover/custom-popover'
import { Box, Button } from '@mui/material'
import CustomInput from '../../../../common/components/customInput'
import { Outlets, Outlet } from '../../../../api/outlets/types'
import { AuthContext } from '../../../../contexts/AuthContext'

interface FiltersProps {
  startDate: Date
  handleStartDateChange: (newDate: Date) => void
  endDate: Date
  handleEndDateChange: (newDate: Date) => void
  onDateFilterClearing: () => void
  onDateSelection: () => void
  outlets: Outlets
  selectedOutlet: Outlet
  handleOutletChange: (outletName: string) => void
}

const SalesFilters: React.FC<FiltersProps> = ({
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
  const classes = styles()
  const { open, anchorEl, handleClick, handleClose } = useSalesFiltersPopover()
  const { user, isAdmin } = useContext(AuthContext)

  const onApplyFilterClick = () => {
    onDateSelection()
    handleClose()
  }

  return (
    <Fragment>
      <Box className={classes.filterIconContainer}>
        <Box className={classes.filterIconDiv} onClick={handleClick}>
          <FilterListIcon className={classes.filterIcon} />
        </Box>
      </Box>
      <CustomPopover open={open} anchorEl={anchorEl} onClose={handleClose}>
        <Box className={classes.salesFilterContainer}>
          <DatePickerFilter
            startDate={startDate}
            handleStartDateChange={handleStartDateChange}
            endDate={endDate}
            handleEndDateChange={handleEndDateChange}
          />
          {isAdmin && (
            <CustomInput
              name={'Magaza'}
              label={'Outlet'}
              dropdown={true}
              classesProp={{
                dropdownInput: { root: classes.dropdownInput },
              }}
              dropdownItems={[{ name: 'All', id: 0 }, ...outlets]}
              value={selectedOutlet ? selectedOutlet.name : 'All'}
              onChange={({ target: { value } }) => handleOutletChange(value)}
              color='secondary'
            />
          )}
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
              onClick={onApplyFilterClick}
              disabled={!startDate && !endDate && !selectedOutlet}
              className={classes.filterBtn}
              color='primary'>
              Apply filter
            </Button>
          </Box>
        </Box>
      </CustomPopover>
    </Fragment>
  )
}

export default SalesFilters
