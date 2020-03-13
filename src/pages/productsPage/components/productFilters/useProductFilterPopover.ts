import { useState } from 'react';

export default () => {
  const [anchorEl, setAnchorEl] = useState<
    null | Element | ((element: Element) => Element)
  >(null);

  // Popup state handlers
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return {
    anchorEl,
    handleClick,
    handleClose,
    open
  };
};
