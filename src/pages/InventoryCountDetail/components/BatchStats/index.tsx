import React, { FC } from 'react'
import { Align } from '../../../../common/components/Align'
import { BatchData } from '../OpenInventoryCount/types'
import { formatDate } from '../../../../common/utils'
import { makeStyles } from '@material-ui/core'

interface Props {
  batch: BatchData
}

const styles = makeStyles(({ spacing }) => ({
  field: {
    marginBottom: spacing(0.5),
    '& > span': {
      fontWeight: 600,
    },
  },
}))

export const BatchStats: FC<Props> = ({ batch }) => {
  const classes = styles()
  return (
    <Align margin={[1, 0]}>
      <Align vertical margin={[0, 2, 0, 0]}>
        <Align className={classes.field} justify='space-between' width={10}>
          <span>Start:</span>
          {formatDate(batch.started, 'd MMM yyyy')}
        </Align>
        <Align className={classes.field} justify='space-between' width={10}>
          <span>End:</span>
          {batch.finished ? formatDate(batch.finished, 'd MMM yyyy') : '-'}
        </Align>
      </Align>
      <Align vertical>
        <Align className={classes.field} justify='space-between' width={15}>
          <span>Category:</span>
          {batch.category || '-'}
        </Align>
        <Align className={classes.field} justify='space-between' width={15}>
          <span>Brand:</span>
          {batch.brand || '-'}
        </Align>
      </Align>
    </Align>
  )
}
