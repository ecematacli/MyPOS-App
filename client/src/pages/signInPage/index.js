import React, { useContext } from 'react';
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
import useLoginState from './hooks/useLoginState';
import { AuthContext } from '../../contexts/AuthContext';
import CustomButton from '../../common/customButton/CustomButton';

const SignInPage = ({ location }) => {
  const classes = styles();
  const authToken = useContext(AuthContext);
  const {
    email,
    password,
    setEmail,
    setPassword,
    resetEmail,
    resetPassword,
    postSignInForm,
    isError
  } = useLoginState();

  const referer = location.referer || '/';

  const handleSubmit = e => {
    e.preventDefault();
    resetEmail();
    resetPassword();
    postSignInForm();
  };

  if (authToken) {
    return <Redirect to={referer} />;
  }

  console.log(JSON.parse(localStorage.getItem('token')));
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
