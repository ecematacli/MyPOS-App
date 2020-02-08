import { useState, useContext, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { editProduct } from '../../../../redux/products/productsActions';
import { NotificationsContext } from '../../../../contexts/NotificationsContext';

export default (product, brands, categories) => {
  const dispatch = useDispatch();
  const { addNotification } = useContext(NotificationsContext);
  const [edittedRow, setEdittedRow] = useState({});
  const [productVal, setProductVal] = useState(product);
  const [enabledEdit, setEnabledEdit] = useState(false);

  // Product input value handlers
  const handleInputChange = (e, fieldId) => {
    setProductVal({ ...productVal, [fieldId]: e.target.value });
  };

  const renderProductValues = fieldId => {
    if (
      fieldId === 'brand' ||
      fieldId === 'category' ||
      fieldId === 'taxRate'
    ) {
      return product[fieldId] && product[fieldId].name
        ? product[fieldId].name
        : product[fieldId];
    } else {
      return product[fieldId];
    }
  };

  const getInputValues = fieldId => {
    if (fieldId === 'brand' || fieldId === 'category') {
      return productVal[fieldId] && productVal[fieldId].name
        ? productVal[fieldId].name
        : productVal[fieldId];
    } else {
      return productVal[fieldId];
    }
  };

  // Product Edit Handlers
  const handleEdittedRow = fieldId => {
    setEdittedRow({ ...edittedRow, [fieldId]: !edittedRow[fieldId] });
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
    (...args) => dispatch(editProduct(...args, addNotification)),
    [dispatch]
  );

  const completeEdit = (fieldId, fieldValue, productId, label) => {
    if (product[fieldId] !== productVal[fieldId]) {
      dispatchEditAction(fieldId, fieldValue, productId, label);
    }
  };

  //Mappable Product fields
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
      dropdownItems: [
        // { id: 0, name: null },
        { id: 1, name: '8' },
        { id: 2, name: '18' }
      ],
      type: 'number'
    },
    { label: 'Sku', fieldId: 'sku' },
    {
      label: 'Brand Name',
      fieldId: 'brand',
      dropdown: true,
      dropdownItems: brands
    },
    {
      label: 'Category Name',
      fieldId: 'category',
      dropdown: true,
      dropdownItems: categories
    }
  ];

  return {
    PRODUCT_FIELDS,
    edittedRow,
    handleEdittedRow,
    handleEditClick,
    productVal,
    handleInputChange,
    renderProductValues,
    getInputValues,
    enabledEdit,
    dispatchEditAction,
    completeEdit
  };
};
