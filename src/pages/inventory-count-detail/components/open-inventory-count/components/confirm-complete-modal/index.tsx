import React from 'react'
import { Dialog, Button, Typography, Box } from '@mui/material'
import { ContentContainer, StyledButton, TitleContainer } from './styles'
import { BatchesProductsData } from '../../types'
import Warning from '@mui/icons-material/Warning'
import PlaylistAddCheck from '@mui/icons-material/PlaylistAddCheck'
import Alert from '@mui/material/Alert'

interface Props {
  open: boolean
  onClose: () => void
  batchProducts: BatchesProductsData
  complete: () => void
  error: any
}

export const ConfirmCompleteModal: React.FC<Props> = ({
  open,
  onClose,
  batchProducts: { uncounted, counted },
  complete,
  error,
}) => {
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
      <Box display='flex' flexDirection='column'>
        <TitleContainer>
          <Typography variant='body1'>Complete Inventory Count</Typography>
        </TitleContainer>
        {error && <Alert severity='error'>{error.toString()}</Alert>}
        <ContentContainer>
          <Box display='flex' flexDirection='column'>
            <Box display='flex' alignItems='center' padding={[1, 0]}>
              {m.icon}
              <Typography
                color={m.error ? 'error' : 'primary'}
                style={{ marginLeft: 8 }}>
                {m.message}
              </Typography>
            </Box>
            <Typography>
              Counts of uncounted items will be set to zero. After completion
              inventory levels will be adjusted immediately. Updated inventory
              levels will be sent to the e-commerce store in batches of 40
              products. This may take some time.
            </Typography>
          </Box>
        </ContentContainer>
        <Box display='flex' justifyContent='flex-end' padding={[1, 2]}>
          <Button variant='contained' onClick={onClose}>
            Cancel
          </Button>
          <StyledButton color='primary' variant='contained' onClick={complete}>
            Complete
          </StyledButton>
        </Box>
      </Box>
    </Dialog>
  )
}
