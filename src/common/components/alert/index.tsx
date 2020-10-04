import React from 'react'
import { IconButton, Collapse } from '@material-ui/core';
import Alert, { Color } from '@material-ui/lab/Alert'
import CloseIcon from '@material-ui/icons/Close'

import styles from './styles'

interface Props {
  severity: Color
  open: boolean
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
  alertMessage: string
}

const AlertComponent: React.FC<Props> = ({
  severity,
  open,
  setOpen,
  alertMessage,
}) => {
  const classes = styles()

  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <Alert
          severity={severity}
          action={
            setOpen ? <IconButton
              aria-label='close'
              color='inherit'
              size='small'
              onClick={() => {
                setOpen(false)
              }}>
              <CloseIcon fontSize='inherit' />
            </IconButton> : null
          }>
          {alertMessage}
        </Alert>
      </Collapse>
    </div>
  )
}

export default AlertComponent
