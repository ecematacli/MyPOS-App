import React from 'react';

import { StyledButton } from './CustomButtonStyles';

export interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  type?: 'submit' | 'button';
  fullWidth?: boolean;
  classes?: Partial<Record<'root', string>>;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}


const CustomButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <StyledButton classes={{ root: 'disabled' }} {...props}>
      {children}
    </StyledButton>
  );
};

export default CustomButton;
