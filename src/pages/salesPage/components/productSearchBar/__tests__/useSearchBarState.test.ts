import { renderHook, act } from '@testing-library/react-hooks';
import axios, { AxiosPromise } from 'axios';

import useSearchBarState from '../useSearchBarState';
import { createTestProduct, getTotalQty } from '../../../../../testUtils';

const data = createTestProduct(3, [100, 128, 111], [99, 119, 99]);

beforeEach(() => {
  //@ts-ignore
  axios.get = jest.fn(() => Promise.resolve({ data: { data } }));
});

describe('[Sales Search Bar Hook]', () => {
  // console.log('DATA>>', data);

  // const fakeAxios = {
  //   get: jest.fn(() => Promise.resolve({ data: { data } })),
  // };
  const addProduct = jest.fn();
  test('adds a single product', async () => {
    const { result } = renderHook(() => useSearchBarState(addProduct));
    act(() => {
      result.current.setQuery('nike');
    });

    // result.current.

    expect(axios.get).toBeCalledTimes(1);
    // expect(result.current.discount).toBe(0);
    // expect(result.current.tax).toBe(991.92);
    // expect(getTotalQty(result.current.products)).toBe(1);
  });
});
