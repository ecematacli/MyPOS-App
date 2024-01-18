import { useContext } from 'react'
import { useHistory } from 'react-router-dom'

import api from '../../../api/api-client'
import { AuthTokenSettingContext } from '../../../contexts/auth-context'
import { NotificationsContext } from '../../../contexts/notifications-context'
import { FormValues } from '../sign-in'

export const useLoginState = () => {
  const { saveAuthToken } = useContext(AuthTokenSettingContext)
  const { addNotification } = useContext(NotificationsContext)
  const history = useHistory()

  const postSignInForm = async (userCredentials: FormValues) => {
    try {
      const response = await api.post<string>('/login', userCredentials)
      if (response) {
        saveAuthToken(response.data)
        history.push('/')
      } else {
        saveAuthToken(null)
      }
    } catch (e) {
      const { status } = e.response
      if (status === 400 || status === 401 || status === 403) {
        const errorMessage =
          'There was a problem logging in. Check your email and password!'
        addNotification(errorMessage, 'error')
      } else {
        addNotification('Something went wrong!', 'error')
      }
    }
  }

  return { postSignInForm }
}
