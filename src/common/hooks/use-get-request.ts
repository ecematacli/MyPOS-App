import { useState, useEffect } from 'react'

import api from '../../api/api-client'

export const useGetRequest = <R>(
  url: string
): { loading: boolean; value: R; error: any } => {
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState(null)
  const [error, setError] = useState(null)

  const call = async () => {
    setLoading(true)
    setValue(null)
    setError(null)
    try {
      const { data } = await api.get(url)
      setValue(data)
      setLoading(false)
    } catch (e) {
      setError(e.response)
      if ([401, 403].includes(e.response?.status)) {
        location.replace('/signin')
        localStorage.removeItem('token')
      }
      setLoading(false)
    }
  }

  useEffect(() => {
    call()
  }, [])

  return { loading, value, error }
}
