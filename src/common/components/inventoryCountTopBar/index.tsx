import React, { Fragment } from 'react';

import styles from './styles';

export interface Props {
  title: JSX.Element;
  inventoryCountActionsPaper: JSX.Element;
  type?: string;
}

const InventoryCountTopBar: React.FC<Props> = (props) => {
  const classes = styles(props);

  const { title, inventoryCountActionsPaper } = props;

  return (
    <Fragment>
      <div className={classes.titleContainer}>
        <div className={classes.titleWrapperDiv}>{title}</div>
      </div>
      <div className={classes.inventoryCountActionsContainer}>
        <div className={classes.actionSectionWrapper}>
          {inventoryCountActionsPaper}
        </div>
      </div>
    </Fragment>
  );
};

export default InventoryCountTopBar;
