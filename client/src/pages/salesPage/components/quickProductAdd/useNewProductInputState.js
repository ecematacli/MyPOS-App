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
      taxRate: 18,
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

  const onAddProductClick = newProduct => {
    dispatch(createProduct(newProduct, addNotification));
    handleCloseDialog();
  };

  // Mappable product fields
  const NEW_PRODUCT_FIELDS = [
    {
      label: 'Barcode (required)*',
      fieldId: 'barcode',
      required: true
    },
    { label: 'Product Name', fieldId: 'name', value: userInputs.name },
    {
      label: 'Quantity',
      fieldId: 'qty',
      type: 'number'
    },
    {
      label: 'Price (required*)',
      fieldId: 'price',
      currency: true,
      required: true
    },
    {
      label: 'Discounted Price',
      fieldId: 'discountPrice'
    },
    { label: 'Variation', fieldId: 'variation' },

    { label: 'Sku', fieldId: 'sku' }
  ];

  const ADDITIONAL_FIELDS = [
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
    ADDITIONAL_FIELDS,
    handleInputChange,
    onAddProductClick,
    userInputs
  };
};
