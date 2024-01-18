import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import { Provider } from 'react-redux'

import { ProductInputStateArgs } from '../types'
import { mockStore } from '../../../../../__mocks__/store'
import { useNewProductInputState } from '../use-new-product-input-state'
import { testBrands, testCategories } from '../../../../../testUtils'
import { NotificationsContext } from '../../../../../contexts/notifications-context'

let wrapper: React.FC
let args: ProductInputStateArgs
const createProduct = jest.fn()
const addNotification = jest.fn()

beforeEach(() => {
  const initialState = {}
  const store = mockStore(initialState)

  args = {
    brands: testBrands,
    categories: testCategories,
    onClose: jest.fn(),
    createProduct,
  }

  wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>
      <NotificationsContext.Provider
        value={{
          notifications: null,
          removeNotification: null,
          addNotification,
        }}>
        {children}
      </NotificationsContext.Provider>
    </Provider>
  )
})
describe('[useProductFields Hook]', () => {
  const initialValues = {
    brand: '',
    category: '',
    taxRate: '18',
  }
  test('sets additional input values to the correct values with handleInputChange function', () => {
    const { result } = renderHook(() => useNewProductInputState(args), {
      wrapper,
    })
    act(() =>
      result.current.handleInputChange({
        target: { name: 'brand', value: 'Luxilon' },
      } as React.ChangeEvent<HTMLInputElement>)
    )

    expect(result.current.additionalInputs).toEqual({
      ...initialValues,
      brand: 'Luxilon',
    })

    act(() =>
      result.current.handleInputChange({
        target: { name: 'taxRate', value: '8' },
      } as React.ChangeEvent<HTMLInputElement>)
    )

    expect(result.current.additionalInputs).toEqual({
      ...initialValues,
      brand: 'Luxilon',
      taxRate: '8',
    })
  })

  test('calls createProduct action with correct values add product click', async () => {
    const { result } = renderHook(() => useNewProductInputState(args), {
      wrapper,
    })

    act(() =>
      result.current.handleInputChange({
        target: { name: 'category', value: 'Çanta' },
      } as React.ChangeEvent<HTMLInputElement>)
    )

    const inputValues = {
      barcode: '1274892899',
      name: 'Nike',
      qty: 1,
      sku: '1728917',
      price: '892,99',
      variation: '42',
      discountPrice: '875,56',
    }
    await act(async () => result.current.onAddProductClick(inputValues))

    expect(createProduct).toBeCalledTimes(1)
    expect(createProduct).toBeCalledWith(
      {
        ...inputValues,
        price: parseFloat(inputValues.price),
        discountPrice: parseFloat(inputValues.discountPrice),
        taxRate: 18,
        categoryId: 8,
        brandId: null,
      },
      addNotification
    )

    expect(result.current.additionalInputs).toMatchObject(initialValues)
  })
})
