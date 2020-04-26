import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';

import { mockStore } from '../../../../__mocks__/store';
import { axios } from '../../../../__mocks__/axios';
import useLoginState from '../useLoginState';
import { NotificationsContext } from '../../../../contexts/NotificationsContext';
import {
  AuthTokenSettingContext,
  AuthContext,
} from '../../../../contexts/AuthContext';

let wrapper: React.FC;
const addNotification = jest.fn();
let saveAuthToken: (data: string) => void;
let authToken: string;

beforeEach(() => {
  saveAuthToken = jest.fn();

  const initialState = {};
  const store = mockStore(initialState);

  wrapper = ({ children }) => (
    <Provider store={store}>
      <AuthContext.Provider value={authToken}>
        <AuthTokenSettingContext.Provider value={{ saveAuthToken }}>
          <NotificationsContext.Provider
            value={{
              notifications: null,
              removeNotification: null,
              addNotification,
            }}>
            {children}
          </NotificationsContext.Provider>
        </AuthTokenSettingContext.Provider>
      </AuthContext.Provider>
    </Provider>
  );
});

describe('[useLoginState Hook]', () => {
  test('calls postSignInForm function with correct user credentials', async () => {
    const { result } = renderHook(() => useLoginState(), {
      wrapper,
    });

    const formValues = {
      email: 'ea@gmail.com',
      password: 'somegibberish',
    };

    axios.post = jest.fn(() => Promise.resolve({ data: formValues }));

    await act(async () => result.current.postSignInForm(formValues));

    expect(saveAuthToken).toBeCalledTimes(1);
    expect(saveAuthToken).toBeCalledWith(formValues);
    expect(authToken).not.toBeNull();
  });

  test('calls postSignInForm function with incorrect user credentials', async () => {
    const { result } = renderHook(() => useLoginState(), {
      wrapper,
    });

    const incorrectFormValues = {
      email: 'ea12@gmail.com',
      password: 'wrong!!',
    };

    axios.post = jest.fn(() =>
      Promise.reject({
        data: incorrectFormValues,
        response: { status: 400 },
      })
    );
    await act(async () => result.current.postSignInForm(incorrectFormValues));

    expect(saveAuthToken).toBeCalledTimes(0);
    expect(authToken).toBeUndefined();
  });
});
