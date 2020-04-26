import { useState, useContext, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { Product } from '../../../../redux/products/types';
import { Brand } from '../../../../redux/brands/types';
import { Category } from '../../../../redux/categories/types';
import { editProduct } from '../../../../redux/products/productsActions';
import { NotificationsContext } from '../../../../contexts/NotificationsContext';

interface EditedRow {
  [key: string]: boolean | undefined;
}

export default (product: Product, brands: Brand[], categories: Category[]) => {
  const dispatch = useDispatch();
  const { addNotification } = useContext(NotificationsContext);
  const [editedRow, setEditedRow] = useState<EditedRow | {}>({});
  const [productVal, setProductVal] = useState(product);
  const [enabledEdit, setEnabledEdit] = useState(false);

  // Product input value handlers
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldId: string
  ) => {
    let userInput = e.target.value;
    if (
      fieldId === 'price' ||
      fieldId === 'discountPrice' ||
      fieldId === 'barcode'
    ) {
      if (isNaN(Number(userInput))) {
        return null;
      }
    }
    setProductVal({ ...productVal, [fieldId]: userInput });
  };

  const renderProductValues = (fieldId: string) => {
    if (!product[fieldId]) {
      return '-';
    } else if (fieldId === 'brand' || fieldId === 'category') {
      return product[fieldId] && product[fieldId].name
        ? product[fieldId].name
        : product[fieldId];
    } else {
      return product[fieldId];
    }
  };

  const getInputValues = (fieldId: string) => {
    if (!productVal[fieldId]) {
      return '';
    } else if (fieldId === 'brand' || fieldId === 'category') {
      return productVal[fieldId] && productVal[fieldId].name
        ? productVal[fieldId].name
        : productVal[fieldId];
    } else {
      return productVal[fieldId];
    }
  };

  // Product Edit Handlers
  const handleEditedRow = (fieldId: string) => {
    setEditedRow({ ...editedRow, [fieldId]: !editedRow[fieldId] });
  };

  const handleEditClick = () => {
    if (enabledEdit) {
      setEnabledEdit(false);
      setEditedRow({});
    } else {
      setEnabledEdit(true);
    }
  };

  const dispatchEditAction = useCallback(
    (fieldId, fieldValue, productId, label) => {
      dispatch(
        editProduct(fieldId, fieldValue, productId, label, addNotification)
      );
    },
    [dispatch]
  );

  const completeEdit = (
    fieldId: string,
    fieldValue: string,
    productId: number,
    label: string
  ) => {
    if (fieldId === 'brand' || fieldId === 'category') {
      //@ts-ignore
      if (product[fieldId].name !== productVal[fieldId]) {
        dispatchEditAction(fieldId, fieldValue, productId, label);
      }
    } else if (product[fieldId] != productVal[fieldId]) {
      dispatchEditAction(fieldId, fieldValue, productId, label);
    }
  };

  return {
    editedRow,
    handleEditedRow,
    handleEditClick,
    productVal,
    handleInputChange,
    renderProductValues,
    getInputValues,
    enabledEdit,
    completeEdit,
  };
};
