import React, { FC } from 'react'
import { Done, Close } from '@material-ui/icons'

interface Props {
  synced: boolean
}

export const SyncedIcon: FC<Props> = ({ synced }) => {
  return synced ? <Done color='primary' /> : <Close color='error' />
}

