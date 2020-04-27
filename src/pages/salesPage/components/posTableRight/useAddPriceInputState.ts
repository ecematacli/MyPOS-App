import { useState, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { editProduct } from '../../../../redux/products/productsActions';
import { NotificationsContext } from '../../../../contexts/NotificationsContext';
import { Product } from '../../../../redux/products/types';

export default (id: number, products: Product[]) => {
  const dispatch = useDispatch();
  const { addNotification } = useContext(NotificationsContext);
  const [inputValue, setInputValue] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setInputValue(parseInt(e.target.value || '0'));

  const resetInput = (): void => {
    setInputValue(0);
  };

  const editPriceValue = (productId: number): void => {
    const updatedPrice = { price: inputValue.toString() };
    dispatch(
      editProduct({
        updatedField: updatedPrice,
        productId,
        label: 'Price',
        addNotification,
      })
    );
  };

  useEffect(() => {
    const product = products.find((product) => product.id === id);
    setInputValue((product && product.price) || 0);
  }, [id]);

  return {
    inputValue,
    handleInputChange,
    resetInput,
    editPriceValue,
  };
};
