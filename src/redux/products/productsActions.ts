import { ActionTypes, ApiAction } from '../types';
import {
  AdditionalInputs,
  InputValues,
  UpdatedField,
  ProductData
} from './types';
import { StoreState } from '../types';
import createAPIAction from '../createAPIAction';
import { findMatchedFields } from '../../common/utils/index';
import { Dispatch } from 'redux';

export const fetchProducts = (
  page: number = 1,
  rowsPerPage: number = 10,
  categoryId?: number,
  brandId?: number,
  searchQuery?: string
) => async (dispatch: Dispatch) => {
  let url = `/products?page=${page}&rowsPerPage=${rowsPerPage}`;

  if (categoryId) {
    url += `&categoryId=${categoryId}`;
  }
  if (brandId) {
    url += `&brandId=${brandId}`;
  }

  if (searchQuery) {
    url += `&query=${searchQuery}`;
  }
  dispatch<ApiAction>(createAPIAction(ActionTypes.FETCH_PRODUCTS, 'get', url));
};

export const editProduct = (
  fieldId: string,
  fieldValue: string,
  productId: number,
  label: string,
  addNotification: (m?: string, t?: string) => void
) => async (dispatch: Dispatch, getState: () => StoreState) => {
  let updatedField: UpdatedField = {
    [fieldId]: fieldValue
  };

  if (fieldId === 'brand') {
    updatedField = {
      brandId: findMatchedFields(getState().brands, fieldValue).id.toString()
    };
  }

  if (fieldId === 'category') {
    updatedField = {
      categoryId: findMatchedFields(
        getState().categories,
        fieldValue
      ).id.toString()
    };
  }

  dispatch<ApiAction>(
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
  addNotification: (m: string, t: string) => void
) => async (dispatch: Dispatch, getState: () => StoreState) => {
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

  const productData: ProductData = {
    ...inputValues,
    taxRate: additionalInputValues.taxRate,
    categoryId,
    brandId
  };

  dispatch<ApiAction>(
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
