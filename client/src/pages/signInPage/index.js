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
import CustomButton from '../../common/components/customButton/CustomButton';

const SignInPage = ({ location }) => {
  const classes = styles();
  const authenticated = useContext(AuthContext);
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

  if (authenticated) {
    return <Redirect to={referer} />;
  }

  return (
    <div className={classes.signInPage}>
      <div className={classes.signInRoot}>
        <Card className={classes.signInCard}>
          <div className={classes.cardContainer}>
            <div className={classes.cardMedia}>
              <CardMedia className={classes.signInCardImg} image={image} />
            </div>
            <div>
              <div className={classes.cardContent}>
                <CardContent>
                  <div className={classes.signInFormContainer}>
                    <Typography className={classes.signInText}>
                      Sign In
                    </Typography>
                    <form
                      onSubmit={handleSubmit}
                      className={classes.signInForm}
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
                        style={{ marginBottom: 25 }}
                        className={classes.signInFields}
                        value={password}
                        onChange={setPassword}
                        type="password"
                      />
                      <CustomButton type="submit">
                        <Typography className={classes.btnText}>
                          Sign In
                        </Typography>
                      </CustomButton>
                    </form>
                  </div>
                </CardContent>
              </div>
            </div>
            {isError && <p>Error!</p>}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SignInPage;
