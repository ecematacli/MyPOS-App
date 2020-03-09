import { useReducer, useContext } from 'react';
import { useDispatch } from 'react-redux';

import { Category } from '../../../../redux/categories/types';
import { Brand } from '../../../../redux/brands/types';
import { NotificationsContext } from '../../../../contexts/NotificationsContext';
import { createProduct } from '../../../../redux/products/productsActions';

export default (
  brands: Brand[],
  categories: Category[],
  handleCloseDialog: () => void
) => {
  const { addNotification } = useContext(NotificationsContext);
  const dispatch = useDispatch();

  const initialValues = {
    taxRate: 18,
    category: '',
    brand: ''
  };

  const [additionalInputs, setAdditionalInputs] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    initialValues
  );

  // Product input field handlers
  const handleInputChange = ({ target: { value, name } }) => {
    const fieldName = name;
    const newValue = value;

    setAdditionalInputs({ [fieldName]: newValue });
  };

  const onAddProductClick = inputValues => {
    const values = {
      ...inputValues,
      price: parseFloat(inputValues.price),
      discountPrice: parseFloat(inputValues.discountPrice)
    };
    dispatch(createProduct(values, additionalInputs, addNotification));
    setAdditionalInputs(initialValues);
    handleCloseDialog();
  };

  interface ProductField {
    label: string;
    fieldId: string;
    required?: boolean;
    currency?: boolean;
    type?: string;
  }

  interface TaxDropdown {
    name: number;
    id: number;
  }

  interface AdditionalField {
    label: string;
    fieldId: string;
    dropdown: boolean;
    dropdownItems: Category[] | Brand[] | any[];
    value: number | string;
    additionalField: boolean;
    type?: string;
  }
  // Mappable input and additional input fields
  const NEW_PRODUCT_FIELDS: ProductField[] = [
    {
      label: 'Barcode (required)*',
      fieldId: 'barcode',
      required: true
    },
    { label: 'Product Name', fieldId: 'name' },
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

  const ADDITIONAL_FIELDS: AdditionalField[] = [
    {
      label: 'Tax Rate',
      fieldId: 'taxRate',
      dropdown: true,
      dropdownItems: [
        { id: 1, name: 18 },
        { id: 2, name: 8 }
      ],
      value: additionalInputs.taxRate,
      additionalField: true,
      type: 'number'
    },
    {
      label: 'Brand Name',
      fieldId: 'brand',
      dropdown: true,
      dropdownItems: brands,
      value: additionalInputs.brand,
      additionalField: true
    },
    {
      label: 'Category Name',
      fieldId: 'category',
      dropdown: true,
      dropdownItems: categories,
      value: additionalInputs.category,
      additionalField: true
    }
  ];

  return {
    NEW_PRODUCT_FIELDS,
    ADDITIONAL_FIELDS,
    handleInputChange,
    onAddProductClick,
    additionalInputs
  };
};
