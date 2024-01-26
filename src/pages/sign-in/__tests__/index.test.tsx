import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { SignInPage } from '../sign-in'
import { render } from '../../../testUtils/render'

describe.skip('[Sign In Page component]', () => {
  test('renders sign in page with inputs and buttons when the user is not authenticated', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <SignInPage />
      </BrowserRouter>,
      false
    )

    expect(getByTestId('email')).toBeInTheDocument()
    expect(getByTestId('password')).toBeInTheDocument()
    expect(getByTestId('custom-button')).toHaveTextContent('Sign In')
  })

  test('does not render the sign in page when user is authenticated', async () => {
    const { queryByTestId } = render(
      <BrowserRouter>
        <SignInPage />
      </BrowserRouter>
    )

    expect(queryByTestId('email')).not.toBeInTheDocument()
    expect(queryByTestId('password')).not.toBeInTheDocument()
  })
})
