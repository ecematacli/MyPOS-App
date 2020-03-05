import React from 'react';
import { Snackbar, Slide, SlideProps } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { Color } from '@material-ui/lab/Alert';

interface SnackbarProps {
  open: boolean;
  handleClose: () => void;
  snackbarContent: string;
  severity: Color;
}

const TransitionLeft = (props: SlideProps) => (
  <Slide {...props} direction="left" />
);

const CustomSnackbar: React.FC<SnackbarProps> = ({
  open,
  handleClose,
  snackbarContent,
  severity
}) => (
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
