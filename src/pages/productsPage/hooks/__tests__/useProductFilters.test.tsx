import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';

import useProductFilters, { Args } from '../useProductFilters';
import theme from '../../../../theme';
import { testBrands, testCategories } from '../../../../testUtils';
import { mockStore } from '../../../../__mocks__/store';

let wrapper: React.FC;
let args: Args;

beforeEach(() => {
  jest.useFakeTimers();

  args = {
    brands: testBrands,
    categories: testCategories,
    setPage: jest.fn(),
    page: 1,
    rowsPerPage: 10,
    fetchProducts: jest.fn()
  };

  const initialState = {};
  const store = mockStore(initialState);

  wrapper = ({ children }) => (
    <Provider store={store}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Provider>
  );
});

describe('[Product Filters Hook]', () => {
  const initialFilterState = {
    searchQuery: '',
    category: '',
    brand: ''
  };
  test('calls handleApplyFilterClick function', async () => {
    const { result } = renderHook(() => useProductFilters(args), {
      wrapper
    });

    act(() =>
      result.current.handleInputChange({
        target: { name: 'searchQuery', value: 'Wilson Raket' }
      } as React.ChangeEvent<HTMLInputElement>)
    );

    act(() =>
      result.current.handleInputChange({
        target: { name: 'brand', value: 'Wilson' }
      } as React.ChangeEvent<HTMLInputElement>)
    );

    act(() =>
      result.current.handleInputChange({
        target: { name: 'category', value: 'Raket' }
      } as React.ChangeEvent<HTMLInputElement>)
    );

    await act(async () => {
      result.current.handleApplyFilterClick();
      jest.advanceTimersByTime(5000);
    });

    expect(result.current.filterInputs.searchQuery).toEqual('Wilson Raket');
    expect(result.current.appliedFilters.searchQuery).toEqual('Wilson Raket');
    expect(result.current.filterInputs.brand).toEqual('Wilson');
    expect(result.current.appliedFilters.brand).toEqual('Wilson');
    expect(result.current.filterInputs.category).toEqual('Raket');
    expect(result.current.appliedFilters.category).toEqual('Raket');
    expect(args.fetchProducts).toBeCalledTimes(1);
    expect(args.fetchProducts).toBeCalledWith(
      args.page,
      args.rowsPerPage,
      10,
      8,
      'Wilson Raket'
    );
  });

  test('calls handleDelete function', async () => {
    const { result } = renderHook(() => useProductFilters(args), {
      wrapper
    });

    act(() =>
      result.current.handleInputChange({
        target: { name: 'brand', value: 'Nike' }
      } as React.ChangeEvent<HTMLInputElement>)
    );

    act(() =>
      result.current.handleInputChange({
        target: { name: 'category', value: 'Nike Aksesuar' }
      } as React.ChangeEvent<HTMLInputElement>)
    );

    await act(async () => {
      result.current.handleApplyFilterClick();
      jest.advanceTimersByTime(5000);
    });

    act(() => result.current.handleDelete('brand'));

    expect(result.current.appliedFilters).toEqual({
      searchQuery: '',
      category: 'Nike Aksesuar'
    });

    expect(result.current.filterInputs).toEqual({
      searchQuery: '',
      category: 'Nike Aksesuar',
      brand: ''
    });

    await act(async () => {
      result.current.handleApplyFilterClick();
      jest.advanceTimersByTime(5000);
    });

    expect(args.fetchProducts).toBeCalledTimes(2);
    expect(args.fetchProducts).toBeCalledWith(
      args.page,
      args.rowsPerPage,
      14,
      undefined,
      ''
    );

    act(() => result.current.handleDelete('category'));
    expect(result.current.appliedFilters).toEqual({
      brand: '',
      searchQuery: ''
    });
  });

  test('calls clearAllFilters function', async () => {
    const { result } = renderHook(() => useProductFilters(args), {
      wrapper
    });

    act(() =>
      result.current.handleInputChange({
        target: { name: 'category', value: 'Grip' }
      } as React.ChangeEvent<HTMLInputElement>)
    );

    await act(async () => {
      result.current.handleApplyFilterClick();
      jest.advanceTimersByTime(5000);
    });

    act(() => result.current.clearAllFilters());
    expect(result.current.appliedFilters).toEqual({});
    expect(result.current.filterInputs).toEqual(initialFilterState);
    expect(args.fetchProducts).toBeCalledWith(args.page, args.rowsPerPage);
  });

  test('calls cancelClick function', async () => {
    const { result } = renderHook(() => useProductFilters(args), {
      wrapper
    });

    act(() =>
      result.current.handleInputChange({
        target: { name: 'searchQuery', value: 'Babolat Raket' }
      } as React.ChangeEvent<HTMLInputElement>)
    );

    await act(async () => {
      result.current.handleApplyFilterClick();
      jest.advanceTimersByTime(5000);
    });

    await act(async () => {
      result.current.cancelClick();
      jest.advanceTimersByTime(5000);
    });

    expect(result.current.appliedFilters).toEqual({});
    expect(result.current.filterInputs).toEqual(initialFilterState);
  });
});
