import React, { useState, Fragment } from 'react';
import { Button, Typography, OutlinedInput, Checkbox } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import styles from './styles';
import { CountingActionsBarProps } from '../../types';
import history from '../../../../history';
import { capitalizeFirstLetters, formatDate } from '../../../../common/utils';
import AutoCompleteProductSearchBar from '../../../../common/components/autoCompleteProductSearchBar';

const CountingActionsBar: React.FC<CountingActionsBarProps> = ({
  batch,
  open,
  setOpen,
  query,
  handleQueryChange,
  loading,
  onProductSelect,
  productNotFound,
  countInputRef,
  itemCount,
  setItemCount,
  selectedProduct,
  searchResults,
  setSearchResults,
  handleCountClick,
}) => {
  const classes = styles();
  const [checked, setChecked] = useState(false);

  const handleCheckedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  const onCountInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === '') {
      setItemCount(value as any);
      return;
    }

    setItemCount(parseInt(value));
  };

  const renderTitle = () => (
    <div className={classes.titleDiv}>
      <span
        className={classes.iconDiv}
        onClick={() => history.push('/inventory/count')}>
        <ArrowBackIcon className={classes.backArrow} />
      </span>
      <Typography className={classes.titleText}>
        {batch &&
          (batch.name
            ? capitalizeFirstLetters(batch.name)
            : `Count on ${formatDate(batch.started, 'd MMMM y - p')}`)}
      </Typography>
    </div>
  );

  const renderCountInput = () => (
    <div className={classes.countInputAction}>
      <OutlinedInput
        inputRef={countInputRef}
        className={classes.numberSpinner}
        classes={{
          root: classes.inputRoot,
          input: classes.input,
        }}
        type="number"
        color="secondary"
        value={itemCount}
        onChange={onCountInputChange}
      />
      <Button
        disabled={!selectedProduct}
        onClick={handleCountClick}
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
        <AutoCompleteProductSearchBar
          className={classes.searchBar}
          open={open}
          onClose={() => {
            setOpen(false);
            setSearchResults([]);
          }}
          loading={loading}
          options={searchResults}
          onProductChange={onProductSelect}
          query={query}
          onQueryChange={handleQueryChange}
          productNotFound={productNotFound}
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
