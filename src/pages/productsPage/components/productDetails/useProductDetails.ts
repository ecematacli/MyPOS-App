import { useState, useContext, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { Product } from '../../../../redux/products/types';
import { Brand } from '../../../../redux/brands/types';
import { Category } from '../../../../redux/categories/types';
import { editProduct } from '../../../../redux/products/productsActions';
import { NotificationsContext } from '../../../../contexts/NotificationsContext';

interface DropdownItem {
  name: string;
  id: number;
}
interface ProductField {
  label: string;
  fieldId: string;
  type?: string;
  currency?: boolean;
  dropdown?: boolean;
  dropdownItems?: DropdownItem[];
}
interface EdittedRow {
  [key: string]: boolean | undefined;
}

export default (product: Product, brands: Brand[], categories: Category[]) => {
  const dispatch = useDispatch();
  const { addNotification } = useContext(NotificationsContext);
  const [edittedRow, setEdittedRow] = useState<EdittedRow | {}>({});
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
  const handleEdittedRow = (fieldId: string) => {
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

      console.log('In product>>', product[fieldId]);
      console.log('In product VAL', productVal[fieldId]);
      console.log('EQUAL', product[fieldId].name !== productVal[fieldId]);
      if (product[fieldId].name !== productVal[fieldId]) {
        console.log('NOT EQUAL', product[fieldId].name !== productVal[fieldId]);

        console.log('In product>>', product[fieldId]);
        console.log('In product VAL', productVal[fieldId]);
        dispatchEditAction(fieldId, fieldValue, productId, label);
      }
    } else if (product[fieldId] != productVal[fieldId]) {
      dispatchEditAction(fieldId, fieldValue, productId, label);
    }
  };

  //Mappable Product fields
  const PRODUCT_FIELDS: ProductField[] = [
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
        { id: 1, name: '8' },
        { id: 2, name: '18' }
      ]
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
    completeEdit
  };
};
