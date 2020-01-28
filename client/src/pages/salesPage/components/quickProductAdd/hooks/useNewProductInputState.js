import { useReducer, useContext } from 'react';
import { useDispatch } from 'react-redux';

import { NotificationsContext } from '../../../../../contexts/NotificationsContext';
import { createProduct } from '../../../../../redux/products/productsActions';

export default () => {
  const { addNotification } = useContext(NotificationsContext);
  const dispatch = useDispatch();
  const [userInputs, setUserInputs] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      barcode: '',
      name: '',
      qty: 1,
      sku: '',
      price: 0,
      taxRate: 18,
      variation: '',
      discountPrice: 0,
      category: '',
      brand: ''
    }
  );

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
      value: userInputs.price,
      required: true
    },
    {
      label: 'Discounted Price',
      fieldId: 'discountPrice',
      currency: true,
      value: userInputs.discountPrice
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

  const handleInputChange = ({ target: { value, name } }) => {
    const fieldName = name;
    const newValue = value;

    if (
      fieldName === 'taxRate' ||
      fieldName === 'qty' ||
      fieldName === 'price' ||
      fieldName === 'discountPrice'
    ) {
      const value = parseInt(newValue);
      console.log('newValue is:', newValue);
      console.log('value is:', value);
      console.log('-----------');

      setUserInputs({ [fieldName]: isNaN(value) ? 0 : value });
    }

    console.log('tax rate:', userInputs.taxRate, 'price:', userInputs.price);

    setUserInputs({ [fieldName]: newValue });
  };

  const onAddProductClick = () => {
    dispatch(createProduct(userInputs, addNotification));
  };

  return {
    NEW_PRODUCT_FIELDS,
    handleInputChange,
    onAddProductClick
  };
};
