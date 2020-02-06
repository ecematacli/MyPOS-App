import { useState, useContext, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { editProduct } from '../../../../redux/products/productsActions';
import { NotificationsContext } from '../../../../contexts/NotificationsContext';
import { dropdownItemsFormatter } from '../../../../common/utils';

export default (product, brands, categories) => {
  const dispatch = useDispatch();
  const { addNotification } = useContext(NotificationsContext);
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
      dropdownItems: [8, 18].map(n => ({ value: n, label: n })),
      type: 'number'
    },
    { label: 'Sku', fieldId: 'sku' },
    {
      label: 'Brand Name',
      fieldId: 'brand',
      dropdown: true,
      dropdownItems: dropdownItemsFormatter(brands)
    },
    {
      label: 'Category Name',
      fieldId: 'category',
      dropdown: true,
      dropdownItems: dropdownItemsFormatter(categories)
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

  const getInputFieldValue = (dropdownItems, fieldId) => {
    if (fieldId === 'brand' || fieldId === 'category') {
      const matchedDropdownItem = dropdownItems.find(({ label }) => {
        return productVal[fieldId] === label;
      });

      if (matchedDropdownItem) {
        return matchedDropdownItem.value;
      } else {
        const matchedDropdownItem = dropdownItems.find(({ value }) => {
          return productVal[fieldId] === value;
        });
        return matchedDropdownItem.value;
      }
    } else {
      return productVal[fieldId];
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

  return {
    PRODUCT_FIELDS,
    edittedRow,
    handleEdittedRow,
    handleEditClick,
    productVal,
    handleInputChange,
    getInputFieldValue,
    enabledEdit,
    dispatchEditAction,
    completeEdit
  };
};
