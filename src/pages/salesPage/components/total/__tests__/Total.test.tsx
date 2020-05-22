import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Total from '../Total';
import { TotalProps } from '../../posTableRight/types';
import { NotificationsContext } from '../../../../../contexts/NotificationsContext';

const addNotification = jest.fn();
const discardSale = jest.fn();

let props: TotalProps = null;

beforeEach(() => {
  props = {
    products: [
      {
        id: 7,
        barcode: '3490150122856',
        sku: '14FI305842',
        name: 'TFIGHT 305 GRIP 2',
        price: 12399,
        discountPrice: 50,
        qty: 1,
        variation: null,
        taxRate: 8,
        synced: true,
        brand: { name: 'Tecnifibre ', id: 14 },
        category: { name: 'Raket', id: 10 },
      },
    ],
    total: 250,
    discount: 50,
    tax: 15,
    handleDiscountChange: jest.fn(),
    completeSale: jest.fn(),
    discardSale,
  };
});

const renderTotalComponent = () =>
  render(
    <NotificationsContext.Provider
      value={{
        notifications: null,
        removeNotification: null,
        addNotification,
      }}>
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

    fireEvent.change(contentInput, { target: { value: 850.5 } });

    expect(contentInput).not.toBeNull();
    expect(props.handleDiscountChange).toHaveBeenCalledTimes(1);
    expect(props.handleDiscountChange).toBeCalledWith('850.5');
  });

  test('calls the completeSale function with the right arguments', () => {
    const { getByTestId } = renderTotalComponent();

    const button = getByTestId('custom-button') as HTMLButtonElement;

    fireEvent.click(button);

    expect(button).not.toBeNull();
    expect(props.completeSale).toHaveBeenCalledTimes(1);
    expect(props.completeSale).toBeCalledWith(
      props.products,
      250,
      50,
      addNotification,
      discardSale
    );
  });
});
