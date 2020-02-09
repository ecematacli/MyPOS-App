import React from 'react';
import clsx from 'clsx';
import { TextField, Typography } from '@material-ui/core';

import styles from './styles';
import CustomButton from '../../../common/components/customButton/CustomButton';

export const SigninInputs = ({
  values: { email, password },
  handleChange,
  handleSubmit,
  errors,
  touched
}) => {
  const classes = styles(email, password);

  const inputClasses = {
    classes: {
      notchedOutline: classes.notchedOutline
    }
  };
  const signinFields = [
    {
      label: 'Email Address*',
      name: 'email',
      value: email,
      errors: errors.email,
      touched: touched.email
    },
    {
      label: 'Password*',
      name: 'password',
      value: password,
      errors: errors.password,
      touched: touched.password
    }
  ];

  return (
    <form onSubmit={handleSubmit} className={classes.signInForm}>
      {signinFields.map(({ label, name, value, errors, touched }) => (
        <div key={label}>
          <TextField
            color="secondary"
            autoFocus
            label={label}
            variant="outlined"
            className={clsx(
              classes[password && 'passwordField'],
              classes.signInFields
            )}
            value={value}
            onChange={handleChange}
            InputProps={errors && inputClasses}
            name={name}
            type={name}
          />
          {errors && touched && (
            <div className={classes.helperText}>{errors}</div>
          )}
        </div>
      ))}
      <CustomButton type="submit">
        <Typography className={classes.btnText}>Sign In</Typography>
      </CustomButton>
    </form>
  );
};

export default SigninInputs;
