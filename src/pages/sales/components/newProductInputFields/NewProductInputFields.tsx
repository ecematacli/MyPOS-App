import React, { Fragment } from 'react'
import { InputAdornment } from '@material-ui/core'
import { FieldProps } from 'formik'

import styles from './styles'
import CustomInput from '../../../../common/components/customInput'
import { FormValues } from '../CreateProductModal/types'

interface InputProps {
  fieldId: string
  label: string
  type: string | undefined
}
const NewProductInputFields: React.FC<FieldProps<FormValues> & InputProps> = props => {
  const classes = styles(props)
  const {
    field,
    fieldId,
    label,
    type,
    form: { touched, errors },
    ...otherProps
  } = props

  const invalidFields = errors[fieldId] && touched[fieldId]
  const requiredFieldClasses = invalidFields ? `${classes.notchedOutline}` : null

  return (
    <Fragment>
      <CustomInput
        {...field}
        {...otherProps}
        label={label}
        type={type}
        classesProp={{
          root: classes.input,
          notchedOutline: requiredFieldClasses,
        }}
        inputLabel
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
      {(fieldId === 'barcode' || fieldId === 'price' || fieldId === 'discountPrice') &&
      invalidFields ? (
        <div className={classes.helperText} data-testid={`${fieldId}-error`}>
          {errors[fieldId]}
        </div>
      ) : null}
    </Fragment>
  )
}

export default NewProductInputFields
