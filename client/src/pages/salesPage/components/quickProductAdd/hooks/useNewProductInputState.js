import { useReducer } from 'react';
import { useDispatch } from 'react-redux';

import { createProduct } from '../../../../../redux/products/productsActions';
import { currencyFormatter } from '../../../../../common/utils/currencyFormatter';

export default () => {
  const dispatch = useDispatch();
  const [userInputs, setUserInputs] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      barcode: '',
      name: '',
      qty: '1',
      sku: '',
      price: 0,
      taxRate: 18,
      variation: '',
      discountPrice: 0,
      category: '',
      brand: ''
    }
  );

  console.log(parseInt(userInputs.price));

  const NEW_PRODUCT_FIELDS = [
    {
      label: 'Barcode (required)*',
      fieldId: 'barcode',
      value: userInputs.barcode,
      required: true
    },
    { label: 'Product Name', fieldId: 'name', value: userInputs.name },
    {
      label: 'Quantity',
      fieldId: 'qty',
      value: userInputs.qty,
      type: 'number'
    },
    {
      label: 'Price (required*)',
      fieldId: 'price',
      currency: true,
      value: currencyFormatter(userInputs.price),
      required: true
    },
    {
      label: 'Discounted Price',
      fieldId: 'discountPrice',
      currency: true,
      value: currencyFormatter(userInputs.discountPrice)
    },
    { label: 'Variation', fieldId: 'variation', value: userInputs.variation },
    {
      label: 'Tax Rate',
      fieldId: 'taxRate',
      dropdown: true,
      dropdownItems: [18, 8],
      value: userInputs.taxRate,
      additionalField: true,
      type: 'number'
    },
    { label: 'Sku', fieldId: 'sku', value: userInputs.sku },
    {
      label: 'Brand Name',
      fieldId: 'brand',
      dropdown: true,
      dropdownItems: ['Nike', 'Adidas', 'Wilson'],
      value: userInputs.brand,
      additionalField: true
    },
    {
      label: 'Category Name',
      fieldId: 'category',
      dropdown: true,
      dropdownItems: ['Tennis shoe', 'Tennis racket'],
      value: userInputs.category,
      additionalField: true
    }
  ];

  console.log(userInputs);

  const handleInputChange = e => {
    // console.log(e.target.name);
    const fieldName = e.target.name;
    let newValue = e.target.value;

    if (
      fieldName === 'taxRate' ||
      fieldName === 'qty' ||
      fieldName === 'price' ||
      fieldName === 'discountPrice'
    ) {
      newValue = parseInt(newValue);
    }

    console.log(newValue);

    setUserInputs({ [fieldName]: newValue });
  };

  const onAddProductClick = () => {
    dispatch(createProduct(userInputs));
  };

  return {
    NEW_PRODUCT_FIELDS,
    handleInputChange,
    onAddProductClick
  };
};
