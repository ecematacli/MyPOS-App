import React from 'react'
import { Snackbar, Slide, SlideProps } from '@mui/material'
import Alert, { AlertProps } from '@mui/material/Alert'

interface SnackbarProps {
  open: boolean
  handleClose: () => void
  snackbarContent: string
  severity: AlertProps['severity']
}

const TransitionLeft = (props: SlideProps) => (
  <Slide {...props} direction='left' />
)

export const NotificationSnackbar: React.FC<SnackbarProps> = ({
  open,
  handleClose,
  snackbarContent,
  severity,
}) => (
  <Snackbar
    open={open}
    autoHideDuration={3000}
    TransitionComponent={TransitionLeft}
    onClose={(e, reason) => {
      if (reason !== 'clickaway') {
        handleClose()
      }
    }}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
    <Alert
      elevation={6}
      variant='filled'
      onClose={handleClose}
      severity={severity}>
      {snackbarContent}
    </Alert>
  </Snackbar>
)
