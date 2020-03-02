import {
  ActionTypes,
  NotificationType,
  AdditionalInputs,
  InputValues
} from './types';
import { StoreState } from '../types';
import createAPIAction from '../createAPIAction';
import { findMatchedFields } from '../../common/utils/index';
import { Dispatch } from 'redux';

export const fetchProducts = (
  page: number = 1,
  rowsPerPage: number = 10,
  categoryName: string,
  brandName: string,
  searchQuery: string
) => async (dispatch: Dispatch<any>, getState: () => StoreState) => {
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
  dispatch(createAPIAction(ActionTypes.FETCH_PRODUCTS, 'get', url));
};

export const editProduct = (
  fieldId: string,
  productVal: string | number,
  productId: number,
  label: string,
  addNotification: (m: string, t: string) => void
) => async (dispatch: Dispatch<any>, getState: () => StoreState) => {
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
      ActionTypes.EDIT_PRODUCT,
      'patch',
      `/products/${productId}/`,
      updatedField,
      () =>
        addNotification(`${label} has been successfully updated`, 'success'),
      () => addNotification(`${label} could not be updated!`, 'error')
    )
  );
};

export const createProduct = (
  inputValues: InputValues,
  additionalInputValues: AdditionalInputs,
  addNotification: NotificationType
) => async (dispatch: Dispatch<any>, getState: () => StoreState) => {
  let categoryId: string;
  let brandId: string;

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

  const productData = {
    ...inputValues,
    price: parseFloat(inputValues.price),
    discountPrice: parseFloat(inputValues.discountPrice),
    taxRate: additionalInputValues.taxRate,
    categoryId,
    brandId
  };

  dispatch(
    createAPIAction(
      ActionTypes.CREATE_PRODUCT,
      'post',
      '/products',
      productData,
      () => addNotification('Product has been created successfully', 'success'),
      () => addNotification('Product could not be created!', 'error')
    )
  );
};
