import React from 'react'
import { Card, CardContent, Typography, CardMedia } from '@mui/material'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'

import styles from './styles'
import image from '../../assets/img/accountant.jpg'
import { useLoginState } from './hooks/useLoginState'
import { CustomButton } from '../../common/components/custom-button/custom-button'
import SigninInput from './components/SigninInput'
import { SIGNIN_FIELDS } from './signInFields'

export interface FormValues {
  email: string
  password: string
}

export const SignInPage = () => {
  const classes = styles()
  const { postSignInForm } = useLoginState()

  const SigninSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Please enter your email address'),
    password: Yup.string().required('Please enter your password'),
  })

  return (
    <div className={classes.signInPageContainer}>
      <Card className={classes.signInCard}>
        <div className={classes.cardContainer}>
          <span>
            <CardMedia
              component='img'
              className={classes.signInCardImg}
              image={image}
            />
          </span>
          <CardContent className={classes.cardContent}>
            <div className={classes.signInTextDiv}>
              <Typography className={classes.signInText}>Sign In</Typography>
            </div>
            <Formik<FormValues>
              initialValues={{ email: '', password: '' }}
              onSubmit={values => {
                postSignInForm(values)
              }}
              validationSchema={SigninSchema}>
              <Form autoComplete='new-password' className={classes.signInForm}>
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
                <CustomButton data-testid='custom-button' type='submit'>
                  <Typography className={classes.btnText}>Sign In</Typography>
                </CustomButton>
              </Form>
            </Formik>
          </CardContent>
        </div>
      </Card>
    </div>
  )
}
