import React, { Fragment } from 'react'
import { InputAdornment } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { FieldProps } from 'formik'

import { ErrorHelperText, getRootInputStyles } from './styles'
import { CustomInput } from '../../../../common/components/custom-input/custom-input'
import { FormValues } from '../create-product-modal/types'

interface InputProps {
  fieldId: string
  label: string
  type: string | undefined
}

export const NewProductInputFields: React.FC<FieldProps<FormValues> &
  InputProps> = props => {
  const theme = useTheme()
  const {
    field,
    fieldId,
    label,
    type,
    form: { touched, errors },
    ...otherProps
  } = props

  const invalidFields = errors[fieldId] && touched[fieldId]
  const requiredFieldStyles = invalidFields
    ? `borderColor:${theme.palette.error.main}`
    : null

  return (
    <Fragment>
      <CustomInput
        {...field}
        {...otherProps}
        label={label}
        type={type}
        classesProp={{
          root: getRootInputStyles(theme, { touched, errors, fieldId }),
          notchedOutline: requiredFieldStyles,
          label: { marginTop: '20px' },
        }}
        inputProps={{
          'data-testid': `${fieldId}`,
        }}
        invalidatedField={invalidFields}
        startAdornment={
          (fieldId === 'price' || fieldId === 'discountPrice') && (
            <InputAdornment position='start'>&#x20BA;</InputAdornment>
          )
        }
      />
      {(fieldId === 'barcode' ||
        fieldId === 'price' ||
        fieldId === 'discountPrice') &&
        invalidFields && (
          <ErrorHelperText data-testid={`${fieldId}-error`}>
            {errors[fieldId] as string}
          </ErrorHelperText>
        )}
    </Fragment>
  )
}
