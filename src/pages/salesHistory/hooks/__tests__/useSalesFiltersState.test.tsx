import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';

import useSalesFilterState, { Args } from '../useSalesFiltersState';
import theme from '../../../../theme';
import { mockStore } from '../../../../__mocks__/store';

let wrapper: React.FC;
let args: Args;

beforeEach(() => {
  const initialState = {};
  const store = mockStore(initialState);

  args = {
    rowsPerPage: 15,
    setPage: jest.fn(),
    fetchSales: jest.fn(),
  };

  wrapper = ({ children }) => (
    <Provider store={store}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Provider>
  );
});
describe('[Product Filters Hook]', () => {
  test('calls fetch sales action with correct values on apply filter click', async () => {
    const { result } = renderHook(() => useSalesFilterState(args), {
      wrapper,
    });
    const startDate = new Date();
    const endDate = new Date();

    act(() => result.current.handleStartDateChange(startDate));
    act(() => result.current.handleEndDateChange(endDate));

    await act(async () => result.current.onDateSelection());

    expect(args.fetchSales).toBeCalledTimes(1);
    expect(args.fetchSales).toBeCalledWith(
      1,
      args.rowsPerPage,
      startDate,
      endDate
    );
  });

  test('calls fetch sales action on apply filter click with null values when they are not selected', async () => {
    const { result } = renderHook(() => useSalesFilterState(args), {
      wrapper,
    });

    const startDate = new Date();
    const endDate = new Date();

    act(() => result.current.handleStartDateChange(null));
    act(() => result.current.handleEndDateChange(endDate));
    await act(async () => result.current.onDateSelection());

    expect(result.current.startDate).toBeNull();
    expect(args.fetchSales).toBeCalledTimes(1);
    expect(args.fetchSales).toBeCalledWith(1, args.rowsPerPage, null, endDate);
  });

  test('calls fetch sales action with null values on clear filters click ', async () => {
    const { result } = renderHook(() => useSalesFilterState(args), {
      wrapper,
    });

    await act(async () => result.current.onDateSelection());
    expect(result.current.startDate).toBeNull();
    expect(result.current.endDate).toBeNull();
    expect(args.fetchSales).toBeCalledTimes(1);
    expect(args.fetchSales).toBeCalledWith(1, args.rowsPerPage, null, null);
  });
});
