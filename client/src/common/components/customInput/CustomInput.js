import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  OutlinedInput,
  InputLabel,
  FormControl,
  Select,
  MenuItem
} from '@material-ui/core';

const styles = makeStyles({
  root: {
    '&:focus': {
      backgroundColor: 'transparent'
    }
  }
});

const CustomInput = props => {
  const classes = styles();
  const {
    label,
    dropdown,
    dropdownItems,
    inputLabel,
    classesProp,
    type = 'text',
    required,
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
              {...otherProps}
              classes={{ root: classes.root }}
              color="secondary"
              labelId={label}
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
            {...otherProps}
            classes={!dropdown && classesProp}
            color="secondary"
            type={type}
            required
          />
        </Fragment>
      )}
    </div>
  );
};

export default CustomInput;
