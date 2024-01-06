import React, { useContext } from 'react'
import { connect } from 'react-redux'
import { Paper, Typography, IconButton, Card } from '@mui/material'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import DoneIcon from '@material-ui/icons/Done'
import CancelIcon from '@material-ui/icons/Cancel'

import styles from './styles'
import { StoreState } from '../../../../redux/types'
import { DetailsProps } from './types'
import { editProduct } from '../../../../redux/products/productsActions'
import useProductDetails from './hooks/useProductDetails'
import { getProductFields } from './getProductFields'
import { NotificationsContext } from '../../../../contexts/NotificationsContext'
import { CustomInput } from '../../../../common/components/custom-input/custom-input'

const ProductDetails: React.FC<DetailsProps> = props => {
  const classes = styles({})
  const { product, brands, categories, editProduct } = props

  const { addNotification } = useContext(NotificationsContext)

  const PRODUCT_FIELDS = getProductFields(brands, categories)

  const args = {
    product,
    editProduct,
    addNotification,
    brands,
    categories,
  }

  const {
    editedRow,
    handleEditedRow,
    handleEditClick,
    productVal,
    handleInputChange,
    renderProductValues,
    getInputValues,
    enabledEdit,
    completeEdit,
  } = useProductDetails(args)

  const renderEditForm = (
    fieldId: string,
    label: string,
    dropdown: boolean,
    dropdownItems: { name: string; id: number }[],
    type: string
  ) => (
    <div className={classes.editFormContainer}>
      <CustomInput
        name={fieldId}
        label={label}
        dropdown={dropdown}
        type={type}
        classesProp={
          !dropdown
            ? {
                root: classes.inputRoot,
                input: classes.input,
              }
            : {
                dropdownInput: {
                  root: classes.dropdownInput,
                },
                innerInput: { root: classes.innerInput, input: classes.input },
              }
        }
        dropdownItems={dropdownItems}
        value={getInputValues(fieldId)}
        onChange={handleInputChange}
        color='secondary'
      />
      <div className={classes.editIcons}>
        <IconButton
          className={classes.iconButton}
          onClick={() => {
            completeEdit(fieldId, productVal[fieldId], product.id, label)
            handleEditedRow(fieldId)
          }}>
          <DoneIcon className={classes.detailActionBtnIcon} />
        </IconButton>
        <IconButton
          className={classes.iconButton}
          onClick={() => {
            handleEditedRow(fieldId)
          }}>
          <CancelIcon className={classes.detailActionBtnIcon} />
        </IconButton>
      </div>
    </div>
  )

  const renderProductDetails = () =>
    PRODUCT_FIELDS.map(productField => {
      const {
        label,
        fieldId,
        dropdown,
        dropdownItems,
        currency,
        type,
      } = productField

      return (
        <div key={label} className={classes.productDetails}>
          <Typography>{label}: </Typography>
          <div className={classes.detailAction}>
            {editedRow[fieldId] ? (
              renderEditForm(fieldId, label, dropdown, dropdownItems, type)
            ) : (
              <>
                {currency && <div>&#x20BA;</div>}
                <Typography className={classes.detailContent}>
                  {renderProductValues(fieldId)}
                </Typography>
                <div
                  onClick={() => {
                    handleEditedRow(fieldId)
                  }}
                  className={classes.editIcon}>
                  {enabledEdit ? <EditOutlinedIcon /> : null}
                </div>
              </>
            )}
          </div>
        </div>
      )
    })

  return (
    <Paper className={classes.productDetailsContainer}>
      <div className={classes.paperHead}>
        <Typography color='secondary' className={classes.paperTitle}>
          Details
        </Typography>
        <IconButton className={classes.iconButton} onClick={handleEditClick}>
          {enabledEdit ? <DoneIcon /> : <EditOutlinedIcon />}
        </IconButton>
      </div>
      <Card className={classes.detailsCard}>{renderProductDetails()}</Card>
    </Paper>
  )
}

const mapStateToProps = (state: StoreState) => {
  const { brands, categories } = state
  return {
    brands,
    categories,
  }
}

export default connect(mapStateToProps, { editProduct })(ProductDetails)
