import { renderHook, act } from '@testing-library/react-hooks'

import { useEditProductFieldState } from '../useEditProductFieldState'
import {
  Args,
  EditProductAction,
  EditProductFieldLocalStorageState,
  ChangeEvent,
  ClickEvent,
  EditProductThunk,
} from '../types'
import { createTestProduct } from '../../../../../testUtils'

jest.mock('../../../../../constants', () => ({
  VITE_API_URL: 'localhost:3000',
}))

let args: Args
let editProduct: EditProductThunk
let editProductFieldLocalStorageState: EditProductFieldLocalStorageState
const addNotification = jest.fn()

const event = {
  target: {},
} as ClickEvent

const products = createTestProduct(4, [1880, 99.56, 280.9, 78], [67, 25, 99, 0])

beforeEach(() => {
  editProduct = jest.fn()
  editProductFieldLocalStorageState = jest.fn()

  args = {
    products,
    editProduct,
    addNotification,
    editProductFieldLocalStorageState,
  }
})

describe('[useEditProductFieldState Hook]', () => {
  test('calls handlePriceChange function with numbers and sets input values correctly', () => {
    const { result } = renderHook(() => useEditProductFieldState(args))

    act(() =>
      result.current.handlePriceChange({
        target: { name: 'price', value: '970' },
      } as ChangeEvent)
    )

    expect(result.current.priceValue).toBe(970)

    act(() =>
      result.current.handlePriceChange({
        target: { name: 'price', value: '70.99' },
      } as ChangeEvent)
    )

    expect(result.current.priceValue).toBe(70.99)
  })

  test('calls handlePriceChange function with an empty string and then with a number', () => {
    const { result } = renderHook(() => useEditProductFieldState(args))

    act(() =>
      result.current.handlePriceChange({
        target: { name: 'price', value: '' },
      } as ChangeEvent)
    )

    expect(result.current.priceValue).toBe('')

    act(() =>
      result.current.handlePriceChange({
        target: { name: 'price', value: '580.99' },
      } as ChangeEvent)
    )

    expect(result.current.priceValue).toBe(580.99)
  })

  test('calls resetInput function with a field argument and resets that input value', () => {
    const { result } = renderHook(() => useEditProductFieldState(args))

    act(() => result.current.resetInputValue('discountPrice'))

    expect(result.current.discountedPriceValue).toBe(0)

    act(() => result.current.resetInputValue('price'))

    expect(result.current.discountedPriceValue).toBe(0)
  })

  test('calls handleEditClick function with arguments and sets id, anchorEl and editedProduct states properly', () => {
    const { result } = renderHook(() => useEditProductFieldState(args))

    const products = createTestProduct(
      2,
      [55, 60, 1780.9, 99],
      [80, null, 1690]
    )
    act(() =>
      result.current.handleEditClick(event, 'discountPrice', 2, products[2])
    )

    expect(result.current.anchorEl).toHaveProperty('discountPrice')
    expect(result.current.id).toBe(2)
    expect(result.current.editedProduct).toBe(products[2])
  })

  test('calls handleClose function with a field argument and sets that field from anchorEl state to null', () => {
    const { result } = renderHook(() => useEditProductFieldState(args))

    act(() => result.current.handleClose('discountPrice'))

    expect(result.current.anchorEl.discountPrice).toBe(null)

    act(() => result.current.handleClose('price'))

    expect(result.current.anchorEl.price).toBeNull()
    expect(result.current.anchorEl).toEqual({
      discountPrice: null,
      price: null,
    })
  })

  test('calls onCompletePriceEditClick function and local storage & editProduct action with the right arguments if the value has changed', () => {
    const { result } = renderHook(() => useEditProductFieldState(args))

    act(() =>
      result.current.handleEditClick(event, 'price', 0, createTestProduct()[0])
    )

    act(() => result.current.onCompletePriceEditClick('price', 2780))
    expect(editProduct).toBeCalledTimes(1)
    expect(editProduct).toBeCalledWith({
      updatedField: { price: '2780' },
      productId: 0,
      label: 'Price',
      addNotification,
    })
    expect(result.current.id).toBeNull()
    expect(editProductFieldLocalStorageState).toBeCalledWith(0, 'price', 2780)
  })

  test('calls onCompletePriceEditClick function, it does not call local storage & editProduct action if the value has not changed', () => {
    const { result } = renderHook(() => useEditProductFieldState(args))

    act(() =>
      result.current.handleEditClick(
        event,
        'discountPrice',
        1,
        createTestProduct(2, [120, 50], [110, 40])[1]
      )
    )

    act(() => result.current.onCompletePriceEditClick('discountPrice', 40))
    expect(editProduct).toBeCalledTimes(0)
    expect(result.current.id).not.toBeNull()
    expect(editProductFieldLocalStorageState).toBeCalledTimes(0)
  })

  test('calls onCompleteDiscountEditClick function with TL discount type and it sets input values on TL and % properly', () => {
    const { result } = renderHook(() => useEditProductFieldState(args))

    let setDiscount: () => void
    let setPercentageDiscount: () => void

    act(() =>
      result.current.onCompleteDiscountEditClick(
        7000,
        'TL',
        1000,
        (setDiscount = jest.fn()),
        (setPercentageDiscount = jest.fn())
      )
    )

    expect(setDiscount).toBeCalledWith(1000)
    expect(setPercentageDiscount).toBeCalledWith(14.285714285714285)

    act(() =>
      result.current.onCompleteDiscountEditClick(
        980,
        'TL',
        80,
        (setDiscount = jest.fn()),
        (setPercentageDiscount = jest.fn())
      )
    )

    expect(setDiscount).toBeCalledWith(80)
    expect(setPercentageDiscount).toBeCalledWith(8.16326530612245)
  })

  test('calls onCompleteDiscountEditClick function with % discount type and it sets input values on % and TL properly', () => {
    const { result } = renderHook(() => useEditProductFieldState(args))

    let setPercentageDiscount: () => void
    let setDiscount: () => void

    act(() =>
      result.current.onCompleteDiscountEditClick(
        9980,
        '%',
        38.99,
        (setDiscount = jest.fn()),
        (setPercentageDiscount = jest.fn())
      )
    )

    expect(setPercentageDiscount).toBeCalledWith(38.99)
    expect(setDiscount).toBeCalledWith(3891.202)

    act(() =>
      result.current.onCompleteDiscountEditClick(
        580.55,
        '%',
        2.8,
        (setDiscount = jest.fn()),
        (setPercentageDiscount = jest.fn())
      )
    )

    expect(setPercentageDiscount).toBeCalledWith(2.8)
    expect(setDiscount).toBeCalledWith(16.255399999999998)
  })

  test('resets discountedPrice input value to the discountPrice of the edited product every time id changes', () => {
    const { result } = renderHook(() => useEditProductFieldState(args))

    act(() =>
      result.current.handleEditClick(event, 'discountPrice', 0, products[0])
    )

    expect(result.current.discountedPriceValue).toBe(67)

    act(() =>
      result.current.handleEditClick(event, 'discountPrice', 1, products[1])
    )

    expect(result.current.discountedPriceValue).toBe(25)

    act(() =>
      result.current.handleEditClick(event, 'discountPrice', 3, products[3])
    )

    expect(result.current.discountedPriceValue).toBe(0)
  })

  test('resets price input value to the price of the edited product every time id changes', () => {
    const { result } = renderHook(() => useEditProductFieldState(args))

    act(() => result.current.handleEditClick(event, 'price', 0, products[0]))

    expect(result.current.priceValue).toBe(1880)

    act(() => result.current.handleEditClick(event, 'price', 1, products[1]))

    expect(result.current.priceValue).toBe(99.56)

    act(() => result.current.handleEditClick(event, 'price', 2, products[2]))

    expect(result.current.priceValue).toBe(280.9)
  })
})
