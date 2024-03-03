import React from 'react'

import { SignInPage } from '../sign-in'
import { render } from '../../../testUtils/render'

describe('[Sign In Page component]', () => {
  test('renders sign in page with inputs and buttons when the user is not authenticated', () => {
    const { getByTestId } = render(<SignInPage />)

    expect(getByTestId('email')).toBeInTheDocument()
    expect(getByTestId('password')).toBeInTheDocument()
    expect(getByTestId('custom-button')).toHaveTextContent('Giriş Yap')
  })
})
