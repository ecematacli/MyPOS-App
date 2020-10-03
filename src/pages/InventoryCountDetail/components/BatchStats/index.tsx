import React from 'react'

import styles from './styles'
import { Align } from '../../../../common/components/Align'
import { BatchData } from '../OpenInventoryCount/types'
import { formatDate } from '../../../../common/utils'

interface Props {
  batch: BatchData
}

export const BatchStats: React.FC<Props> = ({ batch }) => {
  const classes = styles()
  return (
    <div className={classes.statsSectionWrapper}>
      <Align margin={[1, 0, 2]}>
        <Align vertical margin={[0, 3.5, 0, 0]}>
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
          <Align className={classes.field} justify='space-between' width={10}>
            <span>Category:</span>
            {batch.category || '-'}
          </Align>
          <Align className={classes.field} justify='space-between' width={10}>
            <span>Brand:</span>
            {batch.brand || '-'}
          </Align>
        </Align>
      </Align>
    </div>
  )
}
