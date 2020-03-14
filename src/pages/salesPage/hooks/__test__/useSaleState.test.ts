import { renderHook, act } from '@testing-library/react-hooks';
import useSalesState from '../useSalesState';
import { createTestProduct } from './createTestProduct';

describe('[Sale State Hook]', () => {
  const storage = {
    getItem: jest.fn(),
    setItem: jest.fn()
  };

  test('adds a single product', () => {
    const { result } = renderHook(() => useSalesState(storage));
    act(() => {
      result.current.addProduct(createTestProduct()[0]);
    });

    expect(result.current.total).toBe(12399);
    expect(result.current.discount).toBe(0);
    expect(result.current.products.map(p => p.qty)).toEqual([1]);
  });

  test('adds 3 products', () => {
    const { result } = renderHook(() => useSalesState(storage));

    act(() => {
      createTestProduct(
        3,
        [115.22, 128.99, 100.9],
        [109.99, 119.99, 99.99]
      ).forEach(result.current.addProduct);
    });

    expect(result.current.products.map(p => p.qty)).toEqual([1, 1, 1]);
    expect(result.current.total).toBe(345.11);
    expect(result.current.discount.toFixed(2)).toBe(
      (345.11 - 329.96999999999997).toFixed(2)
    );
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
  });
});
