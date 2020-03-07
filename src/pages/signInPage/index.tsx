import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Card, CardContent, Typography, CardMedia } from '@material-ui/core';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

import styles from './styles';
import image from '../../assets/img/accountant.jpg';
import useLoginState from './hooks/useLoginState';
import { AuthContext } from '../../contexts/AuthContext';
import CustomButton from '../../common/components/customButton/CustomButton';
import SigninInput from './components/SigninInput';

export interface FormValues {
  email: string;
  password: string;
}

const SignInPage: React.FC = () => {
  const classes = styles();
  const authenticated = useContext(AuthContext);
  const { postSignInForm, SIGNIN_FIELDS } = useLoginState();

  if (authenticated) {
    return <Redirect to="/" />;
  }

  const SigninSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Please enter your email address'),
    password: Yup.string().required('Please enter your password')
  });

  return (
    <div className={classes.signInPageContainer}>
      <div className={classes.signInFormContainer}>
        <Card className={classes.signInCard}>
          <div className={classes.cardContainer}>
            <div>
              <CardMedia className={classes.signInCardImg} image={image} />
            </div>
            <CardContent className={classes.cardContent}>
              <div className={classes.signInTextDiv}>
                <Typography className={classes.signInText}>Sign In</Typography>
              </div>
              <Formik<FormValues>
                initialValues={{ email: '', password: '' }}
                onSubmit={values => {
                  postSignInForm(values);
                }}
                validationSchema={SigninSchema}
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
                      component={SigninInput}
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
