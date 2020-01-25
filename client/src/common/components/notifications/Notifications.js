import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useSnackbar } from 'notistack';
// import { Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

// function AlertFunc(props) {
//   return <Alert elevation={6} variant="filled" {...props} />;
// }

const Notifications = ({ errorMsg, successMsg }) => {
  // const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  console.log('error msg is:', errorMsg);
  console.log('success msg is:', successMsg);

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setError(!!errorMsg);
  }, [errorMsg]);

  useEffect(() => {
    setSuccess(!!successMsg);
  }, [successMsg]);

  const handleErrorClick = () => {
    setError(true);
  };

  const handleErrorClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setError(false);
  };

  const handleSuccessClick = () => {
    setSuccess(true);
  };

  const handleSuccessClose = (event, reason) => {
    console.log('handle success close ran!!');
    if (reason === 'clickaway') {
      return;
    }

    setSuccess(false);
  };

  // const action = key => (
  //   <Fragment>
  //     <Button
  //       onClick={() => {
  //         closeSnackbar(key);
  //       }}
  //     >
  //       <CloseIcon />
  //     </Button>
  //   </Fragment>
  // );

  // const renderNotification = () => {
  //   enqueueSnackbar(successMsg, {
  //     variant: 'success',
  //     autoHideDuration: 3000,
  //     preventDuplicate: true,
  //     action
  //   });
  // };

  // const renderError = () => {
  //   enqueueSnackbar(errorMsg, {
  //     variant: 'error',
  //     autoHideDuration: 3000,
  //     preventDuplicate: true,
  //     action
  //   });
  // };

  const renderNotifications = () => {
    return error ? (
      <Snackbar
        open={error}
        autoHideDuration={2000}
        onClose={handleErrorClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleErrorClose}
          severity="error"
        >
          {errorMsg}
        </Alert>
      </Snackbar>
    ) : (
      <Snackbar
        open={success}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        autoHideDuration={2000}
        onClose={handleSuccessClose}
      >
        <Alert
          onClose={handleSuccessClose}
          elevation={6}
          variant="filled"
          severity="success"
        >
          {successMsg}
        </Alert>
      </Snackbar>
    );
  };

  return (
    <div>
      {/* {errorMsg && <div>{renderError()}</div>}
      {successMsg && <div>{renderNotification()}</div>} */}
      {renderNotifications()}
    </div>
  );
};

const mapStateToProps = ({ notifications: { error, success } }) => ({
  errorMsg: error,
  successMsg: success
});

export default connect(mapStateToProps)(Notifications);
