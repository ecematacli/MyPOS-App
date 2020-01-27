import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { editProduct } from '../../../../../redux/products/productsActions';

export default product => {
  const dispatch = useDispatch();
  const [edittedRow, setEdittedRow] = useState({});
  const [productVal, setProductVal] = useState(product);
  const [enabledEdit, setEnabledEdit] = useState(false);

  const PRODUCT_FIELDS = [
    { label: 'Barcode', fieldId: 'barcode' },
    { label: 'Product Name', fieldId: 'name' },
    { label: 'Quantity', fieldId: 'qty', type: 'number' },
    { label: 'Price', fieldId: 'price', currency: true },
    {
      label: 'Discounted Price',
      fieldId: 'discountPrice',
      currency: true
    },
    { label: 'Variation', fieldId: 'variation' },
    {
      label: 'Tax Rate',
      fieldId: 'taxRate',
      dropdown: true,
      dropdownItems: ['18', '8'],
      type: 'number'
    },
    { label: 'Sku', fieldId: 'sku' },
    {
      label: 'Brand Name',
      fieldId: 'brand',
      dropdown: true,
      dropdownItems: ['Babolat', 'Adidas', 'Wilson']
    },
    {
      label: 'Category Name',
      fieldId: 'category',
      dropdown: true,
      dropdownItems: ['Tennis shoe', 'Tennis racket', 'Raket']
    }
  ];

  const handleEdittedRow = fieldId => {
    setEdittedRow({ ...edittedRow, [fieldId]: !edittedRow[fieldId] });
  };

  const handleInputChange = (e, fieldId) => {
    setProductVal({ ...productVal, [fieldId]: e.target.value });
  };

  const handleEditClick = () => {
    if (enabledEdit) {
      setEnabledEdit(false);
      setEdittedRow({});
    } else {
      setEnabledEdit(true);
    }
  };

  const dispatchEditAction = useCallback(
    (fieldId, fieldValue, productId) =>
      dispatch(editProduct(fieldId, fieldValue, productId)),
    [dispatch]
  );

  const completeEdit = (fieldId, fieldValue, productId) => {
    if (product[fieldId] !== productVal[fieldId]) {
      dispatchEditAction(fieldId, fieldValue, productId);
    }
  };

  return {
    PRODUCT_FIELDS,
    edittedRow,
    handleEdittedRow,
    handleEditClick,
    productVal,
    handleInputChange,
    enabledEdit,
    dispatchEditAction,
    completeEdit
  };
};
