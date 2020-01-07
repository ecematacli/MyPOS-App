import React, { useEffect } from 'react';

import SalesTable from '../salesHistoryPage/components/salesTable/SalesTable';
import api from '../../api/api';

const ProductsPage = () => {
  useEffect(() => {
    let active = true;
    const fetchProducts = async () => {
      const response = await api.get('/products');
      return response;
    };
    active && fetchProducts();
    return () => {
      active = false;
    };
  }, []);
  return (
    <SalesTable
      tableHead={['Product Name', 'Sku', 'Brand', 'Price']}
      // tableData={[
      //   {
      //     id: 7000000,
      //     barcode: 941538658299,
      //     name: 'Adidas NMD ',
      //     qty: 1,
      //     sku: 397623880,
      //     price: 50,
      //     taxRate: 8,
      //     discountPrice: 40,
      //     variation: 'Ergonomic',
      //     brand: 'Adidas',
      //     category: 'Tenis Ayakkabisi'
      //   },
      //   {
      //     id: 80000000,
      //     barcode: 941538658246,
      //     name: 'Intelligent Metal Shirt',
      //     qty: 1,
      //     sku: 397623780,
      //     price: 100,
      //     taxRate: 8,
      //     discountPrice: 50,
      //     variation: 'Ergonomic',
      //     brand: 'Nike',
      //     category: 'Tenis Ayakkabisi'
      //   }
      // ]}
      // salesCount={count}
      // fetchSales={fetchSales}
    />
  );
};

export default ProductsPage;
