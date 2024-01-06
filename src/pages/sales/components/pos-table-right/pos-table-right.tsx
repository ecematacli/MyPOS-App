import React, { useContext } from 'react'
import { useDispatch, connect } from 'react-redux'
import { useTheme } from '@mui/material/styles'
import ExpandMore from '@mui/icons-material/ExpandMore'
import {
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from '@mui/material'

import {
  ExpansionPanelRoot,
  PaymentButtonText,
  RootPaper,
  StyledAccordion,
  StyledBox,
  StyledButton,
  TotalDivider,
} from './styles'
import { PosTableProps } from './types'
import { NotificationsContext } from '../../../../contexts/NotificationsContext'
import { useEditProductFieldState } from './use-edit-product-field-state'
import { Total } from '../total/total'
import { CustomInput } from '../../../../common/components/custom-input/custom-input'
import { POSProductTable } from './pos-product-table/pos-product-table'
import { CustomButton } from '../../../../common/components/custom-button/custom-button'
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
  const theme = useTheme()
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
    <RootPaper>
      <Box>
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
        <StyledAccordion elevation={0}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>Notlar</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <CustomInput
              value={description}
              onChange={({ target }) => setDescription(target.value)}
              classesProp={{
                input: { height: theme.spacing(3), padding: theme.spacing(1) },
              }}
              id='description'
              placeholder='Bu satışla ilgili bir not ekleyin'
              fullWidth
              multiline
            />
          </AccordionDetails>
        </StyledAccordion>
        <ExpansionPanelRoot elevation={0}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>
              Ödeme Yöntemi{`: ${getPaymentMethodLabel(paymentMethod)}`}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {PAYMENT_METHODS.map(({ label, value }) => (
              <StyledButton
                key={value}
                color='primary'
                variant='contained'
                onClick={() => setPaymentMethod(value)}
                sx={theme => ({
                  ...(value === paymentMethod && {
                    background: theme.palette.primary.main,
                    color: '#fff',
                  }),
                })}>
                {translatePaymentMethodLabel(label).toLocaleUpperCase('tr-TR')}
              </StyledButton>
            ))}
          </AccordionDetails>
        </ExpansionPanelRoot>
        <TotalDivider />
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
      <TotalDivider />
      <Align padding={[1]}>
        <CustomButton
          data-testid='custom-button'
          onClick={onCompleteSaleClick}
          fullWidth
          disabled={!products.length}>
          <Box display='flex' justifyContent='center' width='100%'>
            <PaymentButtonText>
              {'Satış Tamamla'.toLocaleUpperCase('tr-TR')}
            </PaymentButtonText>
            <Typography>{currencyFormatter(total - discount)}</Typography>
          </Box>
        </CustomButton>
      </Align>
    </RootPaper>
  )
}

export const PosTableRight = connect(null, { editProduct })(
  PosTableRightComponent
)
