import { renderHook, act } from '@testing-library/react-hooks';

import useEditProductFieldState from '../useEditProductFieldState';
import {
  Args,
  EditProductAction,
  EditProductFieldLocalStorageState,
  ChangeEvent,
  ClickEvent,
} from '../types';
import { createTestProduct } from '../../../../../testUtils';

let args: Args;
let editProduct: EditProductAction;
let editProductFieldLocalStorageState: EditProductFieldLocalStorageState;
const addNotification = jest.fn();

const event = {
  target: {},
} as ClickEvent;

const products = createTestProduct(
  4,
  [1880, 99.56, 280.9, 78],
  [67, 25, 99, 0]
);

beforeEach(() => {
  editProduct = jest.fn();
  editProductFieldLocalStorageState = jest.fn();

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

  test('calls handlePriceChange function with an empty string and then with a number', () => {
    const { result } = renderHook(() => useEditProductFieldState(args));

    act(() =>
      result.current.handlePriceChange({
        target: { name: 'price', value: '' },
      } as ChangeEvent)
    );

    expect(result.current.priceValue).toBe('');

    act(() =>
      result.current.handlePriceChange({
        target: { name: 'price', value: '580.99' },
      } as ChangeEvent)
    );

    expect(result.current.priceValue).toBe(580.99);
  });

  test('calls resetInput function with an argument and resets that input value', () => {
    const { result } = renderHook(() => useEditProductFieldState(args));

    act(() => result.current.resetInputValue('discountPrice'));

    expect(result.current.discountedPriceValue).toBe(0);

    act(() => result.current.resetInputValue('price'));

    expect(result.current.discountedPriceValue).toBe(0);
  });

  test('calls handleEditClick function with arguments and sets id, anchorEl and editedProduct states properly', () => {
    const { result } = renderHook(() => useEditProductFieldState(args));

    const products = createTestProduct(
      2,
      [55, 60, 1780.9, 99],
      [80, null, 1690]
    );
    act(() =>
      result.current.handleEditClick(event, 'discountPrice', 2, products[2])
    );

    expect(result.current.anchorEl).toHaveProperty('discountPrice');
    expect(result.current.id).toBe(2);
    expect(result.current.editedProduct).toBe(products[2]);
  });

  test('calls editProduct action with the right arguments', () => {
    const { result } = renderHook(() => useEditProductFieldState(args));

    act(() =>
      result.current.handleEditClick(event, 'price', 0, createTestProduct()[0])
    );

    act(() =>
      result.current.handlePriceChange({
        target: { name: 'price', value: '2780' },
      } as ChangeEvent)
    );

    act(() => result.current.onCompletePriceEditClick('price', 2780));
    expect(editProduct).toBeCalledTimes(1);
    expect(editProduct).toBeCalledWith({
      updatedField: { price: '2780' },
      productId: 0,
      label: 'Price',
      addNotification,
    });
  });

  // updatedField,
  // productId,
  // label: capitalizeFirstLetter(field),
  // addNotification,
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
