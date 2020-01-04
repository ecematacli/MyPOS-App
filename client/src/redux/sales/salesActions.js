import api from '../../api/api';

export const createSale = products => async dispatch => {
  const response = await api.post('/sales', [...products]);

  dispatch({
    type: 'CREATE_SALE',
    payload: response.data
  });
};

export const fetchSales = (page = 1, rowsPerPage = 10) => async dispatch => {
  const response = await api.get(
    `/sales?page=${page}&rowsPerPage=${rowsPerPage}`
  );

  dispatch({
    type: 'FETCH_SALES',
    payload: response.data
  });
};
