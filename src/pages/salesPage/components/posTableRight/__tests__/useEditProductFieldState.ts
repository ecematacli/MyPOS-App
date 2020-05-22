import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';

import useEditProductFieldState from '../useEditProductFieldState';
import {
  Args,
  EditProductAction,
  EditProductFieldLocalStorageState,
  ChangeEvent,
} from '../types';

import { createTestProduct } from '../../../../../testUtils';

let args: Args;
let editProduct: EditProductAction;
let editProductFieldLocalStorageState: EditProductFieldLocalStorageState;
const addNotification = jest.fn();
const products = createTestProduct(
  4,
  [1880, 99.56, 280.9, 78],
  [67, 25, 99, 0]
);

beforeEach(() => {
  editProduct = jest.fn();
  args = {
    products,
    editProduct,
    addNotification,
    editProductFieldLocalStorageState,
  };
});

describe('[useEditProductFieldState Hook]', () => {
  test('calls handlePriceChange function with numbers and sets input values correctly', () => {
    const { result } = renderHook(() => useEditProductFieldState(args));

    act(() =>
      result.current.handlePriceChange({
        target: { name: 'price', value: '970' },
      } as ChangeEvent)
    );

    expect(result.current.priceValue).toBe(970);

    act(() =>
      result.current.handlePriceChange({
        target: { name: 'price', value: '70.99' },
      } as ChangeEvent)
    );

    expect(result.current.priceValue).toBe(70.99);
  });

  test('calls handlePriceChange function with non-numeric characters and sets input value to 0', () => {
    const { result } = renderHook(() => useEditProductFieldState(args));

    act(() =>
      result.current.handlePriceChange({
        target: { name: 'price', value: 'a7aa' },
      } as ChangeEvent)
    );

    expect(result.current.priceValue).toBe(0);

    act(() =>
      result.current.handlePriceChange({
        target: { name: 'price', value: '7b17,9ax' },
      } as ChangeEvent)
    );

    expect(result.current.priceValue).toBe(0);
  });

  test('calls resetInput function and resets input value', () => {
    const { result } = renderHook(() => useEditProductFieldState(args));

    act(() => result.current.resetInputValue('price'));

    expect(result.current.priceValue).toBe(0);
  });

  test('calls editProduct action with the right arguments', () => {
    const { result } = renderHook(() => useEditProductFieldState(args));

    act(() =>
      result.current.handlePriceChange({
        target: { name: 'price', value: '2780' },
      } as ChangeEvent)
    );

    act(() => result.current.onCompletePriceEditClick('price', 2780));

    expect(editProduct).toBeCalledWith({
      updatedField: { price: '2780' },
      productId: 3,
      label: 'Price',
      addNotification,
    });
  });

  // test('resets price input value to the price of product every time id changes', () => {
  //   args = {
  //     id: 2,
  //     editProduct,
  //     addNotification,
  //     products,
  //   };
  //   const { result } = renderHook(() => useEditProductFieldState(args));

  //   expect(result.current.priceValue).toBe(280.9);
  // });
});
