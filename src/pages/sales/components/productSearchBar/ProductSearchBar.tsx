import React, { useContext } from 'react';

import api from '../../../../api';
import styles from './styles';
import { Product } from '../../../../redux/products/types';
import { InputAutoSuggest } from '../../../../common/components/InputAutoSuggest';
import { NotificationsContext } from '../../../../contexts/NotificationsContext';

interface SearchBarProps {
  addProduct: (product: Product) => void;
}

const ProductSearchBar: React.FC<SearchBarProps> = ({ addProduct }) => {
  const classes = styles();
  const { addNotification } = useContext(NotificationsContext);

  const fetchProducts = async (query: string): Promise<Product[]> => {
    try {
      const { data } = await api.get(`/products/search/?q=${query}`);
      return data;
    } catch (e) {
      const errMessage = e?.response?.data || 'Unable to search with the query';
      addNotification(errMessage, 'error');
      return [];
    }
  };

  return (
    <div className={classes.searchBarInput}>
      <InputAutoSuggest
        selectOption={addProduct}
        isQuickScanMode
        loadOptions={fetchProducts}
      />
    </div>
  );
};

export default ProductSearchBar;
