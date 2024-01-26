import React from 'react'
import { Done, Close } from '@mui/icons-material'

export const SyncedIcon: React.FC<{ synced: boolean }> = ({ synced }) => {
  return synced ? <Done color='primary' /> : <Close color='error' />
}
