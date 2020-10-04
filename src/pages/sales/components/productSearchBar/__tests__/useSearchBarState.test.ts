import { renderHook, act } from '@testing-library/react-hooks';
import { axios } from '../../../../../__mocks__/axios';

import useSearchBarState from '../useSearchBarState';
import { createTestProduct } from '../../../../../testUtils';

describe('[Sales Search Bar Hook]', () => {
  const addProduct = jest.fn();
  test('calls onProduct select function', async () => {
    const { result } = renderHook(() => useSearchBarState(addProduct));
    act(() => {
      result.current.onProductSelect(createTestProduct(1, [200], [20])[0]);
    });

    expect(result.current.query).toBe('');
    expect(result.current.loading).toBeFalsy();
    expect(result.current.open).toBeFalsy();
    expect(result.current.searchResults).toEqual([]);
  });

  test('calls API with a matched query', async () => {
    const data = createTestProduct(3, [100, 128, 111], [99, 119, 99]);

    axios.get = jest.fn(() => Promise.resolve({ data }));

    const { result } = renderHook(() => useSearchBarState(addProduct));

    await act(async () => {
      result.current.setQuery('tecnifibre');
    });

    expect(result.current.loading).toBeFalsy();
    expect(result.current.open).toBeTruthy();
    expect(result.current.productNotFound).toBeFalsy();
    expect(result.current.query).toBe('tecnifibre');
    expect(result.current.searchResults).toEqual(data);
    expect(axios.get).toBeCalledWith('/products/search/?q=tecnifibre');
  });

  test('calls API with an unmatched query', async () => {
    axios.get = jest.fn(() => Promise.resolve({ data: [] }));

    const { result } = renderHook(() => useSearchBarState(addProduct));

    await act(async () => {
      result.current.setQuery('qtx');
    });

    expect(result.current.loading).toBeFalsy();
    expect(result.current.open).toBeTruthy();
    expect(result.current.productNotFound).toBeTruthy();
    expect(result.current.query).toBe('qtx');
    expect(result.current.searchResults).toEqual([]);
    expect(axios.get).toBeCalledWith('/products/search/?q=qtx');
  });
});
