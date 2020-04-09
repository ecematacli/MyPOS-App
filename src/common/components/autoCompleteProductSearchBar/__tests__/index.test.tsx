import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import AutoCompleteProductSearchBar from '../index';
// import { render } from '../../../../testUtils/render';
import { ThemeProvider } from '@material-ui/styles';
import theme from '../../../../theme';

const options = [
  {
    id: 2090,
    barcode: '3490150122771',
    sku: '14FI295642',
    name: 'TFIGHT 295 ATP GRIP 2',
    price: 52,
    discountPrice: null,
    qty: 7,
    variation: null,
    taxRate: null,
    brand: { name: 'Tecnifibre ', id: 14 },
    category: { name: 'Raket', id: 10 },
    deleted: false,
  },
  {
    id: 2088,
    barcode: '3490150106948',
    sku: '14FL265622',
    name: 'T FLASH 265 SPEED GRIP 2',
    price: 2000,
    discountPrice: null,
    qty: 20,
    variation: null,
    taxRate: null,
    brand: { name: 'Tecnifibre ', id: 14 },
    category: { name: 'Raket', id: 10 },
    deleted: false,
  },
];

describe('[auto suggest]', () => {
  const props = {
    open: true,
    onClose: jest.fn(),
    options,
    loading: false,
    onProductChange: jest.fn(),
    query: 't',
    onQueryChange: jest.fn(),
    isUsedOnSalesPage: true,
    productNotFound: false,
    handleOpenDialog: jest.fn(),
  };
  test('selects a single value when enter is pressed', () => {
    const handleChange = jest.fn();

    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <AutoCompleteProductSearchBar {...props} />
      </ThemeProvider>
    );
  });
});
