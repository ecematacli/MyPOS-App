import React, { Fragment, useContext } from 'react'
import { connect } from 'react-redux'
import clsx from 'clsx'
import {
  Table,
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  Paper,
  Divider,
  IconButton,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
} from '@material-ui/core'

import styles from './styles'
import { PosTableProps } from './types'
import { Product } from '../../../../redux/products/types'
import { NotificationsContext } from '../../../../contexts/NotificationsContext'
import useEditProductFieldState from './useEditProductFieldState'
import { editProduct } from '../../../../redux/products/productsActions'
import { TABLE_HEAD } from './ProductTable/tableHead'
import { currencyFormatter } from '../../../../common/utils'
import { capitalizeFirstLetters } from '../../../../common/utils'
import EditPricePopover from '../editProductFieldPopover/EditProductFieldPopover'
import Total from '../total/Total'
import { ExpandMore } from '@material-ui/icons'
import CustomInput from '../../../../common/components/customInput'
import { POSProductTable } from './ProductTable'

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

  return (
    <Paper className={classes.paperRoot}>
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
      <ExpansionPanel className={classes.noteContainer} elevation={0}>
        <ExpansionPanelSummary expandIcon={<ExpandMore />}>
          <Typography>Note</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <CustomInput
            value=''
            onChange={() => null}
            classesProp={{ input: classes.noteInput }}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel className={classes.noteContainer} elevation={0}>
        <ExpansionPanelSummary expandIcon={<ExpandMore />}>
          <Typography>Payment Method</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <CustomInput
            value=''
            onChange={() => null}
            classesProp={{ input: classes.noteInput }}
          />
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
        completeSale={completeSale}
        discardSale={discardSale}
        anchorEl={anchorEl}
        handleEditClick={handleEditClick}
        onCompleteDiscountEditClick={onCompleteDiscountEditClick}
        handleClose={handleClose}
      />
    </Paper>
  )
}

export default connect(null, { editProduct })(PosTableRight)
