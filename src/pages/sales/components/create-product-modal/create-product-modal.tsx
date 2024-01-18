import React, { Fragment, useRef } from 'react'
import { connect } from 'react-redux'
import { Formik, Field } from 'formik'
import {
  Button,
  DialogActions,
  DialogContent,
  AccordionSummary,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useTheme } from '@mui/material/styles'

import {
  ExpansionText,
  StyledAccordionDetails,
  StyledDialog,
  StyledDialogTitle,
  getDropdownInputStyles,
} from './create-product-modal-styles'
import { StoreState } from '../../../../redux/types'
import { FormValues } from './types'
import { ProductAddSchema } from './add-product-schema'
import { useNewProductInputState } from './use-new-product-input-state'
import { CustomInput } from '../../../../common/components/custom-input/custom-input'
import { NewProductInputFields } from '../new-product-input-fields/new-product-input-fields'
import {
  NEW_PRODUCT_FIELDS,
  getAdditionalProductFields,
} from './product-fields'
import { NewProductData } from '../../hooks/types'
import { Brand } from '../../../../redux/brands/types'
import { Category } from '../../../../redux/categories/types'
import { StyledAccordion } from '../pos-table-right/styles'

export interface Props {
  open: boolean
  onClose: () => void
  brands: Brand[]
  categories: Category[]
  createProduct: (
    productData: NewProductData,
    addNotification: (message: string, severity: string) => void
  ) => Promise<void>
}

const CreateProductModalComponent: React.FC<Props> = ({
  open,
  onClose,
  brands,
  categories,
  createProduct,
}) => {
  const theme = useTheme()
  const formRef = useRef<HTMLElement | any>()

  const {
    handleInputChange,
    onAddProductClick,
    additionalInputs,
  } = useNewProductInputState({
    brands,
    categories,
    onClose,
    createProduct,
  })
  const ADDITIONAL_FIELDS = getAdditionalProductFields(
    additionalInputs,
    brands,
    categories
  )

  const handleClose = (_: any, reason: string) => {
    if (reason !== 'backdropClick') {
      onClose()
    }
  }

  const triggerFormSubmission = () => {
    if (formRef.current) {
      formRef.current.handleSubmit()
    }
  }

  return (
    <StyledDialog open={open} onClose={handleClose} scroll='body'>
      <StyledDialogTitle>Ürün Ekle</StyledDialogTitle>
      <DialogContent sx={{ padding: 0, paddingBottom: 5 }}>
        <Formik<FormValues>
          initialValues={{
            barcode: '',
            name: '',
            qty: 1,
            sku: '',
            price: '',
            variation: '',
            discountPrice: '',
          }}
          onSubmit={values => {
            onAddProductClick(values)
          }}
          validationSchema={ProductAddSchema}
          innerRef={formRef as any}>
          <Fragment>
            {NEW_PRODUCT_FIELDS.map(({ fieldId, label, type }) => (
              <Field
                fullWidth
                key={label}
                label={label}
                name={fieldId}
                type={type}
                fieldId={fieldId}
                component={NewProductInputFields}
              />
            ))}
          </Fragment>
        </Formik>
      </DialogContent>

      <StyledAccordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <ExpansionText>Daha fazla alan için genişletin</ExpansionText>
        </AccordionSummary>
        <StyledAccordionDetails>
          {ADDITIONAL_FIELDS.map(
            ({ label, dropdown, dropdownItems, fieldId, value, type }) => {
              return (
                <CustomInput
                  name={fieldId}
                  value={value}
                  onChange={handleInputChange}
                  key={label}
                  type={type}
                  label={label}
                  dropdown={dropdown}
                  classesProp={{
                    dropdownInput: { root: getDropdownInputStyles(theme) },
                    label: { marginTop: '20px' },
                  }}
                  dropdownItems={dropdownItems}
                />
              )
            }
          )}
        </StyledAccordionDetails>
      </StyledAccordion>

      <DialogActions>
        <Button onClick={onClose} color='secondary'>
          Cancel
        </Button>
        <Button
          data-testid='add-button'
          onClick={triggerFormSubmission}
          color='primary'>
          Ürün Ekle
        </Button>
      </DialogActions>
    </StyledDialog>
  )
}

const mapStateToProps = (state: StoreState) => ({
  brands: state.brands,
  categories: state.categories,
})

export const CreateProductModal = connect(mapStateToProps)(
  CreateProductModalComponent
)
