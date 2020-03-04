import React from 'react';

import { StyledButton } from './CustomButtonStyles';

interface Props {
  children: React.ReactNode;
  disabled?: boolean;
  type?: 'submit' | 'button';
  fullWidth?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const CustomButton: React.FC<Props> = ({ children, ...props }) => {
  return (
    <StyledButton classes={{ root: 'disabled' }} {...props}>
      {children}
    </StyledButton>
  );
};

export default CustomButton;
