import { useState } from 'react';

export default () => {
  const [anchorEl, setAnchorEl] = useState<
    null | Element | ((element: Element) => Element)
  >(null);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open: boolean = Boolean(anchorEl);

  return {
    open,
    anchorEl,
    handleClick,
    handleClose
  };
};
