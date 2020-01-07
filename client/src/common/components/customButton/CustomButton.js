import React from 'react';
import Button from '@material-ui/core/Button';

import styles from './styles';

const CustomButton = ({ children, ...otherProps }) => {
  const classes = styles(otherProps);
  return (
    <Button variant="contained" className={classes.customBtn} {...otherProps}>
      {children}
    </Button>
  );
};

export default CustomButton;
