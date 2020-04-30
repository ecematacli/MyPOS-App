import React, { useState, Fragment } from 'react';
import { Button, Typography, OutlinedInput, Checkbox } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import styles from './styles';
import { CountingActionsBarProps } from '../../types';
import history from '../../../../history';
import AutoCompleteProductSearchBar from '../../../../common/components/autoCompleteProductSearchBar';

const CountingActionsBar: React.FC<CountingActionsBarProps> = ({
  batchId,
  countBatch,
  selectedRow,
  batchProducts,
  query,
  setQuery,
  countInputRef,
}) => {
  const classes = styles();
  const [checked, setChecked] = useState(false);

  const { products } = batchProducts;

  const handleCheckedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  const renderTitle = () => (
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
  );

  const renderCountInput = () => (
    <div className={classes.countInputAction}>
      <OutlinedInput
        inputRef={countInputRef}
        classes={{
          root: classes.inputRoot,
          input: classes.input,
        }}
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
      {renderTitle()}
      <div className={classes.countingContainer}>
        {/*to be completed..*/}
        {/*
        // @ts-ignore */}
        <AutoCompleteProductSearchBar
          className={classes.searchBar}
          options={products}
          query={query}
          onQueryChange={setQuery}
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
