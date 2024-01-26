import React from 'react'

import { StyledButton } from './custom-button.styles'

export interface ButtonProps {
  children: React.ReactNode
  disabled?: boolean
  type?: 'submit' | 'button'
  fullWidth?: boolean
  classes?: Partial<Record<'root', string>>
  className?: any
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const CustomButton: React.FC<ButtonProps> = ({ children, ...props }) => (
  <StyledButton sx={{ root: 'disabled' }} {...props}>
    {children}
  </StyledButton>
)
