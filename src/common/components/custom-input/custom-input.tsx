import React, { Fragment } from 'react'
import { styled, useTheme } from '@mui/material/styles'
import {
  OutlinedInput,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Theme,
} from '@mui/material'

import { Props, DropdownItems } from './types'

const StyledSelect = styled(Select)({
  '&:focus': {
    backgroundColor: 'transparent',
  },
})

const DropdownItem = styled(MenuItem)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    fontSize: 14,
  },
}))

export const CustomInput: React.FC<Props> = props => {
  const { palette }: Theme = useTheme()

  const {
    label,
    dropdown,
    dropdownItems,
    classesProp,
    type = 'text',
    required,
    invalidatedField,
    ...otherProps
  } = props
  return (
    <Fragment>
      {dropdown ? (
        <Fragment>
          {label && (
            <InputLabel color='secondary' id={label} style={classesProp?.label}>
              {label}
            </InputLabel>
          )}
          <FormControl variant='outlined' sx={classesProp?.dropdownInput}>
            <StyledSelect
              {...otherProps}
              color='secondary'
              labelId={label}
              input={<OutlinedInput sx={classesProp?.innerInput} />}>
              {dropdownItems &&
                dropdownItems.map(({ id, name }: DropdownItems) => (
                  <DropdownItem key={id} value={name}>
                    {name}
                  </DropdownItem>
                ))}
            </StyledSelect>
          </FormControl>
        </Fragment>
      ) : (
        <Fragment>
          {label && (
            <InputLabel
              color='secondary'
              sx={{
                ...(invalidatedField && { color: palette.error.main }),
                ...classesProp?.label,
              }}>
              {label}
            </InputLabel>
          )}
          <OutlinedInput
            {...otherProps}
            sx={!dropdown && classesProp}
            color='secondary'
            type={type}
            required={required}
          />
        </Fragment>
      )}
    </Fragment>
  )
}
