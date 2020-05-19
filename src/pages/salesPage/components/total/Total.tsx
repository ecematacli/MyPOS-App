import React, { useContext, Fragment, useState } from 'react';
import clsx from 'clsx';
import {
  Divider,
  Typography,
  FormControl,
  Select,
  MenuItem,
  OutlinedInput,
  InputAdornment,
  Switch,
} from '@material-ui/core';

import styles from './styles';
import { currencyFormatter } from '../../../../common/utils';
import { NotificationsContext } from '../../../../contexts/NotificationsContext';
import { TotalProps } from './types';
import CustomButton from '../../../../common/components/customButton';
import EditProductFieldPopover from '../editProductFieldPopover/EditProductFieldPopover';
import CustomInput from '../../../../common/components/customInput';

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
  handleCompleteEditClick,
  handleClose,
}) => {
  const classes = styles();
  const { addNotification } = useContext(NotificationsContext);

  // const [discountType, setDiscountType] = useState('TL');
  const [isDiscountPercentage, setIsDiscountPercentage] = useState(false);

  const handleDiscountTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDiscountPercentage(e.target.checked);
  };

  const onCompleteSaleClick = () =>
    completeSale(products, total, discount, addNotification, discardSale);

  // const renderDiscountOptions = () => (
  //   <FormControl classes={{ root: classes.formControl }}>
  //     <Select
  //       color="secondary"
  //       classes={{ root: classes.selectRoot }}
  //       input={
  //         <OutlinedInput
  //           classes={{
  //             root: classes.innerOptionsInput,
  //             input: classes.optionsInput,
  //           }}
  //         />
  //       }
  //       value={discountOption}
  //       onChange={handleDiscountOptionChange}>
  //       >
  //       {['%', 'TL'].map((label) => (
  //         <MenuItem
  //           classes={{ root: classes.discountOption }}
  //           key={label}
  //           value={label}>
  //           {label}
  //         </MenuItem>
  //       ))}
  //     </Select>
  //   </FormControl>
  // );

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
            <Typography>
              Discount
              <span className={classes.discountType}>
                ({!isDiscountPercentage ? 'TL' : '%'})
              </span>
            </Typography>

            <Switch
              checked={isDiscountPercentage}
              onChange={handleDiscountTypeChange}
              color="primary"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          </div>
          {/* <EditProductFieldPopover
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
            inputValue={discount}
            handleInputChange={(e) => handleDiscountChange(e.target.value)}
            handleCompleteEditClick={() =>
              handleCompleteEditClick('discount', discount)
            }
            popoverContentElement={renderDiscountOptions()}
          /> */}
        </Fragment>
        {/* <Typography>
          <span style={{ fontWeight: 'bold' }}>%</span>
          {percentageDiscount.toFixed(2)} &nbsp;/ &nbsp;
          {currencyFormatter(discount)}
        </Typography> */}

        <CustomInput
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
            !isDiscountPercentage ? (
              <InputAdornment style={{ color: 'red' }} position="start">
                &#x20BA;
              </InputAdornment>
            ) : (
              <InputAdornment style={{ color: 'red' }} position="start">
                &#37;
              </InputAdornment>
            )
          }
        />
      </div>
      <Divider className={classes.totalDivider} />
      <div className={clsx(classes.totalSection, classes.totalAmount)}>
        <Typography>Total</Typography>
        <Typography data-testid="total">
          {currencyFormatter(total - discount)}
        </Typography>
      </div>
      <div className={classes.paymentBtnContainer}>
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
      </div>
    </div>
  );
};

export default Total;
