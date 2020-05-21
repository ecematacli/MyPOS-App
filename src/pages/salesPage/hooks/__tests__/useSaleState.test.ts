import { renderHook, act } from '@testing-library/react-hooks';

import useSalesState from '../useSalesState';
import { createTestProduct, getTotalQty } from '../../../../testUtils';

describe('[Sale State Hook]', () => {
  const storage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
  };

  test('adds a single product', () => {
    const { result } = renderHook(() => useSalesState(storage));
    act(() => {
      result.current.addProduct(createTestProduct()[0]);
    });

    expect(result.current.total).toBe(12399);
    expect(result.current.discount).toBe(0);
    expect(result.current.tax).toBe(991.92);
    expect(getTotalQty(result.current.products)).toBe(1);
  });

  test('adds 3 products', () => {
    const { result } = renderHook(() => useSalesState(storage));

    act(() => {
      createTestProduct(
        3,
        [115.22, 128.99, 100.9],
        [109.99, 119.99, 99.99],
        [8, 18, 8]
      ).forEach(result.current.addProduct);
    });

    expect(result.current.total).toBe(345.11);
    expect(result.current.discount.toFixed(2)).toBe(
      (345.11 - 329.96999999999997).toFixed(2)
    );
    expect(Math.round(result.current.tax)).toBe(Math.round(40.515));
    expect(result.current.products.map((p) => p.qty)).toEqual([1, 1, 1]);
  });

  test('deletes a product', () => {
    const { result } = renderHook(() => useSalesState(storage));
    const products = createTestProduct(3, [100, 128, 111], [99, 119, 99]);

    act(() => {
      products.forEach(result.current.addProduct);
    });

    act(() => {
      result.current.deleteProduct(products[0].id);
    });

    expect(result.current.total).toBe(239);
    expect(result.current.discount).toBe(239 - 218);
    expect(getTotalQty(result.current.products)).toBe(2);
  });

  test('discards sale', () => {
    const { result } = renderHook(() => useSalesState(storage));
    const products = createTestProduct(2, [100, 220], [20, 10.5]);
    act(() => {
      products.forEach(result.current.addProduct);
    });
    act(() => {
      result.current.discardSale();
    });

    expect(result.current.total).toBe(0);
    expect(result.current.discount).toBe(0);
    expect(result.current.tax).toBe(0);
    expect(getTotalQty(result.current.products)).toBe(0);
  });

  test('decreases product quantity', () => {
    const { result } = renderHook(() => useSalesState(storage));
    const products = createTestProduct(
      2,
      [100, 299.9],
      [10.15, 50.99],
      [18, 8]
    );
    act(() => {
      products.forEach(result.current.addProduct);
    });

    act(() => {
      result.current.decreaseProductQuantity(products[0]);
    });

    expect(result.current.total).toBe(299.9);
    expect(Math.round(result.current.tax)).toBe(Math.round(23.992));
    expect(result.current.discount.toFixed(2)).toBe((248.91).toFixed(2));
    expect(getTotalQty(result.current.products)).toBe(1);
  });

  test('increases product quantity', () => {
    const { result } = renderHook(() => useSalesState(storage));
    const products = createTestProduct(2, [599.8, 270.2], [20.55, 30.98]);
    act(() => {
      products.forEach(result.current.addProduct);
    });

    act(() => {
      result.current.increaseProductQuantity(products[0]);
    });

    expect(result.current.total).toBe(1469.8);
    expect(result.current.discount).toBe(1397.72);
    expect(getTotalQty(result.current.products)).toBe(3);
  });

  test('edits product price with popover', () => {
    const { result } = renderHook(() => useSalesState(storage));
    const products = createTestProduct(2, [50, 100], [0, 27.9], [8, 8]);

    act(() => {
      products.forEach(result.current.addProduct);
    });
    act(() => {
      result.current.editProductField(1, 'price', 280.99);
    });

    expect(result.current.total).toBe(330.99);
    expect(result.current.tax.toFixed(2)).toBe((26.4792).toFixed(2));
    expect(result.current.products[1].price).toBe(280.99);
    expect(getTotalQty(result.current.products)).toBe(2);
  });

  test('edits product discounted price with popover', () => {
    const { result } = renderHook(() => useSalesState(storage));
    const products = createTestProduct(3, [280.99, 150, 99], [0, 140, 55]);

    act(() => {
      products.forEach(result.current.addProduct);
    });

    act(() => {
      result.current.editProductField(1, 'discountPrice', 135);
    });

    expect(result.current.total).toBe(529.99);
    expect(result.current.tax.toFixed(2)).toBe((42.3992).toFixed(2));
    expect(result.current.products[1].discountPrice).toBe(135);
    expect(getTotalQty(result.current.products)).toBe(3);

    act(() => {
      result.current.editProductField(2, 'discountPrice', 100.87);
    });

    expect(result.current.products[2].discountPrice).toBe(100.87);
  });

  test('adds additional discount amounts on to the existing ones', () => {
    const { result } = renderHook(() => useSalesState(storage));
    const products = createTestProduct(
      4,
      [400, 80, 1250, 50],
      [320, 70, 1000, 0],
      [18, 8, 18, 8]
    );
    act(() => {
      result.current.addProduct(products[0]);
    });

    expect(result.current.discount).toBe(80);

    act(() => {
      result.current.addProduct(products[1]);
    });

    expect(result.current.discount).toBe(90);

    act(() => {
      result.current.addProduct(products[2]);
    });

    expect(result.current.discount).toBe(340);

    act(() => {
      result.current.addProduct(products[3]);
    });

    expect(result.current.discount).toBe(340);
  });
});
