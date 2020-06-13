import React, { Fragment, useContext } from 'react'
import { connect } from 'react-redux'
import {
  Paper,
  Divider,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Button,
} from '@material-ui/core'

import styles from './styles'
import { PosTableProps } from './types'
import { NotificationsContext } from '../../../../contexts/NotificationsContext'
import useEditProductFieldState from './useEditProductFieldState'
import { editProduct } from '../../../../redux/products/productsActions'
import Total from '../total/Total'
import { ExpandMore } from '@material-ui/icons'
import CustomInput from '../../../../common/components/customInput'
import { POSProductTable } from './ProductTable'
import { PAYMENT_METHODS } from '../../hooks/types'
import clsx from 'clsx'
import CustomButton from '../../../../common/components/customButton'
import { currencyFormatter } from '../../../../common/utils'
import { Align } from '../../../../common/components/Align'

const PosTableRight: React.FC<PosTableProps> = ({
  products,
  deleteProduct,
  decreaseProductQuantity,
  increaseProductQuantity,
  editProductFieldLocalStorageState,
  total,
  tax,
  discount,
  setDiscount,
  percentageDiscount,
  setPercentageDiscount,
  completeSale,
  discardSale,
  editProduct,
  paymentMethod,
  setPaymentMethod,
  description,
  setDescription,
  setTotal,
}) => {
  const classes = styles()
  const { addNotification } = useContext(NotificationsContext)

  const {
    handleEditClick,
    onCompleteDiscountEditClick,
    anchorEl,
    handleClose,
    ...rest
  } = useEditProductFieldState({
    products,
    editProduct,
    editProductFieldLocalStorageState,
    addNotification,
  })

  const onCompleteSaleClick = () =>
    completeSale(
      products,
      total,
      discount,
      description,
      paymentMethod,
      addNotification,
      discardSale
    )

  const pM = PAYMENT_METHODS.find(p => p.value === paymentMethod)
  return (
    <Paper elevation={0} className={classes.root}>
      <div className={classes.paperRoot}>
        <POSProductTable
          products={products}
          deleteProduct={deleteProduct}
          increaseProductQuantity={increaseProductQuantity}
          decreaseProductQuantity={decreaseProductQuantity}
          anchorEl={anchorEl}
          handleClose={handleClose}
          handleEditClick={handleEditClick}
          {...rest}
        />
        <ExpansionPanel className={classes.expansionPanelRoot} elevation={0}>
          <ExpansionPanelSummary expandIcon={<ExpandMore />}>
            <Typography>Note</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <CustomInput
              value={description}
              onChange={({ target }) => setDescription(target.value)}
              classesProp={{ input: classes.noteInput }}
              id='description'
              placeholder='Enter a note about this sale'
              fullWidth
              multiline
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel className={classes.expansionPanelRoot} elevation={0}>
          <ExpansionPanelSummary expandIcon={<ExpandMore />}>
            <Typography>Payment Method{`: ${pM?.label}`}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            {PAYMENT_METHODS.map(({ label, value }) => (
              <Button
                key={value}
                color='primary'
                variant='contained'
                onClick={() => setPaymentMethod(value)}
                className={clsx({
                  [classes.selectedPayment]: value === paymentMethod,
                  [classes.paymentMethodBtn]: true,
                })}>
                {label}
              </Button>
            ))}
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <Divider className={classes.totalDivider} />
        <Total
          products={products}
          total={total}
          tax={tax}
          discount={discount}
          setDiscount={setDiscount}
          percentageDiscount={percentageDiscount}
          setPercentageDiscount={setPercentageDiscount}
          discardSale={discardSale}
          anchorEl={anchorEl}
          handleEditClick={handleEditClick}
          onCompleteDiscountEditClick={onCompleteDiscountEditClick}
          handleClose={handleClose}
          setTotal={setTotal}
        />
      </div>
      <Divider className={classes.totalDivider} />
      <Align padding={[1]}>
        <CustomButton data-testid='custom-button' onClick={onCompleteSaleClick} fullWidth>
          <div className={classes.paymentBtnTextHolder}>
            <Typography className={classes.paymentBtnTxt}>Complete Sale</Typography>
            <Typography className={classes.paymentBtnTxt}>
              {currencyFormatter(total - discount)}
            </Typography>
          </div>
        </CustomButton>
      </Align>
    </Paper>
  )
}

export default connect(null, { editProduct })(PosTableRight)
