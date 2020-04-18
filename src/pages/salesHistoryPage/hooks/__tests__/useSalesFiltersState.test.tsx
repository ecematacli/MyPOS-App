import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';

import useSalesFilterState from '../useSalesFiltersState';
import theme from '../../../../theme';
import { fetchSales } from '../../../../redux/sales/salesActions';
import { axios } from '../../../..//__mocks__/axios';
import { mockStore } from '../../../../__mocks__/store';

let wrapper: React.FC;

beforeEach(() => {
  const initialState = {};
  const store = mockStore(initialState);

  wrapper = ({ children }) => (
    <Provider store={store}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Provider>
  );
});
describe('[Product Filters Hook]', () => {
  axios.get = jest.fn(() => Promise.resolve({ data: [] }));
  const setPage = jest.fn();

  test('calls onDateSelection function', async () => {
    const { result } = renderHook(() => useSalesFilterState(15, setPage), {
      wrapper,
    });

    await act(async () => result.current.onDateSelection());
  });

  // expect(axios.get).toBeCalledTimes(1);
});
