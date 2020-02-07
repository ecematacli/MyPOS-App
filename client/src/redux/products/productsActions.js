import api from '../../api';
import { FETCH_PRODUCTS, EDIT_PRODUCT, CREATE_PRODUCT } from './types';
import { findMatchedFields } from '../../common/utils/index';

export const fetchProducts = (
  page = 1,
  rowsPerPage = 10,
  categoryName,
  brandName,
  searchQuery
) => async (dispatch, getState) => {
  let url = `/products?page=${page}&rowsPerPage=${rowsPerPage}`;

  if (categoryName) {
    url += `&categoryId=${
      findMatchedFields(getState().categories, categoryName).id
    }`;
  }
  if (brandName) {
    url += `&brandId=${findMatchedFields(getState().brands, brandName).id}`;
  }
  if (searchQuery) {
    url += `&query=${searchQuery}`;
  }

  const response = await api.get(url);

  dispatch({
    type: FETCH_PRODUCTS,
    payload: response.data
  });
};

export const editProduct = (
  fieldId,
  productVal,
  productId,
  label,
  addNotification
) => async (dispatch, getState) => {
  try {
    let updatedField = {
      [fieldId]: productVal
    };

    if (fieldId === 'brand') {
      updatedField = {
        brandId: findMatchedFields(getState().brands, productVal).id.toString()
      };
    }
    if (fieldId === 'category') {
      updatedField = {
        categoryId: findMatchedFields(
          getState().categories,
          productVal
        ).id.toString()
      };
    }

    const response = await api.patch(`/products/${productId}/`, updatedField);

    dispatch({
      type: EDIT_PRODUCT,
      payload: response.data
    });
    addNotification(`${label} has been successfully updated`, 'success');
  } catch (e) {
    addNotification(`${label} could not be updated!`, 'error');
  }
};

export const createProduct = (product, addNotification) => async dispatch => {
  try {
    const response = await api.post('/products', {
      ...product,
      price: parseFloat(product.price),
      discountPrice: parseFloat(product.discountPrice)
    });

    addNotification('Product has been created successfully', 'success');

    dispatch({
      type: CREATE_PRODUCT,
      payload: response.data
    });
  } catch (e) {
    addNotification('Product could not be created!', 'error');
  }
};
