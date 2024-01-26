import api from '../../api/api-client'

interface Props {
  onSuccess?: (data: any) => void
  onError?: (e: any) => void
  payload?: any
}

export const usePostRequest = () => {
  const submit = async (
    url: string,
    { payload, onError, onSuccess }: Props
  ) => {
    try {
      const { data } = await api.post(url, payload)
      onSuccess && onSuccess(data)
      return [data]
    } catch (e) {
      onError && onError(e.response && e.response.data)
      return [null, e.response]
    }
  }

  return [submit]
}
