import React from 'react';

import { StyledButton } from './CustomButtonStyles';

const CustomButton = ({ children, ...props }) => {
  return (
    <StyledButton classes={{ root: 'disabled' }} {...props}>
      {children}
    </StyledButton>
  );
};

export default CustomButton;
