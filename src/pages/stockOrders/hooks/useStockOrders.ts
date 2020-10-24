import { useState, useEffect } from 'react';

import api from '../../../api';
import { Product } from '../../../redux/products/types';

interface StockOrders {
  id: number;
  createdAt: string;
  products: Product[];
}

export default () => {
  const [loading, setLoading] = useState(false);
  const [stockOrders, setStockOrders] = useState<StockOrders[]>([]);

  const fetchStockOrders = async () => {
    setLoading(true);
    const response = await api.get('/stock-orders');
    setStockOrders(response.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchStockOrders();
  }, []);

  return {
    loading,
    stockOrders,
  };
};
