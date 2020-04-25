import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';

import QuickProductAdd from '../QuickProductAdd';
import { render } from '../../../../../testUtils/render';
import { testBrands, testCategories } from '../../../../../testUtils';

describe('[Quick Product Add component]', () => {
  const props = {
    openDialog: true,
    handleCloseDialog: jest.fn(),
    brands: testBrands,
    categories: testCategories,
    createProduct: jest.fn(),
  };
  test('renders correct input values for Formik custom input fields', async () => {
    const { getByTestId } = render(<QuickProductAdd {...props} />);

    const name = getByTestId('name') as HTMLInputElement;
    const barcode = getByTestId('barcode') as HTMLInputElement;
    const price = getByTestId('price') as HTMLInputElement;
    const qty = getByTestId('qty') as HTMLInputElement;

    const submitButton = getByTestId('add-button');

    fireEvent.change(name, {
      target: {
        value: 'Nike Tanjun Herenschoen',
      },
    });

    fireEvent.change(barcode, {
      target: {
        value: '1628163701973',
      },
    });

    fireEvent.change(price, {
      target: {
        value: '980,88',
      },
    });

    fireEvent.change(qty, {
      target: {
        value: '2',
      },
    });

    await waitFor(() => {
      fireEvent.click(submitButton);
    });

    expect(name.value).toBe('Nike Tanjun Herenschoen');
    expect(barcode.value).toBe('1628163701973');
    expect(price.value).toBe('980,88');
    expect(qty.value).toBe('2');
  });

  it('displays an error message for price field in accordance with the Formik validation', async () => {
    const { getByTestId, getByText } = render(<QuickProductAdd {...props} />);

    const price = getByTestId('price') as HTMLInputElement;

    const submitButton = getByTestId('add-button');

    fireEvent.change(price, {
      target: {
        value: '',
      },
    });

    await waitFor(() => {
      fireEvent.click(submitButton);
    });

    fireEvent.change(price, {
      target: {
        value: '1.090',
      },
    });

    await waitFor(() => {
      fireEvent.click(submitButton);
    });

    expect(getByTestId('price-error')).not.toBeNull();
    expect(getByText('Please enter a valid price')).toBeInTheDocument();
    expect(getByText('This field is required')).toBeInTheDocument();
  });
});
