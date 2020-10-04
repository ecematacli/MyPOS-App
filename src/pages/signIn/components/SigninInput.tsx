import React, { Fragment } from 'react';
import { FieldProps } from 'formik';
import { TextField } from '@material-ui/core';

import styles from './styles';
import { FormValues } from '../index';

interface InputProps {
  fieldId: string;
  label: string;
  type: string;
}

export const SigninInput: React.FC<FieldProps<FormValues> & InputProps> = ({
  field,
  fieldId,
  label,
  form,
  ...otherProps
}) => {
  const classes = styles();

  const { touched, errors } = form;

  const inputClasses = {
    classes: {
      root: classes.cssOutlinedInput,
      focused: classes.cssFocused,
      notchedOutline: classes.notchedOutline,
    },
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
        inputProps={{
          'data-testid': `${fieldId}`,
        }}
        InputProps={errors[fieldId] && touched[fieldId] && inputClasses}
      />
      {errors[fieldId] && touched[fieldId] ? (
        <div className={classes.helperText}>{errors[fieldId]}</div>
      ) : null}
    </Fragment>
  );
};

export default SigninInput;
