import React from 'react';
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
  const classes = styles();

  const inputClasses = {
    classes: {
      notchedOutline: classes.notchedOutline
    }
  };

  return (
    <form onSubmit={handleSubmit} className={classes.signInForm}>
      <TextField
        color="secondary"
        label="Email Address*"
        variant="outlined"
        className={classes.signInFields}
        value={email}
        onChange={handleChange}
        InputProps={errors.email && inputClasses}
        name="email"
        type="email"
      />
      {(errors.email || touched.email) && (
        <div className={classes.helperText}>{errors.email}</div>
      )}
      <TextField
        color="secondary"
        label="Password*"
        variant="outlined"
        className={classes.signInFields}
        style={{ marginBottom: 25 }}
        value={password}
        onChange={handleChange}
        InputProps={errors.password && inputClasses}
        name="password"
        type="password"
      />
      {(errors.password || touched.password) && (
        <div className={classes.helperText}>{errors.password}</div>
      )}

      <CustomButton type="submit">
        <Typography className={classes.btnText}>Sign In</Typography>
      </CustomButton>
    </form>
  );
};

export default SigninInputs;
