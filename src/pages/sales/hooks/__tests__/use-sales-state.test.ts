import { renderHook, act } from '@testing-library/react-hooks'

import { useSalesState } from '../use-sales-state'
import { createTestProduct, getTotalQty } from '../../../../testUtils'

describe('[Sale State Hook]', () => {
  const storage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
  }

  test('adds a single product', () => {
    const { result } = renderHook(() => useSalesState(storage))
    act(() => {
      result.current.addProduct(createTestProduct()[0])
    })

    expect(result.current.total).toBe(12399)
    expect(result.current.discount).toBe(0)
    expect(result.current.tax).toBe(991.92)
    expect(getTotalQty(result.current.products)).toBe(1)
  })

  test('adds 3 products', () => {
    const { result } = renderHook(() => useSalesState(storage))

    act(() => {
      createTestProduct(
        3,
        [115.22, 128.99, 100.9],
        [109.99, 119.99, 99.99],
        [8, 18, 8]
      ).forEach(result.current.addProduct)
    })

    expect(result.current.total).toBe(345.11)
    expect(result.current.discount.toFixed(2)).toBe(
      (345.11 - 329.96999999999997).toFixed(2)
    )
    expect(Math.round(result.current.tax)).toBe(Math.round(40.515))
    expect(result.current.products.map(p => p.qty)).toEqual([1, 1, 1])
  })

  test('deletes a product', () => {
    const { result } = renderHook(() => useSalesState(storage))
    const products = createTestProduct(3, [100, 128, 111], [99, 119, 99])

    act(() => {
      products.forEach(result.current.addProduct)
    })

    act(() => {
      result.current.deleteProduct(products[0].id)
    })

    expect(result.current.total).toBe(239)
    expect(result.current.discount).toBe(239 - 218)
    expect(getTotalQty(result.current.products)).toBe(2)
  })

  test('discards sale', () => {
    const { result } = renderHook(() => useSalesState(storage))
    const products = createTestProduct(2, [100, 220], [20, 10.5])
    act(() => {
      products.forEach(result.current.addProduct)
    })
    act(() => {
      result.current.discardSale()
    })

    expect(result.current.total).toBe(0)
    expect(result.current.discount).toBe(0)
    expect(result.current.tax).toBe(0)
    expect(getTotalQty(result.current.products)).toBe(0)
  })

  test('decreases product quantity', () => {
    const { result } = renderHook(() => useSalesState(storage))
    const products = createTestProduct(2, [100, 299.9], [10.15, 50.99], [18, 8])
    act(() => {
      products.forEach(result.current.addProduct)
    })

    act(() => {
      result.current.decreaseProductQuantity(products[0])
    })

    expect(result.current.total).toBe(299.9)
    expect(Math.round(result.current.tax)).toBe(Math.round(23.992))
    expect(result.current.discount.toFixed(2)).toBe((248.91).toFixed(2))
    expect(getTotalQty(result.current.products)).toBe(1)
  })

  test('increases product quantity', () => {
    const { result } = renderHook(() => useSalesState(storage))
    const products = createTestProduct(2, [599.8, 270.2], [20.55, 30.98])
    act(() => {
      products.forEach(result.current.addProduct)
    })

    act(() => {
      result.current.increaseProductQuantity(products[0])
    })

    expect(result.current.total).toBe(1469.8)
    expect(result.current.discount).toBe(1397.72)
    expect(getTotalQty(result.current.products)).toBe(3)
  })

  test('edits product price with popover', () => {
    const { result } = renderHook(() => useSalesState(storage))
    const products = createTestProduct(2, [50, 100], [0, 27.9], [8, 8])

    act(() => {
      products.forEach(result.current.addProduct)
    })
    act(() => {
      result.current.editProductField(1, 'price', 280.99)
    })

    expect(result.current.total).toBe(330.99)
    expect(result.current.tax.toFixed(2)).toBe((26.4792).toFixed(2))
    expect(result.current.products[1].price).toBe(280.99)
    expect(getTotalQty(result.current.products)).toBe(2)
  })

  test('edits product discounted price with popover', () => {
    const { result } = renderHook(() => useSalesState(storage))
    const products = createTestProduct(3, [280.99, 150, 99], [0, 140, 55])

    act(() => {
      products.forEach(result.current.addProduct)
    })

    act(() => {
      result.current.editProductField(1, 'discountPrice', 135)
    })

    expect(result.current.total).toBe(529.99)
    expect(result.current.tax.toFixed(2)).toBe((42.3992).toFixed(2))
    expect(result.current.products[1].discountPrice).toBe(135)
    expect(getTotalQty(result.current.products)).toBe(3)

    act(() => {
      result.current.editProductField(2, 'discountPrice', 100.87)
    })

    expect(result.current.products[2].discountPrice).toBe(100.87)
  })

  test('adds additional discount amounts on to the existing ones in TL', () => {
    const { result } = renderHook(() => useSalesState(storage))
    const products = createTestProduct(
      4,
      [400, 80, 1250, 50],
      [320, 70, 1000, 0],
      [18, 8, 18, 8]
    )

    // Adding the first product
    act(() => {
      result.current.addProduct(products[0])
    })

    expect(result.current.discount).toBe(80)

    // Adding the second product
    act(() => {
      result.current.addProduct(products[1])
    })

    expect(result.current.discount).toBe(90)

    // Adding the third product
    act(() => {
      result.current.addProduct(products[2])
    })

    expect(result.current.discount).toBe(340)

    // Adding the fourth product
    act(() => {
      result.current.addProduct(products[3])
    })

    expect(result.current.discount).toBe(340)
  })

  test('recalculates % discount amount out of the discount on TL on every product addition', () => {
    const { result } = renderHook(() => useSalesState(storage))
    const products = createTestProduct(
      3,
      [500, 80, 1700],
      [400.99, 70, 1000],
      [8, 8, 18]
    )

    // Adding the first product
    act(() => {
      result.current.addProduct(products[0])
    })

    expect(result.current.total).toBe(500)
    expect(parseFloat(result.current.discount.toFixed(2))).toBe(99.01)
    expect(parseFloat(result.current.percentageDiscount.toFixed(3))).toBe(
      19.802
    )

    // Adding the second product
    act(() => {
      result.current.addProduct(products[1])
    })

    expect(result.current.total).toBe(580)
    expect(parseFloat(result.current.discount.toFixed(2))).toBe(109.01)
    expect(parseFloat(result.current.percentageDiscount.toFixed(3))).toBe(
      18.795
    )

    // Adding the third product
    act(() => {
      result.current.addProduct(products[2])
    })

    expect(result.current.total).toBe(2280)
    expect(result.current.discount).toBe(809.01)
    expect(parseFloat(result.current.percentageDiscount.toFixed(3))).toBe(
      35.483
    )

    // Deleting the second product and adding the new one
    act(() => {
      result.current.deleteProduct(products[0].id)
    })

    const newProducts = createTestProduct()

    act(() => {
      result.current.addProduct(newProducts[0])
    })

    expect(result.current.products[2].discountPrice).toBe(null)
    expect(result.current.total).toBe(14179)
    expect(result.current.discount).toBe(710)
    expect(parseFloat(result.current.percentageDiscount.toFixed(3))).toBe(5.007)
  })

  test('recalculates % discount amount out of the discount on TL when the quantity increases', () => {
    const { result } = renderHook(() => useSalesState(storage))
    const products = createTestProduct(2, [1000, 5099.98], [null, 1850.99])

    act(() => {
      products.forEach(result.current.addProduct)
    })

    act(() => {
      result.current.increaseProductQuantity(products[0])
    })

    expect(result.current.total).toBe(7099.98)
    expect(result.current.discount).toBe(3248.99)
    expect(Number(result.current.percentageDiscount.toFixed(3))).toBe(
      Number((45.761).toFixed(3))
    )

    act(() => {
      result.current.increaseProductQuantity(products[1])
    })

    expect(result.current.total).toBe(12199.96)
    expect(result.current.discount).toBe(6497.98)
    expect(Number(result.current.percentageDiscount.toFixed(3))).toBe(
      Number((53.262).toFixed(3))
    )
  })

  test('recalculates % discount amount out of the discount on TL when the quantity decreases', () => {
    const { result } = renderHook(() => useSalesState(storage))
    const products = createTestProduct(
      3,
      [99.8, 3000, 590.8],
      [90.5, 2850.99, null]
    )

    act(() => {
      products.forEach(result.current.addProduct)
    })

    act(() => {
      result.current.decreaseProductQuantity(products[1])
    })

    expect(Number(result.current.total.toFixed(1))).toBe(690.6)
    expect(Number(result.current.discount.toFixed(1))).toBe(9.3)
    expect(Number(result.current.percentageDiscount.toFixed(3))).toBe(
      Number((1.347).toFixed(3))
    )
  })

  test('recalculates % discount amount out of the discount on TL when a quantity of a product decreases and the quantity of another product increases', () => {
    const { result } = renderHook(() => useSalesState(storage))
    const products = createTestProduct(3, [5000, 240, 99], [null, 243, 58])

    act(() => {
      products.forEach(result.current.addProduct)
    })

    act(() => {
      result.current.increaseProductQuantity(products[0])
    })

    act(() => {
      result.current.decreaseProductQuantity(products[1])
    })

    expect(result.current.total).toBe(10099)
    expect(result.current.discount).toBe(41)
    expect(Number(result.current.percentageDiscount.toFixed(3))).toBe(
      Number((0.406).toFixed(3))
    )

    act(() => {
      result.current.increaseProductQuantity(products[2])
    })

    expect(result.current.total).toBe(10198)
    expect(result.current.discount).toBe(82)
    expect(Number(result.current.percentageDiscount.toFixed(3))).toBe(
      Number((0.804).toFixed(3))
    )
  })

  test('recalculates % discount amount out of the discount on TL when a product is deleted', () => {
    const { result } = renderHook(() => useSalesState(storage))
    const products = createTestProduct(2, [100, 888], [40, 850.97])

    act(() => {
      products.forEach(result.current.addProduct)
    })

    act(() => {
      result.current.deleteProduct(products[1].id)
    })

    expect(result.current.total).toBe(100)
    expect(result.current.discount).toBe(60)
    expect(result.current.percentageDiscount).toBe(60)
  })

  test('sets TL and % discount to 0 after the completion of the payment', () => {
    const { result } = renderHook(() => useSalesState(storage))
    const products = createTestProduct(
      4,
      [5784, 2899.98, 1780, 55],
      [5000, 1850.99, 990.99, null]
    )
    act(() => {
      products.forEach(result.current.addProduct)
    })

    act(() => {
      result.current.discardSale()
    })

    expect(result.current.discount).toBe(0)
    expect(result.current.percentageDiscount).toBe(0)
  })
})
