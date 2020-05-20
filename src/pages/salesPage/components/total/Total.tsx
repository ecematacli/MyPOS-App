import React, { useContext, Fragment, useState, useEffect } from 'react';
import clsx from 'clsx';
import {
  Divider,
  Typography,
  FormControl,
  Select,
  MenuItem,
  OutlinedInput,
} from '@material-ui/core';

import styles from './styles';
import { currencyFormatter } from '../../../../common/utils';
import { NotificationsContext } from '../../../../contexts/NotificationsContext';
import { TotalProps } from './types';
import CustomButton from '../../../../common/components/customButton';
import EditProductFieldPopover from '../editProductFieldPopover/EditProductFieldPopover';

const Total: React.FC<TotalProps> = ({
  products,
  total,
  tax,
  discount,
  percentageDiscount,
  handleDiscountChange,
  completeSale,
  discardSale,
  anchorEl,
  handleEditClick,
  onCompleteDiscountEditClick,
  handleClose,
}) => {
  const classes = styles();
  const { addNotification } = useContext(NotificationsContext);

  const [discountType, setDiscountType] = useState('TL');

  const discountToShow =
    discountType === 'TL' ? discount : parseInt(percentageDiscount.toFixed(2));

  const [discountValue, setDiscountValue] = useState(discountToShow);

  const handleDiscountValueChange = (value: string) => {
    setDiscountValue(parseInt(value));
  };

  const handleDiscountTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiscountType(e.target.value);
  };

  const onCompleteSaleClick = () =>
    completeSale(products, total, discount, addNotification, discardSale);

  useEffect(() => {
    setDiscountValue(discountToShow);
  }, [discountType, discount, percentageDiscount]);

  const renderDiscountTypes = () => (
    <FormControl classes={{ root: classes.formControl }}>
      <Select
        color="secondary"
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
        >
        {['%', 'TL'].map((label) => (
          <MenuItem
            classes={{ root: classes.discountType }}
            key={label}
            value={label}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  const renderEditPricePopover = () => (
    <EditProductFieldPopover
      title="Apply Discount"
      field="discount"
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      open={Boolean(anchorEl && anchorEl.discount)}
      anchorEl={anchorEl ? anchorEl.discount : null}
      handleClose={() => handleClose('discount')}
      inputValue={discountValue}
      handleInputChange={(e) => handleDiscountValueChange(e.target.value)}
      handleCompleteEditClick={() =>
        onCompleteDiscountEditClick(products, total, discount)
      }
      popoverContentElement={renderDiscountTypes()}
    />
  );

  const renderCompletePaymentBtn = () => (
    <CustomButton
      data-testid="custom-button"
      disabled={products.length < 1}
      onClick={onCompleteSaleClick}
      fullWidth>
      <div className={classes.paymentBtnTextHolder}>
        <Typography className={classes.paymentBtnTxt}>
          Complete Payment
        </Typography>
        <Typography className={classes.paymentBtnTxt}>
          {currencyFormatter(total - discount)}
        </Typography>
      </div>
    </CustomButton>
  );

  return (
    <div className={classes.totalContentDiv}>
      <div className={classes.totalSection}>
        <Typography>Sub-Total</Typography>
        <Typography data-testid="sub-total">
          {currencyFormatter(total - tax)}
        </Typography>
      </div>
      <div className={classes.totalSection}>
        <Typography>Tax</Typography>
        <Typography data-testid="tax">{currencyFormatter(tax)}</Typography>
      </div>
      <div className={classes.totalSection}>
        <Fragment>
          <div
            className={classes.discountContainer}
            onClick={(e) => handleEditClick(e, 'discount')}>
            <Typography className={classes.discount}>Discount</Typography>
          </div>
          {renderEditPricePopover()}
          <Typography>
            <span className={classes.percentageSign}>%</span>
            {percentageDiscount.toFixed(2)} / {currencyFormatter(discount)}
          </Typography>
        </Fragment>
      </div>
      <Divider className={classes.totalDivider} />
      <div className={clsx(classes.totalSection, classes.totalAmount)}>
        <Typography>Total</Typography>
        <Typography data-testid="total">
          {currencyFormatter(total - discount)}
        </Typography>
      </div>
      <div className={classes.paymentBtnContainer}>
        {renderCompletePaymentBtn()}
      </div>
    </div>
  );
};

export default Total;

{
  /* <CustomInput
          id="discount"
          classesProp={{
            root: classes.discountInput,
            notchedOutline: classes.notchedOutline,
          }}
          inputProps={{
            'data-testid': 'content-input',
            style: { textAlign: 'right' },
          }}
          value={discount}
          onChange={(e) => handleDiscountChange(e.target.value)}
          startAdornment={
            <InputAdornment position="start">&#x20BA;</InputAdornment>
          }
        /> */
}
