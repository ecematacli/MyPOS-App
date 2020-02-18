import { FETCH_PRODUCTS, EDIT_PRODUCT, CREATE_PRODUCT } from './types';
import createAPIAction from '../middlewares/createAPIAction';
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
  dispatch(createAPIAction(FETCH_PRODUCTS, 'get', url));
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

    dispatch(
      createAPIAction(
        EDIT_PRODUCT,
        'patch',
        `/products/${productId}/`,
        updatedField
      )
    );
    addNotification(`${label} has been successfully updated`, 'success');
  } catch (e) {
    addNotification(`${label} could not be updated!`, 'error');
  }
};

export const createProduct = (
  inputValues,
  additionalInputValues,
  addNotification
) => async (dispatch, getState) => {
  try {
    let categoryId;
    let brandId;

    if (additionalInputValues.category) {
      categoryId = findMatchedFields(
        getState().categories,
        additionalInputValues.category
      ).id.toString();
    }
    if (additionalInputValues.brand) {
      brandId = findMatchedFields(
        getState().brands,
        additionalInputValues.brand
      ).id.toString();
    }

    dispatch(
      createAPIAction(CREATE_PRODUCT, 'post', '/products', {
        ...inputValues,
        price: parseFloat(inputValues.price),
        discountPrice: parseFloat(inputValues.discountPrice),
        taxRate: additionalInputValues.taxRate,
        categoryId,
        brandId
      })
    );

    addNotification('Product has been created successfully', 'success');
  } catch (e) {
    addNotification('Product could not be created!', 'error');
  }
};
