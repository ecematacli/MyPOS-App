import React, { Fragment } from 'react';
import {
  OutlinedInput,
  InputLabel,
  FormControl,
  Select,
  MenuItem
} from '@material-ui/core';

import styles from './styles';

const CustomInput = props => {
  const classes = styles(props);
  const {
    label,
    dropdown,
    dropdownItems,
    inputLabel,
    type = 'text',
    ...otherProps
  } = props;

  return (
    <div>
      {dropdown ? (
        <Fragment>
          {inputLabel && (
            <InputLabel color="secondary" id={label}>
              {label}
            </InputLabel>
          )}
          <FormControl
            variant="outlined"
            classes={{ root: classes.formControlRoot }}
          >
            <Select color="secondary" labelId={label} {...otherProps}>
              {dropdownItems.map(item => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Fragment>
      ) : (
        <Fragment>
          {inputLabel && <InputLabel color="secondary">{label}</InputLabel>}
          <OutlinedInput
            classes={{
              root: classes.input
            }}
            {...otherProps}
            color="secondary"
            type={type}
          />
        </Fragment>
      )}
    </div>
  );
};

export default CustomInput;
