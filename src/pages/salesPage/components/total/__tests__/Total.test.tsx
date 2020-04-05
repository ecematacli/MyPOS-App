import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Total, { TotalProps } from '../Total';
import { NotificationsContext } from '../../../../../contexts/NotificationsContext';
import { debug } from 'webpack';

let props: TotalProps = null;
beforeEach(() => {
  props = {
    products: [],
    total: 250,
    discount: 50,
    tax: 15,
    handleDiscountChange: jest.fn(),
    completeSale: jest.fn(),
    discardSale: jest.fn(),
  };
});

const renderTotalComponent = () =>
  render(
    <NotificationsContext.Provider
      value={{
        notifications: null,
        addNotification: jest.fn(),
        removeNotification: null,
      }}
    >
      <Total {...props} />
    </NotificationsContext.Provider>
  );

describe('[Total Component]', () => {
  test('renders the tax value correctly', () => {
    const { getByTestId } = renderTotalComponent();
    expect(getByTestId('tax')).toHaveTextContent('15');
  });

  test('renders the subtotal value correctly', () => {
    const { getByTestId } = renderTotalComponent();

    expect(getByTestId('sub-total')).toHaveTextContent('235');
  });

  test('renders the total value correctly', () => {
    const { getByTestId } = renderTotalComponent();
    expect(getByTestId('total')).toHaveTextContent('200');
  });

  test('calls the handleDiscountChange function with the right value', () => {
    const { getByTestId } = renderTotalComponent();

    const contentInput = getByTestId('content-input') as HTMLInputElement;

    fireEvent.change(contentInput, { target: { value: 250 } });

    expect(contentInput).not.toBeNull();
    expect(props.handleDiscountChange).toBeCalledWith('250');
    expect(props.handleDiscountChange).toHaveBeenCalledTimes(1);
  });

  // test('calls the completeSale function with the right values', () => {
  //   const { getByTestId, debug } = renderTotalComponent();

  //   const button = getByTestId('custom-button') as HTMLButtonElement;
  //   debug(button);
  //   // const addNotification = jest.fn();
  //   fireEvent.click(button);
  //   // products, total, discount, addNotification, discardSale
  //   expect(button).not.toBeNull();
  //   expect(props.completeSale).toBeCalledWith(
  //     [],
  //     250,
  //     50,
  //     jest.fn(),
  //     jest.fn()
  //   );
  //   expect(props.handleDiscountChange).toHaveBeenCalledTimes(1);
  // });
});
