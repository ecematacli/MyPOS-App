export const transformErrorResponse = (errorMessage: string) => {
  switch (errorMessage) {
    case 'DuplicateBarcodeError':
      return 'Duplicate Barcode';
    case 'EmptyBarcodeError':
      return 'Empty Barcode';
    case 'EmptyQtyError':
      return 'Empty Quantity';
    case 'EmptySkuError':
      return 'Empty Sku';
    case 'InvalidBarcodeError':
      return 'Invalid Barcode';
    case 'InvalidQtyError':
      return 'Invalid Quantity';
    case 'InvalidPriceError':
      return 'Invalid Price';
    case 'InvalidTaxRateError':
      return 'Invalid Tax Rate';
    case 'InvalidOrderNoError':
      return 'Invalid Order No';
    case 'InvalidDateError':
      return 'Invalid Date';
    default:
      return 'Some Error';
  }
};
