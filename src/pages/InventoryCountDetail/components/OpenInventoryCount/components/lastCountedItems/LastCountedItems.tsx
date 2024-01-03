import React, { Fragment } from 'react'
import {
  Typography,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material'

import styles from './styles'
import inventoryImage from '../../../../../../assets/img/stocktake-emptylist-v1.png'
import { LastCountedProduct } from '../../types'
import { Align } from '../../../../../../common/components/Align'
import { ExpandMore } from '@material-ui/icons'
import { productNameWithVariation } from '../../../../../../common/utils'
import { formatDistance } from 'date-fns'

export interface LastCountedItemsProps {
  lastCountedItems: LastCountedProduct[]
}

const LastCountedItems: React.FC<LastCountedItemsProps> = ({
  lastCountedItems,
}) => {
  const classes = styles()

  const renderItems = () =>
    lastCountedItems
      .slice(0, 30)
      .map(({ id, name, counted, variation, sku, barcode, countedAt }, i) => (
        <Accordion key={id + countedAt}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Align align='center'>
              <span className={classes.countNumber}>{counted}</span>
              <Typography variant='caption'>
                {productNameWithVariation(name, variation)}
              </Typography>
            </Align>
          </AccordionSummary>
          <AccordionDetails>
            <Align vertical>
              <Typography variant='caption'>
                <span className={classes.bold}>Sku:</span>
                {sku}
              </Typography>
              <Typography variant='caption'>
                <span className={classes.bold}>Barcode:</span>
                {barcode}
              </Typography>
              <Typography variant='caption'>
                <span className={classes.bold}>Counted At:</span>
                {formatDistance(new Date(countedAt), new Date(), {
                  includeSeconds: true,
                })}{' '}
                ago
              </Typography>
            </Align>
          </AccordionDetails>
        </Accordion>
      ))

  const renderInventoryImg = () => (
    <div className={classes.imageDiv}>
      <img src={inventoryImage} />
    </div>
  )

  return (
    <div className={classes.lastCountedContainer}>
      <Fragment>
        <div className={classes.titleDiv}>
          <Typography className={classes.title}>Last Counted Items</Typography>
        </div>
        <Divider className={classes.divider} />
      </Fragment>
      {lastCountedItems.length > 0 ? renderItems() : renderInventoryImg()}
    </div>
  )
}

export default LastCountedItems
