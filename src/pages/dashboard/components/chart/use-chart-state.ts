import { useState } from 'react'

import { AppliedFilters } from '../../types'

interface DisabledOptions {
  [key: string]: boolean
}
interface IArgs {
  fetchRevenueData: (
    displayOption: string,
    start: Date,
    end: Date
  ) => Promise<void>
  appliedFilters: AppliedFilters
  disabledOptions?: DisabledOptions
}

export const useChartState = ({
  fetchRevenueData,
  disabledOptions,
  appliedFilters,
}: IArgs) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [displayOption, setDisplayOption] = useState('daily')

  const { startDate, endDate } = appliedFilters

  //Display options popover handlers
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  //Display option select click handler
  const onDisplayOptionClick = (option: string) => {
    setDisplayOption(option)
    !disabledOptions?.[option] && fetchRevenueData(option, startDate, endDate)
    handleClose()
  }

  return {
    open: Boolean(anchorEl),
    anchorEl,
    handleClick,
    handleClose,
    displayOption,
    onDisplayOptionClick,
  }
}
