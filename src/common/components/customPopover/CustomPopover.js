import React from 'react';
import { Popover } from '@material-ui/core';

const CustomPopover = ({
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
