import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Total, { TotalProps } from '../Total';
import { NotificationsContext } from '../../../../../contexts/NotificationsContext';

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

  // test('renders the custom input value correctly', () => {
  //   const { getByLabelText } = renderTotalComponent();
  //   const input = getByLabelText('custom-input') as HTMLInputElement;
  //   fireEvent.change(input, { target: { value: '23' } });
  //   expect(input.value).toBe('23');
  // });
});
