import React, { Fragment } from 'react';
import {
  OutlinedInput,
  InputLabel,
  FormControl,
  Select,
  MenuItem
} from '@material-ui/core';

const CustomInput = props => {
  const {
    label,
    dropdown,
    dropdownItems,
    inputLabel,
    classesProp,
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
          <FormControl variant="outlined" classes={classesProp.dropdownInput}>
            <Select
              color="secondary"
              labelId={label}
              {...otherProps}
              input={<OutlinedInput classes={classesProp.innerInput} />}
            >
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
            classes={!dropdown && classesProp}
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
