import React, { Fragment } from 'react'
import { Typography, Divider } from '@material-ui/core'

import styles from './styles'
import inventoryImage from '../../../../assets/img/stocktake-emptylist-v1.png'
import { LastCountedProduct } from '../../types'
import { Align } from '../../../../common/components/Align'

export interface LastCountedItemsProps {
  lastCountedItems: LastCountedProduct[]
}

const LastCountedItems: React.FC<LastCountedItemsProps> = ({ lastCountedItems }) => {
  const classes = styles()

  const renderLastCountedItems = () =>
    lastCountedItems.slice(0, 30).map(({ id, name, counted, variation, sku, barcode }, i) => (
      <Fragment key={barcode + i}>
        <div className={classes.itemContainer}>
          <Align align='center'>
            <span className={classes.countNumber}>{counted}</span>
            <Align vertical>
              <div>
                {name}
                {variation ? ` / ${variation}` : ''}
              </div>
              <Align justify='space-between' className={classes.barcodeAndSku}>
                <span className={classes.bold}>Sku:</span>
                {sku}
                <span className={classes.bold}>Barcode:</span>
                {barcode}
              </Align>
            </Align>
          </Align>
        </div>
        <Divider />
      </Fragment>
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
      {lastCountedItems.length > 0 ? renderLastCountedItems() : renderInventoryImg()}
    </div>
  )
}

export default LastCountedItems
