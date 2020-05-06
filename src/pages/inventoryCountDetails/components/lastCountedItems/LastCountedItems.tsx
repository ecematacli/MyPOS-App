import React, { Fragment } from 'react';
import { Typography, Divider } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import styles from './styles';
import { LastCountedItemsProps } from '../../types';
import inventoryImage from '../../../../assets/img/stocktake-emptylist-v1.png';

const LastCountedItems: React.FC<LastCountedItemsProps> = ({
  lastCountedItems,
  handleDeleteClick,
}) => {
  const classes = styles();

  const renderTitle = () => (
    <Fragment>
      <div className={classes.titleDiv}>
        <Typography className={classes.title}>Last Counted Items</Typography>
      </div>
      <Divider className={classes.divider} />
    </Fragment>
  );

  const renderLastCountedItems = () =>
    lastCountedItems.map(({ id, name, counted, barcode }, i) => (
      <Fragment key={barcode + i}>
        <div className={classes.itemContainer}>
          <div className={classes.itemInfo}>
            <span className={classes.countNumber}>{counted}</span>
            <div>{name}</div>
          </div>
          <span onClick={() => handleDeleteClick(id, i)}>
            <DeleteIcon className={classes.deleteIcon} />
          </span>
        </div>
        <Divider />
      </Fragment>
    ));

  const renderInventoryImg = () => (
    <div className={classes.imageDiv}>
      <img src={inventoryImage} />
    </div>
  );

  return (
    <div className={classes.lastCountedContainer}>
      {renderTitle()}
      {lastCountedItems.length > 0
        ? renderLastCountedItems()
        : renderInventoryImg()}
    </div>
  );
};

export default LastCountedItems;
