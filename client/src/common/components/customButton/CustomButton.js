import React from 'react';

import { StyledButton } from './CustomButtonStyles';

const CustomButton = ({ children, ...props }) => (
  <StyledButton {...props}>{children}</StyledButton>
);

export default CustomButton;
