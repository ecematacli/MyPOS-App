import React from 'react';
import { Popover, PopoverOrigin } from '@material-ui/core';

interface Props {
  children: React.ReactNode;
  anchorOrigin: PopoverOrigin;
  transformOrigin: PopoverOrigin;
  open: boolean;
  onClose: () => void;
  classes: Partial<Record<'paper', string>>;
}

const CustomPopover: React.FC<Props> = ({
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
      {...otherProps}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
    >
      {children}
    </Popover>
  );
};

export default CustomPopover;
