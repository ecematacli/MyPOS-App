import { useReducer, useContext } from 'react';

import {
  ProductField,
  AdditionalInputField,
  AdditionalInputs,
  FormValues
} from './types';
import { Category } from '../../../../redux/categories/types';
import { Brand } from '../../../../redux/brands/types';
import { NewProductData } from '../../hooks/types';
import { findMatchedFields } from '../../../../common/utils';
import { NotificationsContext } from '../../../../contexts/NotificationsContext';

export default (
  brands: Brand[],
  categories: Category[],
  handleCloseDialog: () => void,
  createProduct: (
    productData: NewProductData,
    addNotification: (message: string, severity: string) => void
  ) => Promise<void>
) => {
  const { addNotification } = useContext(NotificationsContext);
  const initialValues = {
    taxRate: '18',
    category: '',
    brand: ''
  };

  const [additionalInputs, setAdditionalInputs] = useReducer(
    (state: AdditionalInputs, newState: AdditionalInputs) => ({
      ...state,
      ...newState
    }),
    initialValues
  );

  // Product input field handlers
  const handleInputChange = ({ target: { value, name } }) => {
    const fieldName = name;
    const newValue = value;

    setAdditionalInputs({ ...additionalInputs, [fieldName]: newValue });
  };

  const onAddProductClick = (inputValues: FormValues) => {
    let categoryId: string;
    let brandId: string;

    if (additionalInputs.category) {
      categoryId = findMatchedFields(
        categories,
        additionalInputs.category
      ).id.toString();
    }

    if (additionalInputs.brand) {
      brandId = findMatchedFields(brands, additionalInputs.brand).id.toString();
    }

    const newProduct: NewProductData = {
      ...inputValues,
      price: parseFloat(inputValues.price),
      discountPrice: parseFloat(inputValues.discountPrice),
      taxRate: parseFloat(additionalInputs.taxRate),
      categoryId,
      brandId
    };

    createProduct(newProduct, addNotification);
    setAdditionalInputs(initialValues);
    handleCloseDialog();
  };

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

  const ADDITIONAL_FIELDS: AdditionalInputField[] = [
    {
      label: 'Tax Rate',
      fieldId: 'taxRate',
      dropdown: true,
      dropdownItems: [
        { id: 1, name: '18' },
        { id: 2, name: '8' }
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
