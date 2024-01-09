import React from 'react'
import { Box } from '@mui/material'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'

import {
  ButtonText,
  CardContainer,
  CardContentContainer,
  SignInCard,
  SignInText,
  StyledCardContent,
  StyledCardMedia,
} from './sign-in-styles'
import image from '../../assets/img/accountant.jpg'
import { useLoginState } from './hooks/use-login-state'
import { CustomButton } from '../../common/components/custom-button/custom-button'
import { SignInInput } from './components/sign-in-input'
import { SIGNIN_FIELDS } from './signInFields'
import { PageContainer } from 'common/components/page-container/page-container'

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
    <PageContainer>
      <CardContainer>
        <SignInCard>
          <CardContentContainer>
            <Box component='span'>
              <StyledCardMedia image={image} />
            </Box>
            <StyledCardContent>
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
            </StyledCardContent>
          </CardContentContainer>
        </SignInCard>
      </CardContainer>
    </PageContainer>
  )
}
