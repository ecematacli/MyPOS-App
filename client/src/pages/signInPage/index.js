import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Card, CardContent, Typography, CardMedia } from '@material-ui/core';
import { Formik } from 'formik';

import styles from './styles';
import image from '../../assets/img/accountant.jpg';
import useLoginState from './hooks/useLoginState';
import { AuthContext } from '../../contexts/AuthContext';
import SigninForm from './components/SigninForm';

const SignInPage = ({ location }) => {
  const classes = styles();
  const authenticated = useContext(AuthContext);
  const { postSignInForm } = useLoginState();

  const referer = location.referer || '/';

  if (authenticated) {
    return <Redirect to={referer} />;
  }

  const validate = values => {
    const errors = {};

    if (!values.email) {
      errors.email = 'Please enter your email address';
    }

    if (!values.password) {
      errors.password = 'Please enter your password';
    }

    return errors;
  };

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
                  </div>
                  <Formik
                    initialValues={{ email: '', password: '' }}
                    component={SigninForm}
                    onSubmit={values => {
                      postSignInForm(values);
                    }}
                    validate={validate}
                  />
                </CardContent>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SignInPage;
