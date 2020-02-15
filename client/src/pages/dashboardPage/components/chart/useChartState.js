import { useState } from 'react';

export default () => {
  const [anchorEl, setAnchorEl] = useState(null);

  //Display options popover handler
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return {
    open,
    anchorEl,
    handleClick,
    handleClose
  };
};
