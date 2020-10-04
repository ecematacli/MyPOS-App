import React, { Fragment } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'

import {
  OutlinedInput,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Theme,
} from '@material-ui/core'
import { Props, DropdownItems } from './types'

const styles = makeStyles(({ breakpoints }) => ({
  root: {
    '&:focus': {
      backgroundColor: 'transparent',
    },
  },
  dropdownItems: {
    [breakpoints.down('sm')]: {
      fontSize: 14,
    },
  },
}))

const CustomInput: React.FC<Props> = props => {
  const classes = styles()
  const { palette }: Theme = useTheme()

  const {
    label,
    dropdown,
    dropdownItems,
    inputLabel,
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
          {inputLabel && (
            <InputLabel color='secondary' id={label}>
              {label}
            </InputLabel>
          )}
          <FormControl variant='outlined' classes={classesProp.dropdownInput}>
            <Select
              {...otherProps}
              classes={{ root: classes.root }}
              color='secondary'
              labelId={label}
              input={<OutlinedInput classes={classesProp.innerInput} />}>
              {dropdownItems &&
                dropdownItems.map(({ id, name }: DropdownItems) => (
                  <MenuItem classes={{ root: classes.dropdownItems }} key={id} value={name}>
                    {name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Fragment>
      ) : (
          <Fragment>
            {inputLabel && (
              <InputLabel
                color='secondary'
                style={invalidatedField && { color: palette.error.main }}>
                {label}
              </InputLabel>
            )}
            <OutlinedInput
              {...otherProps}
              classes={!dropdown && classesProp}
              color='secondary'
              type={type}
              required={required}
            />
          </Fragment>
        )}
    </Fragment>
  )
}

export default CustomInput
