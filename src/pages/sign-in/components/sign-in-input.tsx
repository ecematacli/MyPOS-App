import React, { Fragment } from 'react'
import { FieldProps } from 'formik'
import { useTheme } from '@mui/material/styles'
import { GlobalStyles } from '@mui/system'

import { HelperText, StyledTextField } from './styles'
import { FormValues } from '../sign-in'

interface InputProps {
  fieldId: string
  label: string
  type: string
}

export const SignInInput: React.FC<FieldProps<FormValues> & InputProps> = ({
  field,
  fieldId,
  label,
  form,
  ...otherProps
}) => {
  const theme = useTheme()

  const { touched, errors } = form

  const inputClasses = {
    '.MuiOutlinedInput-root': {
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: `${theme.palette.error.main} !important`,
      },
    },
    '.Mui-focused': {},
    '.MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.error.main,
    },
  }

  return (
    <Fragment>
      <GlobalStyles
        styles={{
          '.MuiInputBase-input:focus::placeholder': {
            color: 'transparent',
          },
        }}
      />
      <StyledTextField
        {...field}
        {...otherProps}
        color='secondary'
        label={label}
        inputProps={{
          'data-testid': `${fieldId}`,
          placeholder: label,
        }}
        InputProps={{
          sx: {
            ...(errors[fieldId] && touched[fieldId] ? inputClasses : {}),
          },
        }}
      />
      {errors[fieldId] && touched[fieldId] && (
        <HelperText>{errors[fieldId].toString()}</HelperText>
      )}
    </Fragment>
  )
}
