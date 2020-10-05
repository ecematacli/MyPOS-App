import { useState } from 'react';

import { Args, EditedRow, UserProductValues } from '../types';
import { findMatchedFields } from '../../../../../common/utils';

export default ({
  product,
  editProduct,
  addNotification,
  brands,
  categories,
}: Args) => {
  const [editedRow, setEditedRow] = useState<EditedRow | {}>({});
  const [productVal, setProductVal] = useState<UserProductValues>(product);
  const [enabledEdit, setEnabledEdit] = useState(false);

  // Product input value handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;
    const field = e.target.name;

    if (field === 'price' || field === 'discountPrice' || field === 'barcode') {
      if (isNaN(Number(userInput))) {
        return null;
      }
    }
    setProductVal({ ...productVal, [field]: userInput });
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

  const completeEdit = (
    fieldId: string,
    fieldValue: string,
    productId: number,
    label: string
  ) => {
    const productField = product[fieldId];
    let updatedField: { [key: string]: string } = {
      [fieldId]: fieldValue,
    };

    if (fieldId === 'brand' || fieldId === 'category') {
      if (fieldId === 'brand') {
        updatedField = {
          brandId: findMatchedFields(brands, fieldValue).id.toString(),
        };
      }

      if (fieldId === 'category') {
        updatedField = {
          categoryId: findMatchedFields(categories, fieldValue).id.toString(),
        };
      }

      if (productField.name && productField.name !== productVal[fieldId]) {
        editProduct({ updatedField, productId, label, addNotification });
      }
    } else if (productField != productVal[fieldId]) {
      editProduct({ updatedField, productId, label, addNotification });
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
