import { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';

import { editProduct } from '../../../../redux/products/productsActions';
import { NotificationsContext } from '../../../../contexts/NotificationsContext';

export default () => {
  const dispatch = useDispatch();
  const { addNotification } = useContext(NotificationsContext);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = e => {
    const userInput = e.target.value;
    if (isNaN(userInput)) {
      return null;
    } else {
      setInputValue(parseFloat(userInput));
    }
  };

  const resetInput = () => {
    setInputValue('');
  };

  const editPriceValue = id => {
    dispatch(editProduct('price', inputValue, id, 'Price', addNotification));
  };

  return {
    inputValue,
    handleInputChange,
    resetInput,
    editPriceValue
  };
};
