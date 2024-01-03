import React from 'react'
import { IconButton, Collapse } from '@mui/material'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { styled } from '@mui/material/styles'

import CloseIcon from '@mui/icons-material/Close'

export const StyledAlertContainer = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(3),
  width: '100%',
  '&:first-child': {
    marginTop: 0,
  },
}))

interface IProps {
  severity: AlertProps['severity']
  open: boolean
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
  alertMessage: string
}

export const Alert: React.FC<IProps> = ({
  severity,
  open,
  setOpen,
  alertMessage,
}) => (
  <StyledAlertContainer>
    <Collapse in={open}>
      <MuiAlert
        severity={severity}
        action={
          setOpen ? (
            <IconButton
              aria-label='close'
              color='inherit'
              size='small'
              onClick={() => {
                setOpen(false)
              }}>
              <CloseIcon fontSize='inherit' />
            </IconButton>
          ) : null
        }>
        {alertMessage}
      </MuiAlert>
    </Collapse>
  </StyledAlertContainer>
)
