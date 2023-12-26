import React, { Fragment, useState } from 'react'
import clsx from 'clsx'
import {
  Divider,
  Typography,
  FormControl,
  Select,
  MenuItem,
  OutlinedInput,
} from '@material-ui/core'

import styles from './styles'
import { TotalProps } from '../pos-table-right/types'
import { currencyFormatter } from '../../../../common/utils'
import EditProductFieldPopover from '../editProductFieldPopover/EditProductFieldPopover'
import useEditDiscountState from './hooks/useEditDiscountState'
import { Edit } from '@material-ui/icons'
import CustomInput from '../../../../common/components/customInput'
import { Align } from '../../../../common/components/Align'

const Total: React.FC<TotalProps> = ({
  products,
  total,
  tax,
  discount,
  setDiscount,
  percentageDiscount,
  setPercentageDiscount,
  discardSale,
  anchorEl,
  handleEditClick,
  onCompleteDiscountEditClick,
  handleClose,
  setTotal,
  ...props
}) => {
  const classes = styles()
  const [editingTotal, setEditingTotal] = useState(false)

  const {
    discountType,
    discountValue,
    handleDiscountTypeChange,
    handleDiscountValueChange,
  } = useEditDiscountState(discount, percentageDiscount)

  const renderDiscountTypes = () => (
    <FormControl classes={{ root: classes.formControl }}>
      <Select
        color='secondary'
        classes={{ root: classes.selectRoot }}
        input={
          <OutlinedInput
            classes={{
              root: classes.innerOptionsInput,
              input: classes.optionsInput,
            }}
          />
        }
        value={discountType}
        onChange={handleDiscountTypeChange}>
        {['%', 'TL'].map(label => (
          <MenuItem
            classes={{ root: classes.discountType }}
            key={label}
            value={label}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )

  const renderEditPricePopover = () => (
    <EditProductFieldPopover
      title='İndirim Uygula'
      field='discount'
      popoverContentElement={renderDiscountTypes()}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      testId='discount-type-input'
      transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      open={Boolean(anchorEl && anchorEl.discount)}
      anchorEl={anchorEl ? anchorEl.discount : null}
      handleClose={() => handleClose('discount')}
      inputValue={discountValue}
      handleInputChange={e => handleDiscountValueChange(e.target.value)}
      handleCompleteEditClick={() =>
        onCompleteDiscountEditClick(
          total,
          discountType,
          discountValue,
          setDiscount,
          setPercentageDiscount
        )
      }
    />
  )

  const renderTotal = () => (
    <div className={classes.totalContainer}>
      {!products.length && editingTotal ? (
        <CustomInput
          value={total - discount}
          onChange={({ target }) =>
            setTotal((parseFloat(target.value) || 0) + discount)
          }
          classesProp={{ input: classes.totalInput }}
          id='edit-total'
        />
      ) : (
        <Align align='center'>
          <Typography data-testid='total'>
            {currencyFormatter(total - discount)}
          </Typography>
          {!products.length ? (
            <div>
              <Edit
                className={classes.totalEditIcon}
                onClick={() => setEditingTotal(true)}
              />
            </div>
          ) : null}
        </Align>
      )}
    </div>
  )

  return (
    <div className={classes.totalContentDiv}>
      <div className={classes.totalSection}>
        <Typography>Ara Toplam</Typography>
        <Typography data-testid='sub-total'>
          {currencyFormatter(total - tax)}
        </Typography>
      </div>
      <div className={classes.totalSection}>
        <Typography>Vergi</Typography>
        <Typography data-testid='tax'>{currencyFormatter(tax)}</Typography>
      </div>
      <div className={classes.totalSection}>
        <Fragment>
          <div
            className={classes.discountContainer}
            onClick={e => handleEditClick(e, 'discount')}>
            <Typography className={classes.discount}>İndirim</Typography>
          </div>
          {renderEditPricePopover()}
          <Typography data-testid='discount'>
            <span className={classes.percentageSign}>%</span>
            {parseFloat(percentageDiscount.toFixed(2))} /{' '}
            {currencyFormatter(discount)}
          </Typography>
        </Fragment>
      </div>
      <Divider className={classes.totalDivider} />
      <div className={clsx(classes.totalSection, classes.totalAmount)}>
        <Typography>Toplam</Typography>
        {renderTotal()}
      </div>
    </div>
  )
}

export default Total
