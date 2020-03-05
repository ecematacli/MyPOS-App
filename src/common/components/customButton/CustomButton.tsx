import React from 'react';

import { StyledButton } from './CustomButtonStyles';
import { ButtonProps } from './types';

const CustomButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <StyledButton classes={{ root: 'disabled' }} {...props}>
      {children}
    </StyledButton>
  );
};

export default CustomButton;
