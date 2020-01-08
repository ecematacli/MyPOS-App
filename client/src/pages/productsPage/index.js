import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchProducts } from '../../redux/products/productsActions';
import CustomTable from '../../common/components/customTable/CustomTable';
import ProductDetails from './components/ProductDetails';

const products = [
  {
    id: 596895,
    sku: 1245324,
    name: 'Adidas NMD',
    category: 'Tennis shoe',
    brand: 'Adidas',
    price: '1000.09',
    discountedPrice: '890.0'
  },
  {
    id: 184903,
    sku: 17654534,
    name: 'Adidas Falcon',
    category: 'Tennis shoe',
    brand: 'Adidas',
    price: '1500.09',
    discountedPrice: '1000'
  },
  {
    id: 87439,
    sku: 876543,
    name: 'Adidas Falcon',
    category: 'Tennis shoe',
    brand: 'Adidas',
    price: '1500.09',
    discountedPrice: '1000'
  },
  {
    id: 73864734989,
    sku: 2346578,
    name: 'Adidas Falcon',
    category: 'Tennis shoe',
    brand: 'Adidas',
    price: '1500.09',
    discountedPrice: '1000'
  },
  {
    id: 123456,
    sku: 89796876,
    name: 'Adidas Falcon',
    category: 'Tennis shoe',
    brand: 'Adidas',
    price: '1500.09',
    discountedPrice: '1000'
  },
  {
    id: 7654,
    sku: 7867654,
    name: 'Adidas Falcon',
    category: 'Tennis shoe',
    brand: 'Adidas',
    price: '1500.09',
    discountedPrice: '1000'
  }
];
const ProductsPage = ({ fetchProducts }) => {
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <CustomTable
      tableHeads={[
        {
          label: 'Sku'
        },
        {
          label: 'Product Name',
          sortLabel: true
        },
        {
          label: 'Category'
        },
        {
          label: 'Brand'
        },
        {
          label: 'Price',
          numeric: true
        },
        {
          label: 'Discounted Price',
          numeric: true
        }
      ]}
      products={products}
      salesCount={70}
      fetchProducts={fetchProducts}
      component={ProductDetails}
    />
  );
};

export default connect(null, { fetchProducts })(ProductsPage);
