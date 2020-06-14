import React, { useState, Fragment, SetStateAction, Dispatch, useEffect } from 'react'
import { Button, Typography, OutlinedInput, Checkbox } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import styles from './styles'
import { ChangeEvent, BatchData, BatchProduct } from '../../types'
import history from '../../../../history'
import { capitalizeFirstLetters, formatDate } from '../../../../common/utils'
import AutoCompleteProductSearchBar from '../../../../common/components/autoCompleteProductSearchBar'
import InventoryCountTopBar from '../../../../common/components/inventoryCountTopBar'

interface CountingActionsBarProps {
  batch: BatchData
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  loading: boolean
  onProductSelect: (product: BatchProduct) => void
  query: string
  handleQueryChange: (productName: string) => void
  searchResults: BatchProduct[]
  setSearchResults: React.Dispatch<React.SetStateAction<BatchProduct[]>>
  productNotFound: boolean
  countInputRef: React.MutableRefObject<HTMLInputElement>
  itemCount: number
  selectedProduct: BatchProduct
  setItemCount: Dispatch<SetStateAction<number>>
  countProduct: (p: BatchProduct) => void
  isQuickScanMode: boolean
  setIsQuickScanMode: (m: boolean) => void
}

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
  countProduct,
  isQuickScanMode,
  setIsQuickScanMode,
}) => {
  const classes = styles(isQuickScanMode)

  const handleCheckedChange = (e: ChangeEvent) => {
    setIsQuickScanMode(e.target.checked)
  }

  const onCountInputChange = (e: ChangeEvent) => {
    const value = e.target.value

    if (value === '') {
      setItemCount(value as any)
      return
    }

    setItemCount(parseInt(value))
  }

  const renderCountInput = () => (
    <div className={classes.countInputAction}>
      <OutlinedInput
        inputRef={countInputRef}
        className={classes.numberSpinner}
        classes={{
          root: classes.inputRoot,
          input: classes.input,
        }}
        type='number'
        color='secondary'
        value={itemCount}
        onChange={onCountInputChange}
      />
      <Button
        disabled={!selectedProduct}
        onClick={() => countProduct(selectedProduct)}
        classes={{ root: classes.countBtnRoot }}
        className={classes.countBtn}>
        <Typography className={classes.btnText}>Count</Typography>
      </Button>
    </div>
  )

  return (
    <InventoryCountTopBar
      title={
        <Fragment>
          <span className={classes.iconDiv} onClick={() => history.push('/inventory/count')}>
            <ArrowBackIcon className={classes.backArrow} />
          </span>
          <Typography className={classes.titleText}>
            {batch &&
              (batch.name
                ? capitalizeFirstLetters(batch.name)
                : `Count on ${formatDate(batch.started, 'd MMMM y - p')}`)}
          </Typography>
        </Fragment>
      }
      inventoryCountActionsPaper={
        <div className={classes.countingContainer}>
          <AutoCompleteProductSearchBar
            className={classes.searchBar}
            open={open}
            onClose={() => {
              setOpen(false)
              setSearchResults([])
            }}
            loading={loading}
            options={searchResults}
            onProductChange={onProductSelect}
            query={query}
            onQueryChange={handleQueryChange}
            productNotFound={productNotFound}
          />
          {!isQuickScanMode && renderCountInput()}
          <div className={classes.countInputAction}>
            <Checkbox
              color='primary'
              checked={isQuickScanMode}
              onChange={handleCheckedChange}
              disableRipple
            />
            <Typography className={classes.modeText}>Quick-scan mode</Typography>
          </div>
        </div>
      }
    />
  )
}

export default CountingActionsBar
