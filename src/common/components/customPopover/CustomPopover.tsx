import React from 'react';
import { Popover, PopoverOrigin } from '@material-ui/core';

interface PopoverProps {
  children: React.ReactNode;
  anchorOrigin?: PopoverOrigin;
  transformOrigin?: PopoverOrigin;
  open: boolean;
  anchorEl: null | Element | ((element: Element) => Element);
  onClose: () => void;
  classes?: Partial<Record<'paper', string>>;
}

const CustomPopover: React.FC<PopoverProps> = ({
  children,
  anchorOrigin,
  transformOrigin,
  ...otherProps
}) => {
  if (!anchorOrigin && !transformOrigin) {
    return (
      <Popover
        {...otherProps}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        {children}
      </Popover>
    );
  }

  return (
    <Popover
      anchorEl
      {...otherProps}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
    >
      {children}
    </Popover>
  );
};

export default CustomPopover;
