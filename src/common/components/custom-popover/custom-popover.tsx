import React from 'react'
import { Popover, PopoverOrigin, SxProps } from '@mui/material'

interface IPopoverProps {
  children: React.ReactNode
  anchorOrigin?: PopoverOrigin
  transformOrigin?: PopoverOrigin
  open: boolean
  anchorEl: null | Element
  onClose: () => void
  sx?: SxProps
}

export const CustomPopover: React.FC<IPopoverProps> = ({
  children,
  anchorOrigin = {
    vertical: 'bottom',
    horizontal: 'center',
  },
  transformOrigin = {
    vertical: 'top',
    horizontal: 'right',
  },
  ...otherProps
}) => (
  <Popover
    {...otherProps}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}>
    {children}
  </Popover>
)
