import api from '../../api';

export const usePostRequest = () => {
  const submit = async (url: string, payload: any) => {
    try {
      const { data } = await api({ url, method: 'post', data: payload });
      return [data];
    } catch (e) {
      return [null, e.response];
    }
  };

  return [submit];
};
