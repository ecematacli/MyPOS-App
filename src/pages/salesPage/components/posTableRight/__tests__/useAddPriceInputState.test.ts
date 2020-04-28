import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';

import useAddPriceInputState from '../useAddPriceInputState';
import { Args, EditProductAction } from '../types';

import { createTestProduct } from '../../../../../testUtils';

let args: Args;
let editProduct: EditProductAction;
const addNotification = jest.fn();
const products = createTestProduct(
  4,
  [1880, 99.56, 280.9, 78],
  [67, 25, 99, 0]
);

beforeEach(() => {
  editProduct = jest.fn();
  args = {
    id: 7,
    products,
    editProduct,
    addNotification,
  };
});

describe('[useProductFields Hook]', () => {
  test('calls handleInputChange function and sets input values correctly', () => {
    const { result } = renderHook(() => useAddPriceInputState(args));

    act(() =>
      result.current.handleInputChange({
        target: { name: 'price', value: '970' },
      } as React.ChangeEvent<HTMLInputElement>)
    );

    expect(result.current.inputValue).toBe(970);

    act(() =>
      result.current.handleInputChange({
        target: { name: 'price', value: '' },
      } as React.ChangeEvent<HTMLInputElement>)
    );

    expect(result.current.inputValue).toBe(0);
  });

  test('calls resetInput function and resets input value', () => {
    const { result } = renderHook(() => useAddPriceInputState(args));

    act(() => result.current.resetInput());

    expect(result.current.inputValue).toBe(0);
  });

  test('calls editProduct action with the right arguments', () => {
    const { result } = renderHook(() => useAddPriceInputState(args));

    act(() =>
      result.current.handleInputChange({
        target: { name: 'price', value: '2780' },
      } as React.ChangeEvent<HTMLInputElement>)
    );

    act(() => result.current.editPriceValue(3));

    expect(editProduct).toBeCalledWith({
      updatedField: { price: '2780' },
      productId: 3,
      label: 'Price',
      addNotification,
    });
  });

  test('resets price input value to the price of product every time id changes', () => {
    args = {
      id: 2,
      editProduct,
      addNotification,
      products,
    };
    const { result } = renderHook(() => useAddPriceInputState(args));

    expect(result.current.inputValue).toBe(280.9);
  });
});
