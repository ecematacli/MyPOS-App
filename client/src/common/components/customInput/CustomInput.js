import React from 'react';
import {
  OutlinedInput,
  InputLabel,
  FormControl,
  Select,
  MenuItem
} from '@material-ui/core';

import styles from './styles';

const CustomInput = props => {
  const { label, dropdown, type = 'text' } = props;
  const classes = styles();
  return (
    <div>
      {dropdown ? (
        <div>
          <InputLabel color="secondary" id={label}>
            {label}
          </InputLabel>
          <FormControl
            variant="outlined"
            classes={{ root: classes.formControlRoot }}
            className={classes.selectInput}
          >
            <Select
              color="secondary"
              labelId={label}
              value={'age'}
              onChange={() => 'hey'}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </div>
      ) : (
        <div>
          <InputLabel color="secondary">{label}</InputLabel>
          <OutlinedInput
            color="secondary"
            classes={{
              root: classes.inputRoot,
              focused: classes.fieldInput,
              notchedOutline: classes.notchedOutline
            }}
            required
            type={type}
          />
        </div>
      )}
    </div>
  );
};

export default CustomInput;
