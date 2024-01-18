import React, { useContext } from 'react'
import { connect } from 'react-redux'
import { Typography, Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import CancelIcon from '@mui/icons-material/Cancel'
import DoneIcon from '@mui/icons-material/Done'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'

import {
  DetailActionButton,
  DetailContent,
  DetailsCard,
  EditFormContainer,
  EditIconContainer,
  PaperHead,
  PaperTitle,
  ProductDetailsContainer,
  ProductDetailsInfo,
  getDropdownInputRootStyles,
  getInnerInputStyles,
  getInputStyles,
  getRootInputStyles,
} from './styles'
import { StoreState } from '../../../../redux/types'
import { DetailsProps } from './types'
import { editProduct } from '../../../../redux/products/productsActions'
import useProductDetails from './hooks/use-product-details'
import { getProductFields } from './getProductFields'
import { NotificationsContext } from '../../../../contexts/notifications-context'
import { CustomInput } from '../../../../common/components/custom-input/custom-input'
import { StyledIconButton } from 'pages/sales/components/outlet-name/styles'

const ProductDetails: React.FC<DetailsProps> = props => {
  const theme = useTheme()

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
    <EditFormContainer>
      <CustomInput
        name={fieldId}
        label={label}
        dropdown={dropdown}
        type={type}
        classesProp={
          !dropdown
            ? {
                root: getRootInputStyles(),
                input: getInputStyles(theme),
              }
            : {
                dropdownInput: {
                  root: getDropdownInputRootStyles(),
                },
                innerInput: {
                  root: getInnerInputStyles(),
                  input: getInputStyles(theme),
                },
              }
        }
        dropdownItems={dropdownItems}
        value={getInputValues(fieldId)}
        onChange={handleInputChange}
        color='secondary'
      />
      <Box sx={{ marginLeft: theme.spacing(1) }}>
        <StyledIconButton
          onClick={() => {
            completeEdit(fieldId, productVal[fieldId], product.id, label)
            handleEditedRow(fieldId)
          }}>
          <DetailActionButton as={DoneIcon} />
        </StyledIconButton>
        <StyledIconButton
          onClick={() => {
            handleEditedRow(fieldId)
          }}>
          <DetailActionButton as={CancelIcon} />
        </StyledIconButton>
      </Box>
    </EditFormContainer>
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
        <ProductDetailsInfo key={label}>
          <Typography>{label}: </Typography>
          <Box display='flex'>
            {editedRow[fieldId] ? (
              renderEditForm(fieldId, label, dropdown, dropdownItems, type)
            ) : (
              <React.Fragment>
                {currency && <Box>&#x20BA;</Box>}
                <DetailContent>{renderProductValues(fieldId)}</DetailContent>
                <EditIconContainer
                  onClick={() => {
                    handleEditedRow(fieldId)
                  }}>
                  {enabledEdit ? <EditOutlinedIcon /> : <React.Fragment />}
                </EditIconContainer>
              </React.Fragment>
            )}
          </Box>
        </ProductDetailsInfo>
      )
    })

  return (
    <ProductDetailsContainer rowIndex={props.rowIndex}>
      <PaperHead>
        <PaperTitle color='secondary'>Detaylar</PaperTitle>
        <StyledIconButton onClick={handleEditClick}>
          {enabledEdit ? <DoneIcon /> : <EditOutlinedIcon />}
        </StyledIconButton>
      </PaperHead>
      <DetailsCard>{renderProductDetails()}</DetailsCard>
    </ProductDetailsContainer>
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
