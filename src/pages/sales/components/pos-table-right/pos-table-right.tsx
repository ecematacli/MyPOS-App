import React, { useContext } from 'react'
import { useDispatch, connect } from 'react-redux'
import {
  Paper,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Box,
} from '@material-ui/core'
import clsx from 'clsx'

import styles from './styles'
import { PosTableProps } from './types'
import { NotificationsContext } from '../../../../contexts/NotificationsContext'
import { useEditProductFieldState } from './useEditProductFieldState'
import Total from '../total/Total'
import { ExpandMore } from '@material-ui/icons'
import CustomInput from '../../../../common/components/customInput'
import { POSProductTable } from './ProductTable'
import CustomButton from '../../../../common/components/customButton'
import {
  currencyFormatter,
  getPaymentMethodLabel,
} from '../../../../common/utils'
import { Align } from '../../../../common/components/Align'
import { PAYMENT_METHODS } from '../../../../redux/sales/types'
import { translatePaymentMethodLabel } from '../../../../common/utils/translation'
import { AuthContext } from '../../../../contexts/AuthContext'
import { completeSale } from '../../../../redux/sales/salesActions'
import { editProduct } from '../../../../redux/products/productsActions'

const PosTableRightComponent: React.FC<PosTableProps> = ({
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
  discardSale,
  paymentMethod,
  setPaymentMethod,
  description,
  setDescription,
  setTotal,
}) => {
  const classes = styles()
  const dispatch = useDispatch()
  const { addNotification } = useContext(NotificationsContext)
  const {
    user: { role },
  } = useContext(AuthContext)

  const {
    handleEditClick,
    onCompleteDiscountEditClick,
    anchorEl,
    handleClose,
    ...rest
  } = useEditProductFieldState({
    products,
    editProductFieldLocalStorageState,
    editProduct,
    addNotification,
  })

  const onCompleteSaleClick = () =>
    dispatch(
      completeSale({
        products,
        total,
        discount,
        description,
        paymentMethod,
        addNotification,
        discardSale,
        outletId: role.outletId,
      })
    )

  return (
    <Paper elevation={0} className={classes.root}>
      <Box className={classes.paperRoot}>
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
        <Accordion className={classes.expansionPanelRoot} elevation={0}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>Notlar</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <CustomInput
              value={description}
              onChange={({ target }) => setDescription(target.value)}
              classesProp={{ input: classes.noteInput }}
              id='description'
              placeholder='Bu satışla ilgili bir not ekleyin'
              fullWidth
              multiline
            />
          </AccordionDetails>
        </Accordion>
        <Accordion className={classes.expansionPanelRoot} elevation={0}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>
              Ödeme Yöntemi{`: ${getPaymentMethodLabel(paymentMethod)}`}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
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
                {translatePaymentMethodLabel(label).toLocaleUpperCase('tr-TR')}
              </Button>
            ))}
          </AccordionDetails>
        </Accordion>
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
      </Box>
      <Divider className={classes.totalDivider} />
      <Align padding={[1]}>
        <CustomButton
          data-testid='custom-button'
          onClick={onCompleteSaleClick}
          fullWidth
          disabled={!products.length}>
          <Box className={classes.paymentBtnTextHolder}>
            <Typography className={classes.paymentBtnTxt}>
              {'Satış Tamamla'.toLocaleUpperCase('tr-TR')}
            </Typography>
            <Typography className={classes.paymentBtnTxt}>
              {currencyFormatter(total - discount)}
            </Typography>
          </Box>
        </CustomButton>
      </Align>
    </Paper>
  )
}

export const PosTableRight = connect(null, { editProduct })(
  PosTableRightComponent
)
