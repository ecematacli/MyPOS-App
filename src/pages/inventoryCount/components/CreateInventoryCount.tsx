import React, { Fragment } from 'react';
import { Paper, Typography, IconButton } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import styles from './styles';
import history from '../../../history';
import CustomButton from '../../../common/components/customButton/CustomButton';

const CreateInventoryCount: React.FC = () => {
  const classes = styles();
  return (
    <Fragment>
      <div className={classes.titleDiv}>
        <div
          className={classes.iconDiv}
          onClick={() => history.push('/inventory/count')}
        >
          <ArrowBackIcon className={classes.backArrow} />
        </div>
        <Typography className={classes.title}>Add Inventory Count</Typography>
      </div>
      <Paper className={classes.addCountPaper}>
        <Typography className={classes.infoText}>
          Schedule a full or partial inventory count to maintain accurate
          inventory levels.
        </Typography>
        <CustomButton>
          <Typography className={classes.addCountBtnDiv}>
            Add Inventory Count
          </Typography>
        </CustomButton>
      </Paper>
    </Fragment>
  );
};

export default CreateInventoryCount;
