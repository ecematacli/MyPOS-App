import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';

import useProductFields from '../useProductDetails';
import { Args, EditProductAction } from '../types';
import {
  createTestProduct,
  testBrands,
  testCategories,
} from '../../../../../testUtils';

let args: Args;
let editProduct: EditProductAction;
const addNotification = jest.fn();
const products = createTestProduct(4, [200, 80, 980, 99], [10, 5, 120, 0]);

beforeEach(() => {
  editProduct = jest.fn();
  args = {
    product: products[0],
    editProduct,
    addNotification,
    brands: testBrands,
    categories: testCategories,
  };
});

describe('[useProductFields Hook]', () => {
  test('calls handleInputChange function and sets input values correctly', () => {
    const { result } = renderHook(() => useProductFields(args));

    act(() =>
      result.current.handleInputChange({
        target: { name: 'barcode', value: '98678264' },
      } as React.ChangeEvent<HTMLInputElement>)
    );

    expect(result.current.productVal.barcode).toBe('98678264');

    act(() =>
      result.current.handleInputChange({
        target: { name: 'brand', value: 'Nike' },
      } as React.ChangeEvent<HTMLInputElement>)
    );

    expect(result.current.productVal.brand).toBe('Nike');
  });

  test('calls handleInputChange function for barcode, price, discount and does not set the input if they are not number', async () => {
    args = { ...args, product: products[1] };
    const { result } = renderHook(() => useProductFields(args));

    await act(async () =>
      result.current.handleInputChange({
        target: { name: 'barcode', value: '986782axgha' },
      } as React.ChangeEvent<HTMLInputElement>)
    );

    expect(result.current.productVal.barcode).toBe('3490150122856');

    await act(async () =>
      result.current.handleInputChange({
        target: { name: 'price', value: '85a.99' },
      } as React.ChangeEvent<HTMLInputElement>)
    );

    expect(result.current.productVal.price).toBe(80);

    await act(async () =>
      result.current.handleInputChange({
        target: { name: 'discountPrice', value: '6gh' },
      } as React.ChangeEvent<HTMLInputElement>)
    );

    expect(result.current.productVal.discountPrice).toBe(5);
  });

  test('calls renderProductValues function to display product values', async () => {
    const product = { ...products[2], category: 'Raket' } as any;
    args = { ...args, product };
    const { result } = renderHook(() => useProductFields(args));

    await act(async () => result.current.renderProductValues(''));
    expect(result.current.renderProductValues('')).toBe('-');

    await act(async () => result.current.renderProductValues('brand'));
    expect(result.current.renderProductValues('brand')).toBe('Tecnifibre');

    await act(async () => result.current.renderProductValues('category'));
    expect(result.current.renderProductValues('category')).toBe('Raket');

    await act(async () => result.current.renderProductValues('price'));
    expect(result.current.renderProductValues('price')).toBe(980);
  });

  test('calls renderProductValues function with null product values', async () => {
    const product = { ...products[2], category: null, taxRate: null } as any;
    args = { ...args, product };
    const { result } = renderHook(() => useProductFields(args));

    await act(async () => result.current.renderProductValues('category'));
    expect(result.current.renderProductValues('category')).toBe('-');

    await act(async () => result.current.renderProductValues('taxRate'));
    expect(result.current.renderProductValues('taxRate')).toBe('-');
  });

  test('calls getInputValues function to display product values typed in by the user', async () => {
    const product = { ...products[3] } as any;
    args = { ...args, product };
    const { result } = renderHook(() => useProductFields(args));

    await act(async () => result.current.getInputValues(''));
    expect(result.current.getInputValues('')).toBe('');

    await act(async () => result.current.getInputValues('brand'));
    expect(result.current.getInputValues('brand')).toBe('Tecnifibre');

    await act(async () => result.current.getInputValues('category'));
    expect(result.current.getInputValues('category')).toBe('Raket');
  });

  test('calls handleEditedRow function and sets edited rows correctly', () => {
    const { result } = renderHook(() => useProductFields(args));

    act(() => result.current.handleEditedRow('sku'));
    act(() => result.current.handleEditedRow('barcode'));
    act(() => result.current.handleEditedRow('price'));

    expect(result.current.editedRow).toEqual({
      sku: true,
      barcode: true,
      price: true,
    });

    act(() => result.current.handleEditedRow('price'));
    act(() => result.current.handleEditedRow('barcode'));
    act(() => result.current.handleEditedRow('discountPrice'));

    expect(result.current.editedRow).toEqual({
      sku: true,
      barcode: false,
      price: false,
      discountPrice: true,
    });
  });

  test('calls completeEdit function and flips enabledEdit state', () => {
    args = { ...args, product: products[1] };
    const { result } = renderHook(() => useProductFields(args));

    act(() => result.current.handleEditClick());
    expect(result.current.enabledEdit).toBeTruthy();

    act(() => result.current.handleEditClick());
    expect(result.current.enabledEdit).toBeFalsy();
    expect(result.current.editedRow).toEqual({});
  });

  test('calls handleEditClick function which calls editProduct action', async () => {
    const { result } = renderHook(() => useProductFields(args));

    act(() =>
      result.current.handleInputChange({
        target: { name: 'price', value: '100' },
      } as React.ChangeEvent<HTMLInputElement>)
    );

    await act(async () =>
      result.current.completeEdit('price', '100', 1, 'Price')
    );

    expect(editProduct).toBeCalledWith({
      updatedField: { price: '100' },
      productId: 1,
      label: 'Price',
      addNotification,
    });

    await act(async () =>
      result.current.completeEdit('brand', 'Wilson', 1, 'Brand')
    );

    expect(editProduct).toBeCalledWith({
      updatedField: { brandId: '8' },
      productId: 1,
      label: 'Brand',
      addNotification,
    });

    expect(editProduct).toHaveBeenCalledTimes(2);
  });

  test('does not call editProduct action when the value is not changed', async () => {
    args = { ...args, product: products[2] };

    const { result } = renderHook(() => useProductFields(args));

    act(() =>
      result.current.handleInputChange({
        target: { name: 'price', value: '980' },
      } as React.ChangeEvent<HTMLInputElement>)
    );

    await act(async () =>
      result.current.completeEdit('price', '980', 2, 'Price')
    );

    act(() =>
      result.current.handleInputChange({
        target: { name: 'brand', value: 'Tecnifibre' },
      } as React.ChangeEvent<HTMLInputElement>)
    );

    await act(async () =>
      result.current.completeEdit('brandId', 'Tecnifibre', 11, 'Brand')
    );

    expect(editProduct).not.toBeCalled();
  });
});
