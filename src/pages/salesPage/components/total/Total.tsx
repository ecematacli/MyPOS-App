import React, { useContext } from 'react';
import clsx from 'clsx';
import { Divider, Typography, InputAdornment } from '@material-ui/core';

import styles from './styles';
import { currencyFormatter } from '../../../../common/utils';
import { NotificationsContext } from '../../../../contexts/NotificationsContext';
import CustomInput from '../../../../common/components/customInput/CustomInput';
import CustomButton from '../../../../common/components/customButton/CustomButton';
import { Product } from '../../../../redux/products/types';

interface TotalProps {
  products: Product[];
  total: number;
  tax: number;
  discount: number;
  handleDiscountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  completeSale: (
    products: Product[],
    total: number,
    discount: number,
    addNotification: (m: string, t: string) => void,
    discardSale: () => void
  ) => void;
  discardSale: () => void;
}

const Total: React.FC<TotalProps> = ({
  products,
  total,
  tax,
  discount,
  handleDiscountChange,
  completeSale,
  discardSale
}) => {
  const classes = styles();
  const { addNotification } = useContext(NotificationsContext);

  const onCompleteSaleClick = () => {
    completeSale(products, total, discount, addNotification, discardSale);
  };

  return (
    <div className={classes.totalContentDiv}>
      <div className={classes.totalSection}>
        <Typography>Sub-Total</Typography>
        <Typography>{currencyFormatter(total - tax)}</Typography>
      </div>
      <div className={classes.totalSection}>
        <Typography>Tax</Typography>
        <Typography>{currencyFormatter(tax)}</Typography>
      </div>
      <div className={classes.totalSection}>
        <Typography>Discount</Typography>
        <CustomInput
          classesProp={{
            root: classes.discountInput,
            notchedOutline: classes.notchedOutline
          }}
          inputProps={{ style: { textAlign: 'right' } }}
          value={discount}
          onChange={handleDiscountChange}
          startAdornment={
            <InputAdornment position="start">&#x20BA;</InputAdornment>
          }
        />
      </div>
      <Divider className={classes.totalDivider} />
      <div className={clsx(classes.totalSection, classes.totalAmount)}>
        <Typography>Total</Typography>
        <Typography>{currencyFormatter(total - discount)}</Typography>
      </div>
      <div className={classes.paymentBtnContainer}>
        <CustomButton
          disabled={products.length < 1}
          onClick={onCompleteSaleClick}
          fullWidth
        >
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
