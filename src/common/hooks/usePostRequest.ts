import api from '../../api'

interface Props {
  onSuccess?: (data: any) => void
  onError?: (e: any) => void
  payload?: any
}

export const usePostRequest = () => {
  const submit = async (url: string, { payload, onError, onSuccess }: Props) => {
    try {
      const { data } = await api({ url, method: 'post', data: payload })
      onSuccess && onSuccess(data)
      return [data]
    } catch (e) {
      onError && onError(e.response && e.response.data)
      return [null, e.response]
    }
  }

  return [submit]
}
