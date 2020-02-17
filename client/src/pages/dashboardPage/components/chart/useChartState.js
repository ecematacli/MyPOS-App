import { useState } from 'react';

export default (fetchRevenueData, disabledOptions) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [displayOption, setDisplayOption] = useState('daily');

  //Display options popover handlers
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //Display option select click handler
  const onDisplayOptionClick = option => {
    setDisplayOption(option);
    !disabledOptions[option] && fetchRevenueData(option);
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
