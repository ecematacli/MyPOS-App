import React from 'react';
import { Redirect } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  TextField
} from '@material-ui/core';

import styles from './styles';
import image from '../../assets/img/accountant.jpg';
import CustomButton from '../../common/customButton/CustomButton';

import useLoginState from './hooks/useLoginState';

const SignInPage = () => {
  const classes = styles();
  const {
    email,
    password,
    setEmail,
    setPassword,
    resetEmail,
    resetPassword,
    postSignInForm,
    isLoggedIn,
    isError
  } = useLoginState();

  const handleSubmit = e => {
    e.preventDefault();
    resetEmail();
    resetPassword();
    postSignInForm();
  };

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div className={classes.signInRoot}>
      <Card className={classes.signInCard}>
        <div className={classes.cardContainer}>
          <div className={classes.cardMediaImg}>
            <CardMedia className={classes.signInCardImg} image={image} />
          </div>
          <div>
            <CardContent>
              <div className={classes.signInFormContainer}>
                <Typography className={classes.signInText}>Sign In</Typography>
                <form
                  onSubmit={handleSubmit}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                >
                  <TextField
                    color="secondary"
                    label="Name*"
                    variant="outlined"
                    className={classes.signInFields}
                    value={email}
                    onChange={setEmail}
                    type="email"
                  />
                  <TextField
                    color="secondary"
                    label="Password*"
                    variant="outlined"
                    className={classes.signInFields}
                    value={password}
                    onChange={setPassword}
                    type="password"
                  />

                  <CustomButton type="submit">
                    <Typography className={classes.btnText}>Sign In</Typography>
                  </CustomButton>
                </form>
              </div>
            </CardContent>
          </div>
          {isError && <p>Error!</p>}
        </div>
      </Card>
    </div>
  );
};

export default SignInPage;
