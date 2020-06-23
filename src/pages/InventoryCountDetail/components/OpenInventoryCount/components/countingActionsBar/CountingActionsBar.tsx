import React, { SetStateAction, Dispatch } from 'react'
import { Button, Typography, OutlinedInput, Checkbox } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import styles from './styles'
import { ChangeEvent, BatchData, BatchProduct } from '../../types'
import InventoryCountTopBar from '../../../../../../common/components/inventoryCountTopBar'
import { capitalizeFirstLetters, formatDate } from '../../../../../../common/utils'
import AutoCompleteProductSearchBar from '../../../../../../common/components/autoCompleteProductSearchBar'
import history from '../../../../../../history'
import { Align } from '../../../../../../common/components/Align'
import CustomButton from '../../../../../../common/components/customButton'
import { InputAutoSuggest } from '../../../../../../common/components/InputAutoSuggest'
import { OptionsType } from 'react-select'

interface CountingActionsBarProps {
  batch: BatchData
  onProductSelect: (product: BatchProduct) => void
  countInputRef: React.MutableRefObject<HTMLInputElement>
  itemCount: number
  selectedProduct: BatchProduct
  setItemCount: Dispatch<SetStateAction<number>>
  countProduct: (p: BatchProduct) => void
  isQuickScanMode: boolean
  setIsQuickScanMode: (m: boolean) => void
  openConfirmationModal: () => void
  searchProducts: (query: string) => Promise<any[]>
}

const CountingActionsBar: React.FC<CountingActionsBarProps> = ({
  batch,
  onProductSelect,
  countInputRef,
  itemCount,
  setItemCount,
  selectedProduct,
  countProduct,
  isQuickScanMode,
  setIsQuickScanMode,
  openConfirmationModal,
  searchProducts,
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

  const Title = () => (
    <Align justify='space-between' align='center' fullWidth>
      <Align align='center'>
        <span
          className={classes.iconDiv}
          onClick={() => history.push('/inventory/inventory-count')}>
          <ArrowBackIcon className={classes.backArrow} />
        </span>
        <Typography className={classes.titleText}>
          {batch &&
            (batch.name
              ? capitalizeFirstLetters(batch.name)
              : `Count on ${formatDate(batch.started, 'd MMMM y - p')}`)}
        </Typography>
      </Align>
      <CustomButton onClick={openConfirmationModal}>Complete</CustomButton>
    </Align>
  )

  return (
    <InventoryCountTopBar
      title={<Title />}
      inventoryCountActionsPaper={
        <div className={classes.countingContainer}>
          <InputAutoSuggest
            loadOptions={searchProducts}
            selectOption={onProductSelect}
            isQuickScanMode={isQuickScanMode}
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
