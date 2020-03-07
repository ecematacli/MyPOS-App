import { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';

import { editProduct } from '../../../../redux/products/productsActions';
import { NotificationsContext } from '../../../../contexts/NotificationsContext';

export default () => {
  const dispatch = useDispatch();
  const { addNotification } = useContext(NotificationsContext);
  const [inputValue, setInputValue] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const userInput = e.target.value;
    setInputValue(parseInt(userInput));
  };

  const resetInput = (): void => {
    setInputValue(0);
  };

  const editPriceValue = (id: number): void => {
    dispatch(
      editProduct('price', inputValue.toString(), id, 'Price', addNotification)
    );
  };

  return {
    inputValue,
    handleInputChange,
    resetInput,
    editPriceValue
  };
};
