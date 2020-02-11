import React, { useContext, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { Card, CardContent, Typography, CardMedia } from '@material-ui/core';
import { Formik, Field, Form } from 'formik';

import styles from './styles';
import image from '../../assets/img/accountant.jpg';
import useLoginState from './hooks/useLoginState';
import { AuthContext } from '../../contexts/AuthContext';
import CustomButton from '../../common/components/customButton/CustomButton';
import SigninForm from './components/SigninForm';

const SignInPage = ({ location }) => {
  const classes = styles();
  const authenticated = useContext(AuthContext);
  const { postSignInForm, SIGNIN_FIELDS } = useLoginState();

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
    <div className={classes.signInPageContainer}>
      <div className={classes.signInFormContainer}>
        <Card className={classes.signInCard}>
          <div className={classes.cardContainer}>
            <div>
              <CardMedia className={classes.signInCardImg} image={image} />
            </div>
            <CardContent
              className={classes.cardContent}
              style={{ marginLeft: 20 }}
            >
              <div className={classes.signInTextDiv}>
                <Typography className={classes.signInText}>Sign In</Typography>
              </div>
              <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={values => {
                  postSignInForm(values);
                }}
                validate={validate}
              >
                <Form
                  autoComplete="new-password"
                  className={classes.signInForm}
                >
                  {SIGNIN_FIELDS.map(({ label, name }) => (
                    <Field
                      key={label}
                      label={label}
                      name={name}
                      fieldId={name}
                      type={name}
                      component={SigninForm}
                    />
                  ))}
                  <CustomButton type="submit">
                    <Typography className={classes.btnText}>Sign In</Typography>
                  </CustomButton>
                </Form>
              </Formik>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SignInPage;
