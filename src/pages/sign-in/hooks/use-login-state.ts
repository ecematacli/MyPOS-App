import { useHistory } from 'react-router-dom'

import { api } from '../../../api/api-client'
import { useAuthTokenContext } from '../../../contexts/auth-context'
import { useNotificationsContext } from '../../../contexts/notifications-context'
import { FormValues } from '../sign-in'

export const useLoginState = () => {
  const { saveAuthToken } = useAuthTokenContext()
  const { addNotification } = useNotificationsContext()

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
      if ([400, 401, 403].includes(e.response?.status)) {
        addNotification(
          'There was a problem logging in. Check your email and password!',
          'error'
        )
      } else {
        addNotification('Something went wrong!', 'error')
      }
    }
  }

  return { postSignInForm }
}
