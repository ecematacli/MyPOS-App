import { useReducer, useContext } from 'react';
import { useDispatch } from 'react-redux';

import { NotificationsContext } from '../../../../contexts/NotificationsContext';
import { createProduct } from '../../../../redux/products/productsActions';

export default (brands, categories, handleCloseDialog) => {
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
      discountPrice: '',
      category: '',
      brand: ''
    }
  );

  // Product input field handlers
  const handleInputChange = ({ target: { value, name } }) => {
    const fieldName = name;
    const newValue = value;

    if (fieldName === 'taxRate' || fieldName === 'qty') {
      const numValue = parseInt(newValue);
      setUserInputs({ [fieldName]: isNaN(numValue) ? 0 : numValue });
    } else {
      setUserInputs({ [fieldName]: newValue });
    }
  };

  const onAddProductClick = () => {
    dispatch(createProduct(userInputs, addNotification));

    handleCloseDialog();
  };

  // Mappable product fields
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
      dropdownItems: [
        { id: 1, name: 18 },
        { id: 2, name: 8 }
      ],
      value: userInputs.taxRate,
      additionalField: true,
      type: 'number'
    },
    { label: 'Sku (required*)', fieldId: 'sku', value: userInputs.sku },
    {
      label: 'Brand Name',
      fieldId: 'brand',
      dropdown: true,
      dropdownItems: brands,
      value: userInputs.brand,
      additionalField: true
    },
    {
      label: 'Category Name',
      fieldId: 'category',
      dropdown: true,
      dropdownItems: categories,
      value: userInputs.category,
      additionalField: true
    }
  ];

  return {
    NEW_PRODUCT_FIELDS,
    handleInputChange,
    onAddProductClick
  };
};
