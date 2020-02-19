import React from 'react';
import { Snackbar, Slide } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const TransitionLeft = props => <Slide {...props} direction="left" />;

const CustomSnackbar = ({ open, handleClose, snackbarContent, severity }) => (
  <Snackbar
    open={open}
    autoHideDuration={3000}
    TransitionComponent={TransitionLeft}
    onClose={(e, reason) => {
      if (reason !== 'clickaway') {
        handleClose();
      }
    }}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
  >
    <Alert
      elevation={6}
      variant="filled"
      onClose={handleClose}
      severity={severity}
    >
      {snackbarContent}
    </Alert>
  </Snackbar>
);

export default CustomSnackbar;
