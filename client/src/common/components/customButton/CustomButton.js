import React from 'react';

import { StyledButton } from './CustomButtonStyles';

const CustomButton = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

export default CustomButton;
