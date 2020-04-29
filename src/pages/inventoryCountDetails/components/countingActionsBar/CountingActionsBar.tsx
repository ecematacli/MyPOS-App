import React, { useState, Fragment, useEffect } from 'react';
import { Button, Typography, OutlinedInput, Checkbox } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import styles from './styles';
import { BatchData, BatchesProductsData } from '../../types';
import history from '../../../../history';
import AutoCompleteProductSearchBar from '../../../../common/components/autoCompleteProductSearchBar';

interface Props {
  batchId: string;
  countBatch: BatchData;
  batchProducts: BatchesProductsData;
  selectedRow: {
    [id: string]: boolean;
  };
}

const CountingActionsBar: React.FC<Props> = ({
  batchId,
  countBatch,
  selectedRow,
  batchProducts: { products },
}) => {
  const classes = styles();
  const [checked, setChecked] = useState(false);

  const handleCheckedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  const renderCountInput = () => (
    <div className={classes.countInputAction}>
      <OutlinedInput
        classes={{ root: classes.inputRoot, input: classes.input }}
        color="secondary"
        value={1}
      />
      <Button
        classes={{ root: classes.countBtnRoot }}
        className={classes.countBtn}>
        <Typography className={classes.btnText}>Count</Typography>
      </Button>
    </div>
  );

  return (
    <Fragment>
      <div className={classes.titleDiv}>
        <span
          className={classes.iconDiv}
          onClick={() => history.push('/inventory/count')}>
          <ArrowBackIcon className={classes.backArrow} />
        </span>
        <Typography className={classes.titleText}>
          {countBatch && countBatch.name}
        </Typography>
      </div>
      <div className={classes.countingContainer}>
        {/*to be completed..*/}
        {/*
        // @ts-ignore */}
        <AutoCompleteProductSearchBar
          className={classes.searchBar}
          options={products}
        />
        {!checked && renderCountInput()}
        <div className={classes.countInputAction}>
          <Checkbox
            color="primary"
            checked={checked}
            onChange={handleCheckedChange}
            disableRipple
          />
          <Typography className={classes.modeText}>Quick-scan mode</Typography>
        </div>
      </div>
    </Fragment>
  );
};

export default CountingActionsBar;
