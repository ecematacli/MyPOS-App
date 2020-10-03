import React from 'react'
import Alert from '@material-ui/lab/Alert'
import IconButton from '@material-ui/core/IconButton'
import Collapse from '@material-ui/core/Collapse'
import CloseIcon from '@material-ui/icons/Close'
import { Color } from '@material-ui/lab/Alert'

import styles from './styles'

interface Props {
  severity: Color
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  alertMessage: string
  alertContentComponent?: JSX.Element
}

const AlertComponent: React.FC<Props> = ({
  severity,
  open,
  setOpen,
  alertMessage,
  alertContentComponent
}) => {
  const classes = styles()

  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <Alert
          severity={severity}
          action={
            <IconButton
              aria-label='close'
              color='inherit'
              size='small'
              onClick={() => {
                setOpen(false)
              }}>
              <CloseIcon fontSize='inherit' />
            </IconButton>
          }>
          <span>{alertMessage}</span>
          {alertContentComponent && alertContentComponent}
        </Alert>
      </Collapse>
    </div>
  )
}

export default AlertComponent
