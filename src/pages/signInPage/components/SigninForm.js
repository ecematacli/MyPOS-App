import React, { Fragment } from 'react';
import { TextField } from '@material-ui/core';

import styles from './styles';

export const SigninInputs = ({
  field,
  fieldId,
  label,
  form: { touched, errors },
  ...otherProps
}) => {
  const classes = styles();

  const inputClasses = {
    classes: {
      root: classes.cssOutlinedInput,
      focused: classes.cssFocused,
      notchedOutline: classes.notchedOutline
    }
  };

  return (
    <Fragment>
      <TextField
        {...field}
        {...otherProps}
        color="secondary"
        label={label}
        variant="outlined"
        className={classes.signInField}
        InputProps={errors[fieldId] && touched[fieldId] && inputClasses}
      />
      {errors[fieldId] && touched[fieldId] ? (
        <div className={classes.helperText}>{errors[fieldId]}</div>
      ) : null}
    </Fragment>
  );
};

export default SigninInputs;
