import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';

import useProductFiltersState from '../useProductFilters';
import theme from '../../../../theme';
import configureStore from '../../../../redux/store';
import { axios } from '../../../../__mocks__/axios';

const brands = [
  { name: 'Tecnifibre ', id: 14 },
  { name: 'Nike', id: 5 }
];
const categories = [
  { name: 'Asics Shoes', id: 8 },
  { name: 'Racket', id: 4 }
];

const setPage = jest.fn();

const page = 1;

const rowsPerPage = 10;

let wrapper: React.FC;

beforeEach(() => {
  const store = configureStore();
  wrapper = ({ children }) => (
    <Provider store={store}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Provider>
  );
});

describe('[Product Filters Hook]', () => {
  test('filter inputs change as user types in', () => {
    const { result } = renderHook(
      () =>
        useProductFiltersState(brands, categories, setPage, page, rowsPerPage),
      { wrapper }
    );

    act(() =>
      result.current.handleInputChange({
        target: { name: 'searchQuery', value: 'Adidas NMD' }
      } as React.ChangeEvent<HTMLInputElement>)
    );

    act(() =>
      result.current.handleInputChange({
        target: { name: 'brand', value: 'adidas' }
      } as React.ChangeEvent<HTMLInputElement>)
    );

    act(() =>
      result.current.handleInputChange({
        target: { name: 'category', value: 'adidas shoes' }
      } as React.ChangeEvent<HTMLInputElement>)
    );
    expect(result.current.filterInputs.searchQuery).toEqual('Adidas NMD');
    expect(result.current.filterInputs.brand).toEqual('adidas');
    expect(result.current.filterInputs.category).toEqual('adidas shoes');
  });
});
