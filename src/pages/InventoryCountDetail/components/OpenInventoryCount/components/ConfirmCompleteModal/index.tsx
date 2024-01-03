import React, { FC } from 'react'
import { Dialog, DialogTitle, Button, Typography } from '@mui/material'
import styles from './styles'
import { Align } from '../../../../../../common/components/Align'
import { BatchesProductsData } from '../../types'
import { Warning, PlaylistAddCheck } from '@material-ui/icons'
import Alert from '@material-ui/lab/Alert'

interface Props {
  open: boolean
  onClose: () => void
  batchProducts: BatchesProductsData
  complete: () => void
  error: any
}

export const ConfirmCompleteModal: FC<Props> = ({
  open,
  onClose,
  batchProducts: { uncounted, counted },
  complete,
  error,
}) => {
  const classes = styles()

  const message = () => {
    if (uncounted > 0) {
      return {
        message: `There ${
          uncounted === 1 ? 'is' : 'are'
        } ${uncounted} uncounted product${uncounted === 1 ? '' : 's'}`,
        icon: <Warning color='error' />,
        error: true,
      }
    } else if (counted === 0) {
      return {
        message: 'None of the products are counted',
        icon: <Warning color='error' />,
        error: true,
      }
    } else if (uncounted === 0) {
      return {
        message: 'All of the products are counted',
        icon: <PlaylistAddCheck color='primary' />,
        error: false,
      }
    }
    return {}
  }

  const m = message()
  return (
    <Dialog onClose={onClose} open={open}>
      <Align vertical>
        <div className={classes.title}>
          <Typography variant='body1'>Complete Inventory Count</Typography>
        </div>
        {error && <Alert severity='error'>{error.toString()}</Alert>}
        <div className={classes.content}>
          <Align vertical>
            <Align align='center' padding={[1, 0]}>
              {m.icon}
              <Typography
                color={m.error ? 'error' : 'primary'}
                style={{ marginLeft: 8 }}>
                {m.message}
              </Typography>
            </Align>
            <Typography>
              Counts of uncounted items will be set to zero. After completion
              inventory levels will be adjusted immediately. Updated inventory
              levels will be sent to the e-commerce store in batches of 40
              products. This may take some time.
            </Typography>
          </Align>
        </div>
        <Align justify='flex-end' padding={[1, 2]}>
          <Button variant='contained' onClick={onClose}>
            Cancel
          </Button>
          <Button
            color='primary'
            variant='contained'
            className={classes.button}
            onClick={complete}>
            Complete
          </Button>
        </Align>
      </Align>
    </Dialog>
  )
}
