import React from 'react'
import { Box, CardContent, Grid } from '@mui/material'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'

import {
  ButtonText,
  SignInCard,
  SignInText,
  StyledCardMedia,
} from './sign-in-styles'
import image from '../../assets/img/accountant.jpg'
import { useLoginState } from './hooks/use-login-state'
import { CustomButton } from '../../common/components/custom-button/custom-button'
import { SignInInput } from './components/sign-in-input'
import { PageContainer } from 'common/components/page-container/page-container'

export const SIGNIN_FIELDS: { label: string; name: string }[] = [
  {
    label: 'E-posta Adresi*',
    name: 'email',
  },
  {
    label: 'Şifre*',
    name: 'password',
  },
]
export interface FormValues {
  email: string
  password: string
}

export const SignInPage = () => {
  const { postSignInForm } = useLoginState()

  const SignInSchema = Yup.object().shape({
    email: Yup.string()
      .email('Geçersiz e-posta adresi')
      .required('Lütfen e-posta adresinizi girin'),
    password: Yup.string().required('Lütfen şifrenizi girin'),
  })

  return (
    <PageContainer height='100%'>
      <Box
        height='100%'
        display='flex'
        justifyContent='center'
        alignItems='center'>
        <SignInCard>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} display='flex' justifyContent='center'>
              <StyledCardMedia image={image} component='div' />
            </Grid>
            <Grid item xs={12} md={6}>
              <CardContent>
                <Box display='flex' justifyContent='center' alignItems='center'>
                  <SignInText>Giriş Yap</SignInText>
                </Box>
                <Formik<FormValues>
                  initialValues={{ email: '', password: '' }}
                  onSubmit={values => {
                    postSignInForm(values)
                  }}
                  validationSchema={SignInSchema}>
                  <Form
                    autoComplete='new-password'
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column',
                    }}>
                    {SIGNIN_FIELDS.map(({ label, name }) => (
                      <Field
                        key={label}
                        label={label}
                        name={name}
                        fieldId={name}
                        type={name}
                        component={SignInInput}
                      />
                    ))}
                    <CustomButton data-testid='custom-button' type='submit'>
                      <ButtonText>Giriş Yap</ButtonText>
                    </CustomButton>
                  </Form>
                </Formik>
              </CardContent>
            </Grid>
          </Grid>
        </SignInCard>
      </Box>
    </PageContainer>
  )
}
