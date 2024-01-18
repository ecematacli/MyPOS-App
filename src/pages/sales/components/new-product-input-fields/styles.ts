import { Theme, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { FieldProps } from 'formik'

type IFormikForm = FieldProps['form']

export const ErrorHelperText = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  color: theme.palette.error.main,
  marginBottom: theme.spacing(2),
  width: 300,
}))

export const getRootInputStyles = (
  theme: Theme,
  {
    touched,
    errors,
    fieldId,
  }: {
    touched: IFormikForm['touched']
    errors: IFormikForm['errors']
    fieldId: string
  }
) => ({
  width: 380,
  height: 57,
  color: theme.palette.secondary.main,
  marginBottom: theme.spacing(2),
  '& input:valid:focus + fieldset': {
    borderColor:
      errors[fieldId] && touched[fieldId]
        ? `${theme.palette.error.main}`
        : 'unset',
  },
})
