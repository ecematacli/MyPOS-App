import { useState } from 'react';
import { AppliedFilters } from '../../types';

interface DisabledOptions {
  [key: string]: boolean;
}

export default (
  fetchRevenueData: (
    displayOption: string,
    start: Date,
    end: Date
  ) => Promise<void>,
  disabledOptions: DisabledOptions,
  appliedFilters: AppliedFilters
) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [displayOption, setDisplayOption] = useState('daily');

  const { startDate, endDate } = appliedFilters;

  //Display options popover handlers
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //Display option select click handler
  const onDisplayOptionClick = (option: string) => {
    setDisplayOption(option);
    !disabledOptions[option] && fetchRevenueData(option, startDate, endDate);
    handleClose();
  };

  const open = Boolean(anchorEl);

  return {
    open,
    anchorEl,
    handleClick,
    handleClose,
    displayOption,
    onDisplayOptionClick
  };
};
