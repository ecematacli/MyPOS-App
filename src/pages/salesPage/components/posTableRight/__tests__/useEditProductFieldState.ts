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

  test('calls resetInput function with a field argument and resets that input value', () => {
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

  test('calls handleClose function with a field argument and sets that field from anchorEl state to null', () => {
    const { result } = renderHook(() => useEditProductFieldState(args));

    act(() => result.current.handleClose('discountPrice'));

    expect(result.current.anchorEl.discountPrice).toBe(null);

    act(() => result.current.handleClose('price'));

    expect(result.current.anchorEl.price).toBeNull();
    expect(result.current.anchorEl).toEqual({
      discountPrice: null,
      price: null,
    });
  });

  test('calls onCompletePriceEditClick function and local storage & editProduct action with the right arguments if the value has changed', () => {
    const { result } = renderHook(() => useEditProductFieldState(args));

    act(() =>
      result.current.handleEditClick(event, 'price', 0, createTestProduct()[0])
    );

    act(() => result.current.onCompletePriceEditClick('price', 2780));
    expect(editProduct).toBeCalledTimes(1);
    expect(editProduct).toBeCalledWith({
      updatedField: { price: '2780' },
      productId: 0,
      label: 'Price',
      addNotification,
    });
    expect(result.current.id).toBeNull();
    expect(editProductFieldLocalStorageState).toBeCalledWith(0, 'price', 2780);
  });

  test('calls onCompletePriceEditClick function, it does not call local storage & editProduct action if the value has not changed', () => {
    const { result } = renderHook(() => useEditProductFieldState(args));

    act(() =>
      result.current.handleEditClick(
        event,
        'discountPrice',
        1,
        createTestProduct(2, [120, 50], [110, 40])[1]
      )
    );

    act(() => result.current.onCompletePriceEditClick('discountPrice', 40));
    expect(editProduct).toBeCalledTimes(0);
    expect(result.current.id).not.toBeNull();
    expect(editProductFieldLocalStorageState).toBeCalledTimes(0);
  });

  test('resets discountedPrice input value to the discountPrice of the edited product every time id changes', () => {
    const { result } = renderHook(() => useEditProductFieldState(args));

    act(() =>
      result.current.handleEditClick(event, 'discountPrice', 0, products[0])
    );

    expect(result.current.discountedPriceValue).toBe(67);

    act(() =>
      result.current.handleEditClick(event, 'discountPrice', 1, products[1])
    );

    expect(result.current.discountedPriceValue).toBe(25);

    act(() =>
      result.current.handleEditClick(event, 'discountPrice', 3, products[3])
    );

    expect(result.current.discountedPriceValue).toBe(0);
  });

  test('resets price input value to the price of the edited product every time id changes', () => {
    const { result } = renderHook(() => useEditProductFieldState(args));

    act(() => result.current.handleEditClick(event, 'price', 0, products[0]));

    expect(result.current.priceValue).toBe(1880);

    act(() => result.current.handleEditClick(event, 'price', 1, products[1]));

    expect(result.current.priceValue).toBe(99.56);

    act(() => result.current.handleEditClick(event, 'price', 2, products[2]));

    expect(result.current.priceValue).toBe(280.9);
  });
});
