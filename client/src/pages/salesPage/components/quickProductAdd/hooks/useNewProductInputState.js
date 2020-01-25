import { useReducer } from 'react';

export default () => {
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      barcode: '',
      name: '',
      qty: '',
      sku: '',
      price: '',
      taxRate: '',
      variation: '',
      discountPrice: '',
      category: '',
      brand: ''
    }
  );

  // console.log(userInput.barcode, userInput.name, userInput.qty);
  // console.log(userInput.taxRate, userInput.brand, userInput.category);

  const handleInputChange = e => {
    console.log('HANDLE INPUT CHANGE CALLBACK!!!!!!!!!!');
    console.log(e.target.name);
    const fieldName = e.target.name;
    const newValue = e.target.value;
    setUserInput({ [fieldName]: newValue });
  };

  const NEW_PRODUCT_FIELDS = [
    {
      label: 'Barcode (required)*',
      fieldId: 'barcode',
      value: userInput.barcode,
      required: true
    },
    { label: 'Product Name', fieldId: 'name', value: userInput.name },
    { label: 'Quantity', fieldId: 'qty', value: userInput.qty },
    {
      label: 'Price (required*)',
      fieldId: 'price',
      currency: true,
      value: userInput.price,
      required: true
    },
    {
      label: 'Discounted Price',
      fieldId: 'discountPrice',
      currency: true,
      value: userInput.discountPrice
    },
    { label: 'Variation', fieldId: 'variation', value: userInput.variation },
    {
      label: 'Tax Rate',
      fieldId: 'taxRate',
      dropdown: true,
      dropdownItems: ['18%', '8%'],
      value: userInput.taxRate,
      additionalField: true
    },
    { label: 'Sku', fieldId: 'sku', value: userInput.sku },
    {
      label: 'Brand Name',
      fieldId: 'brand',
      dropdown: true,
      dropdownItems: ['Nike', 'Adidas', 'Wilson'],
      value: userInput.brand,
      additionalField: true
    },
    {
      label: 'Category Name',
      fieldId: 'category',
      dropdown: true,
      dropdownItems: ['Tennis shoe', 'Tennis racket'],
      value: userInput.category,
      additionalField: true
    }
  ];

  return {
    NEW_PRODUCT_FIELDS,
    handleInputChange
  };
};
