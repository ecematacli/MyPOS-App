import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles'

import { useSalesFilterState, Args } from '../use-sales-filter-state'
import { theme } from '../../../../theme/theme'
import { mockStore } from '../../../../__mocks__/store'
import { AuthContext } from 'contexts/auth-context'
import { UserRoles } from 'types/user'

let wrapper: React.FC
let args: Args

beforeEach(() => {
  const initialState = {}
  const store = mockStore(initialState)

  args = {
    rowsPerPage: 15,
    setPage: jest.fn(),
    fetchSales: jest.fn(),
  }

  wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>
      <AuthContext.Provider
        value={{
          isAuthenticated: true,
          user: {
            id: '1',
            email: 'Ecem',
            name: 'Ecem',
            role: { id: 1, name: UserRoles.Admin, outletId: 1 },
          },
          isUserDataLoading: false,
          isAdmin: true,
        }}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </AuthContext.Provider>
    </Provider>
  )
})
describe('[Product Filters Hook]', () => {
  test('calls fetch sales action with correct values on apply filter click', async () => {
    const { result } = renderHook(() => useSalesFilterState(args), {
      wrapper,
    })
    const startDate = new Date()
    const endDate = new Date()

    act(() => result.current.handleStartDateChange(startDate))
    act(() => result.current.handleEndDateChange(endDate))

    await act(async () => result.current.onDateSelection())

    expect(args.fetchSales).toBeCalledTimes(1)
    expect(args.fetchSales).toBeCalledWith({
      afterCursor: null,
      beforeCursor: null,
      rowsPerPage: 15,
      startDate,
      endDate,
    })
  })

  test('calls fetch sales action on apply filter click with null values when they are not selected', async () => {
    const { result } = renderHook(() => useSalesFilterState(args), {
      wrapper,
    })

    const endDate = new Date()

    act(() => result.current.handleStartDateChange(null))
    act(() => result.current.handleEndDateChange(endDate))
    await act(async () => result.current.onDateSelection())

    expect(result.current.startDate).toBeNull()
    expect(args.fetchSales).toBeCalledTimes(1)
    expect(args.fetchSales).toBeCalledWith({
      afterCursor: null,
      beforeCursor: null,
      startDate: null,
      endDate,
      outletId: undefined,
      rowsPerPage: 15,
    })
  })

  test('calls fetch sales action with null values on clear filters click ', async () => {
    const { result } = renderHook(() => useSalesFilterState(args), {
      wrapper,
    })

    await act(async () => result.current.onDateSelection())
    expect(result.current.startDate).toBeNull()
    expect(result.current.endDate).toBeNull()
    expect(args.fetchSales).toBeCalledTimes(1)
    expect(args.fetchSales).toBeCalledWith({
      afterCursor: null,
      beforeCursor: null,
      endDate: null,
      outletId: undefined,
      rowsPerPage: 15,
      startDate: null,
    })
  })
})
