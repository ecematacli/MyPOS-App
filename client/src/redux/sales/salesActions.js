import sales from '../../api/sales';

export const createSale = products => async dispatch => {
  const response = await sales.post('/sales', [...products]);

  dispatch({
    type: 'CREATE_SALE',
    payload: response.data
  });
};

export const fetchSales = () => async dispatch => {
  const response = await sales.get('/sales');

  dispatch({
    type: 'FETCH_SALES',
    payload: response.data
  });
};
